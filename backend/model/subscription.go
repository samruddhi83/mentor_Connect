package model

import (
	"time"
)

type SubscriptionPlan struct {
	ID                     int       `gorm:"primaryKey" json:"id"`
	Name                   string    `gorm:"size:100;not null" json:"name"`
	Description            string    `gorm:"type:text" json:"description"`
	Price                  float64   `gorm:"type:decimal(10,2);not null;default:0" json:"price"`
	DurationDays           int       `gorm:"not null" json:"duration_days"`
	MaxBookingsPerMonth    int       `json:"max_bookings_per_month"`
	MeetingDurationMinutes int       `json:"meeting_duration_minutes"`
	IsFree                 bool      `gorm:"default:false" json:"is_free"`
	CreatedAt              time.Time `json:"created_at"`
}

type UserSubscription struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null" json:"user_id"`
	PlanID    int       `gorm:"not null" json:"plan_id"`
	StartDate time.Time `gorm:"type:date;not null" json:"start_date"`
	EndDate   time.Time `gorm:"type:date;not null" json:"end_date"`
	Status    string    `gorm:"type:enum('active', 'expired', 'cancelled');default:'active'" json:"status"`
	CreatedAt time.Time `json:"created_at"`
}
