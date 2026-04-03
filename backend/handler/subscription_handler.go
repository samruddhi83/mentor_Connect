package handler

import (
	"net/http"
	"time"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

type SubscribeReq struct {
	PlanName string `json:"plan_name" binding:"required"`
}

var plans = map[string]struct {
	Price        float64
	SessionLimit int
	Duration     int
}{
	"Free":    {Price: 0, SessionLimit: 1, Duration: 30},
	"Basic":   {Price: 299, SessionLimit: 2, Duration: 30},
	"Pro":     {Price: 699, SessionLimit: 5, Duration: 30},
	"Premium": {Price: 1499, SessionLimit: 999, Duration: 30}, // 999 = unlimited logic placeholder
}

func Subscribe(c *gin.Context) {
	userID, _ := c.Get("userID")

	var req SubscribeReq
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	planDetails, exists := plans[req.PlanName]
	if !exists {
		utils.SendError(c, http.StatusBadRequest, "Invalid plan selected")
		return
	}

	// Deactivate active subscriptions for this learner
	db.DB.Model(&model.Subscription{}).Where("learner_id = ? AND active = ?", userID, true).Update("active", false)

	sub := model.Subscription{
		LearnerID:      userID.(uint),
		PlanName:       req.PlanName,
		Price:          planDetails.Price,
		SessionLimit:   planDetails.SessionLimit,
		SessionsUsed:   0,
		DurationInDays: planDetails.Duration,
		StartDate:      time.Now(),
		EndDate:        time.Now().AddDate(0, 0, planDetails.Duration),
		Active:         true,
	}

	if err := db.DB.Create(&sub).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to create subscription")
		return
	}

	utils.SendSuccess(c, http.StatusCreated, "Subscribed successfully", sub)
}

func GetMySubscription(c *gin.Context) {
	userID, _ := c.Get("userID")

	var sub model.Subscription
	if err := db.DB.Where("learner_id = ? AND active = ?", userID, true).First(&sub).Error; err != nil {
		utils.SendSuccess(c, http.StatusOK, "No active subscription", nil)
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Active subscription retrieved", sub)
}
