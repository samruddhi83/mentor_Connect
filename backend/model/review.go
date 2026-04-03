package model

import "time"

type Review struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	LearnerID uint      `gorm:"index;not null" json:"learner_id"`
	Learner   User      `gorm:"foreignKey:LearnerID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"learner,omitempty"`
	TutorID   uint      `gorm:"index;not null" json:"tutor_id"`
	Tutor     Tutor     `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tutor,omitempty"`
	Rating    int       `json:"rating"` // 1 to 5
	Comment   string    `gorm:"type:text" json:"comment"`
	CreatedAt time.Time `json:"created_at"`
}
