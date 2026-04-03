package handler

import (
	"net/http"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

func GetAvailability(c *gin.Context) {
	tutorID := c.Param("tutorId")
	var availabilities []model.Availability

	if err := db.DB.Where("tutor_id = ?", tutorID).Find(&availabilities).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch availability")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Availability retrieved", availabilities)
}

func AddAvailability(c *gin.Context) {
	userID, _ := c.Get("userID")

	// Ensure the user is the tutor they claim to be
	var tutor model.Tutor
	if err := db.DB.Where("user_id = ?", userID).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusForbidden, "Tutor profile not found")
		return
	}

	var req model.Availability
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}
	req.TutorID = tutor.ID

	if err := db.DB.Create(&req).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to add availability")
		return
	}

	utils.SendSuccess(c, http.StatusCreated, "Availability added", req)
}

func DeleteAvailability(c *gin.Context) {
	id := c.Param("id")
	var req model.Availability

	if err := db.DB.First(&req, id).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "Availability not found")
		return
	}

	db.DB.Delete(&req)
	utils.SendSuccess(c, http.StatusOK, "Availability deleted", nil)
}
