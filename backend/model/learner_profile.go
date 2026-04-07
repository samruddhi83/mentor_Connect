package model

import (
	"time"
)

type LearnerProfile struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	UserID      uint      `gorm:"not null;uniqueIndex" json:"user_id"`
	Education   string    `gorm:"size:255" json:"education"`
	CareerGoal  string    `gorm:"type:text" json:"career_goal"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
