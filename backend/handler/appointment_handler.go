package handler

import (
	"net/http"
	"time"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

type AppointmentReq struct {
	TutorID         uint   `json:"tutor_id" binding:"required"`
	Topic           string `json:"topic" binding:"required"`
	AppointmentDate string `json:"appointment_date" binding:"required"` // YYYY-MM-DD
	AppointmentTime string `json:"appointment_time" binding:"required"` // HH:MM
	Duration        int    `json:"duration" binding:"required"`         // 15 or 30
}

func parseTimeStr(t string) (int, error) {
	parsed, err := time.Parse("15:04", t)
	if err != nil {
		return 0, err
	}
	return parsed.Hour()*60 + parsed.Minute(), nil
}

func BookAppointment(c *gin.Context) {
	userID, _ := c.Get("userID")

	var req AppointmentReq
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	if req.Duration != 15 && req.Duration != 30 {
		utils.SendError(c, http.StatusBadRequest, "Duration must be 15 or 30 minutes")
		return
	}

	// 1. Check Subscriptions
	var sub model.Subscription
	if err := db.DB.Where("learner_id = ? AND active = ?", userID, true).First(&sub).Error; err != nil {
		utils.SendError(c, http.StatusPaymentRequired, "Active subscription required to book")
		return
	}

	if sub.SessionsUsed >= sub.SessionLimit && sub.SessionLimit != 999 {
		utils.SendError(c, http.StatusForbidden, "Session limit reached for your plan")
		return
	}

	if req.Duration == 30 && (sub.PlanName == "Free" || sub.PlanName == "Basic") {
		utils.SendError(c, http.StatusForbidden, "Your plan only supports 15-minute sessions")
		return
	}

	// 2. Check Overlapping Appointments
	reqStartMins, err := parseTimeStr(req.AppointmentTime)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid appointment_time format, expected HH:MM")
		return
	}
	reqEndMins := reqStartMins + req.Duration

	var existingAppointments []model.Appointment
	db.DB.Where("tutor_id = ? AND appointment_date = ? AND status IN (?, ?)", 
		req.TutorID, req.AppointmentDate, "Pending", "Accepted").Find(&existingAppointments)

	for _, appt := range existingAppointments {
		existStartMins, _ := parseTimeStr(appt.AppointmentTime)
		existEndMins := existStartMins + appt.Duration

		// Overlap condition: Max(Start A, Start B) < Min(End A, End B)
		startMax := reqStartMins
		if existStartMins > startMax {
			startMax = existStartMins
		}
		endMin := reqEndMins
		if existEndMins < endMin {
			endMin = existEndMins
		}
		if startMax < endMin {
			utils.SendError(c, http.StatusConflict, "Tutor is already booked or has a pending request for this time slot")
			return
		}
	}

	appointment := model.Appointment{
		LearnerID:       userID.(uint),
		TutorID:         req.TutorID,
		Topic:           req.Topic,
		AppointmentDate: req.AppointmentDate,
		AppointmentTime: req.AppointmentTime,
		Duration:        req.Duration,
		Status:          "Pending",
		CreatedAt:       time.Now(),
	}

	if err := db.DB.Create(&appointment).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to create appointment")
		return
	}

	// Increment session used
	db.DB.Model(&sub).Update("sessions_used", sub.SessionsUsed+1)

	utils.SendSuccess(c, http.StatusCreated, "Appointment booked successfully", appointment)
}

func GetMyAppointments(c *gin.Context) {
	userID, _ := c.Get("userID")
	role, _ := c.Get("role")

	var appointments []model.Appointment
	query := db.DB.Preload("Learner").Preload("Tutor.User")

	if role == "learner" {
		query = query.Where("learner_id = ?", userID)
	} else if role == "tutor" {
		var tutor model.Tutor
		db.DB.Where("user_id = ?", userID).First(&tutor)
		query = query.Where("tutor_id = ?", tutor.ID)
	}

	if err := query.Find(&appointments).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch appointments")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Appointments retrieved", appointments)
}

func UpdateAppointmentStatus(c *gin.Context) {
	id := c.Param("id")
	var req struct {
		Status string `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	var appointment model.Appointment
	if err := db.DB.First(&appointment, id).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "Appointment not found")
		return
	}

	// Simple status update
	appointment.Status = req.Status
	// e.g. Assign meeting link if Accepted
	if req.Status == "Accepted" {
		appointment.MeetingLink = "https://meet.jit.si/mentor_connect_" + id
	}

	db.DB.Save(&appointment)
	utils.SendSuccess(c, http.StatusOK, "Appointment status updated", appointment)
}
