package model

import "time"

type Review struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	LearnerID uint      `gorm:"index;not null" json:"learner_id"`
	TutorID   uint      `gorm:"index;not null" json:"tutor_id"`
	Rating    int       `json:"rating"` // 1 to 5
	Comment   string    `gorm:"type:text" json:"comment"`
	CreatedAt time.Time `json:"created_at"`
}
