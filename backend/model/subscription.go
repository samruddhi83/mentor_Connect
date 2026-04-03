package model

import "time"

type Subscription struct {
	ID             uint      `gorm:"primaryKey" json:"id"`
	LearnerID      uint      `gorm:"index;not null" json:"learner_id"`
	User           User      `gorm:"foreignKey:LearnerID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"user,omitempty"`
	PlanName       string    `gorm:"size:100;not null" json:"plan_name"` // Free, Basic, Pro, Premium
	Price          float64   `json:"price"`
	SessionLimit   int       `json:"session_limit"` // Number of sessions allowed
	SessionsUsed   int       `json:"sessions_used"` // Number of sessions booked
	DurationInDays int       `json:"duration_in_days"`
	StartDate      time.Time `json:"start_date"`
	EndDate        time.Time `json:"end_date"`
	Active         bool      `gorm:"default:true" json:"active"`
}
