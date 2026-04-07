package model

import (
	"time"
)

type TutorAvailability struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	TutorID       uint      `gorm:"not null" json:"tutor_id"`
	AvailableDate time.Time `gorm:"type:date;not null" json:"available_date"`
	StartTime     time.Time `gorm:"type:time;not null" json:"start_time"`
	EndTime       time.Time `gorm:"type:time;not null" json:"end_time"`
	IsBooked      bool      `gorm:"default:false" json:"is_booked"`
	CreatedAt     time.Time `json:"created_at"`
}
