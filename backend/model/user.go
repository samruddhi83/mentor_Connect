package model

import (
	"time"
)

type User struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	FirstName    string    `gorm:"size:100;not null" json:"first_name"`
	LastName     string    `gorm:"size:100;not null" json:"last_name"`
	Email        string    `gorm:"size:255;uniqueIndex;not null" json:"email"`
	PasswordHash string    `gorm:"size:255;not null;column:password_hash" json:"-"`
	Phone        string    `gorm:"size:20" json:"phone"`
	Role         string    `gorm:"type:enum('learner', 'tutor', 'admin');not null" json:"role"`
	ProfileImage string    `gorm:"size:500" json:"profile_image"`
	Bio          string    `gorm:"type:text" json:"bio"`
	IsActive     bool      `gorm:"default:true" json:"is_active"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// GetFullName returns the concatenated full name
func (u *User) GetFullName() string {
	return u.FirstName + " " + u.LastName
}
