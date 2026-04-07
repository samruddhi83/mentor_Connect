package model

import (
	"time"
)

type Topic struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"size:150;not null;uniqueIndex" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	CreatedAt   time.Time `json:"created_at"`
}

type TutorTopic struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	TutorID     uint      `gorm:"not null" json:"tutor_id"`
	TopicID     uint      `gorm:"not null" json:"topic_id"`
	SkillLevel  string    `gorm:"type:enum('beginner', 'intermediate', 'advanced');default:'beginner'" json:"skill_level"`
}
