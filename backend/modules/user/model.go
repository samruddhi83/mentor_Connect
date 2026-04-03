package user

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Role string

const (
	RoleLearner Role = "learner"
	RoleTutor   Role = "tutor"
)

type User struct {
	ID        string    `gorm:"type:varchar(36);primaryKey" json:"id"`
	FullName  string    `gorm:"type:varchar(255);not null" json:"full_name"`
	Email     string    `gorm:"type:varchar(255);unique;not null" json:"email"`
	Password  string    `gorm:"type:varchar(255);not null" json:"-"`
	Role      Role      `gorm:"type:enum('learner','tutor');not null" json:"role"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.ID == "" {
		u.ID = uuid.New().String()
	}
	return
}
