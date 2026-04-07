package handler

import (
	"net/http"
	"time"

	"MentorConnect/db"
	"MentorConnect/model"
	"MentorConnect/utils"

	"github.com/gin-gonic/gin"
)

func GetAvailability(c *gin.Context) {
	userID, _ := c.Get("userID")
	var availabilities []model.TutorAvailability

	if err := db.DB.Where("tutor_id = ?", userID).Find(&availabilities).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch availability")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Availability retrieved", availabilities)
}

func AddAvailability(c *gin.Context) {
	userID, _ := c.Get("userID")

	// Parse the JSON request with string fields
	var req struct {
		AvailableDate string `json:"available_date" binding:"required"`
		StartTime     string `json:"start_time" binding:"required"`
		EndTime       string `json:"end_time" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	// Parse date and time strings
	availableDate, err := time.Parse("2006-01-02", req.AvailableDate)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid date format. Use YYYY-MM-DD")
		return
	}

	startTime, err := time.Parse("15:04", req.StartTime)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid start time format. Use HH:MM")
		return
	}

	endTime, err := time.Parse("15:04", req.EndTime)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid end time format. Use HH:MM")
		return
	}

	// Validate time logic
	if endTime.Before(startTime) || endTime.Equal(startTime) {
		utils.SendError(c, http.StatusBadRequest, "End time must be after start time")
		return
	}

	// Check for overlapping availability
	var existingAvailability []model.TutorAvailability
	if err := db.DB.Where("tutor_id = ? AND available_date = ?", userID.(uint), availableDate).Find(&existingAvailability).Error; err == nil {
		for _, existing := range existingAvailability {
			// Check if new time slot overlaps with existing one
			if startTime.Before(existing.EndTime) && endTime.After(existing.StartTime) {
				utils.SendError(c, http.StatusConflict, "Time slot overlaps with existing availability")
				return
			}
		}
	}

	// Create the availability record
	availability := model.TutorAvailability{
		TutorID:       userID.(uint), // Use userID directly
		AvailableDate: availableDate,
		StartTime:     startTime,
		EndTime:       endTime,
		IsBooked:      false,
	}

	if err := db.DB.Create(&availability).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to add availability")
		return
	}

	utils.SendSuccess(c, http.StatusCreated, "Availability added", availability)
}

func AddBulkAvailability(c *gin.Context) {
	userID, _ := c.Get("userID")

	// Parse the JSON request with array of availability slots
	var req struct {
		Availabilities []struct {
			AvailableDate string `json:"available_date" binding:"required"`
			StartTime     string `json:"start_time" binding:"required"`
			EndTime       string `json:"end_time" binding:"required"`
		} `json:"availabilities" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	var createdAvailabilities []model.TutorAvailability

	for _, slot := range req.Availabilities {
		// Parse date and time strings
		availableDate, err := time.Parse("2006-01-02", slot.AvailableDate)
		if err != nil {
			utils.SendError(c, http.StatusBadRequest, "Invalid date format for slot "+slot.AvailableDate+". Use YYYY-MM-DD")
			return
		}

		startTime, err := time.Parse("15:04", slot.StartTime)
		if err != nil {
			utils.SendError(c, http.StatusBadRequest, "Invalid start time format for slot "+slot.StartTime+". Use HH:MM")
			return
		}

		endTime, err := time.Parse("15:04", slot.EndTime)
		if err != nil {
			utils.SendError(c, http.StatusBadRequest, "Invalid end time format for slot "+slot.EndTime+". Use HH:MM")
			return
		}

		// Validate time logic
		if endTime.Before(startTime) || endTime.Equal(startTime) {
			utils.SendError(c, http.StatusBadRequest, "End time must be after start time for slot "+slot.AvailableDate)
			return
		}

		// Create the availability record
		availability := model.TutorAvailability{
			TutorID:       userID.(uint),
			AvailableDate: availableDate,
			StartTime:     startTime,
			EndTime:       endTime,
			IsBooked:      false,
		}

		if err := db.DB.Create(&availability).Error; err != nil {
			utils.SendError(c, http.StatusInternalServerError, "Failed to add availability for slot "+slot.AvailableDate)
			return
		}

		createdAvailabilities = append(createdAvailabilities, availability)
	}

	utils.SendSuccess(c, http.StatusCreated, "Bulk availability added", createdAvailabilities)
}

func DeleteAvailability(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var availability model.TutorAvailability
	if err := db.DB.First(&availability, id).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "Availability not found")
		return
	}

	// Check if the availability belongs to the current user
	if availability.TutorID != userID.(uint) {
		utils.SendError(c, http.StatusForbidden, "You can only delete your own availability")
		return
	}

	db.DB.Delete(&availability)
	utils.SendSuccess(c, http.StatusOK, "Availability deleted", nil)
}
