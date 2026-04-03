package handler

import (
	"net/http"
	"time"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

func AddReview(c *gin.Context) {
	userID, _ := c.Get("userID")

	var req model.Review
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	req.LearnerID = userID.(uint)
	req.CreatedAt = time.Now()

	// Optionally check if they actually had a completed session with the tutor

	if err := db.DB.Create(&req).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to add review")
		return
	}

	// Update tutor rating (simple average placeholder)
	// In production, calculate avg properly via query and save to model
	utils.SendSuccess(c, http.StatusCreated, "Review posted successfully", req)
}

func GetTutorReviews(c *gin.Context) {
	tutorID := c.Param("tutorId")
	var reviews []model.Review

	if err := db.DB.Preload("Learner").Where("tutor_id = ?", tutorID).Find(&reviews).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to retrieve reviews")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Reviews retrieved", reviews)
}
