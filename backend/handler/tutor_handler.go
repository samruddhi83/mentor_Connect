package handler

import (
	"net/http"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

func GetTutors(c *gin.Context) {
	var tutors []model.Tutor
	if err := db.DB.Preload("User").Find(&tutors).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch tutors")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Tutors retrieved", tutors)
}

func GetTutorByID(c *gin.Context) {
	id := c.Param("id")
	var tutor model.Tutor

	if err := db.DB.Preload("User").Where("id = ?", id).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "Tutor not found")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Tutor retrieved", tutor)
}

func UpdateTutor(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var tutor model.Tutor
	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusForbidden, "Not authorized to update this profile")
		return
	}

	if err := c.ShouldBindJSON(&tutor); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	db.DB.Save(&tutor)
	utils.SendSuccess(c, http.StatusOK, "Tutor profile updated", tutor)
}

func DeleteTutor(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var tutor model.Tutor
	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusForbidden, "Not authorized")
		return
	}

	db.DB.Delete(&tutor)
	utils.SendSuccess(c, http.StatusOK, "Tutor deleted", nil)
}
