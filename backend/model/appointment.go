package model

import "time"

type Appointment struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	LearnerID       uint      `gorm:"index;not null" json:"learner_id"`
	Learner         User      `gorm:"foreignKey:LearnerID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"learner,omitempty"`
	TutorID         uint      `gorm:"index;not null" json:"tutor_id"`
	Tutor           Tutor     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tutor,omitempty"`
	Topic           string    `gorm:"size:255" json:"topic"`
	AppointmentDate string    `gorm:"size:20;not null" json:"appointment_date"` // YYYY-MM-DD
	AppointmentTime string    `gorm:"size:10;not null" json:"appointment_time"` // HH:MM
	Duration        int       `json:"duration"`                                 // 15 or 30
	MeetingLink     string    `gorm:"size:255" json:"meeting_link"`
	Status          string    `gorm:"size:50;default:'Pending'" json:"status"` // Pending, Accepted, Rejected, Completed, Cancelled
	Notes           string    `gorm:"type:text" json:"notes"`
	CreatedAt       time.Time `json:"created_at"`
}
