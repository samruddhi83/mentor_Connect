package model

import (
	"time"
)

type TutorProfile struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	UserID           uint      `gorm:"not null;uniqueIndex" json:"user_id"`
	Headline         string    `gorm:"size:255" json:"headline"`
	ExperienceYears  int       `gorm:"default:0" json:"experience_years"`
	HourlyRate       float64   `gorm:"type:decimal(10,2);default:0" json:"hourly_rate"`
	LinkedInURL       string    `gorm:"size:500" json:"linkedin_url"`
	GitHubURL        string    `gorm:"size:500" json:"github_url"`
	WebsiteURL       string    `gorm:"size:500" json:"website_url"`
	MeetingLink      string    `gorm:"size:500" json:"meeting_link"`
	AverageRating    float32   `gorm:"type:decimal(3,2);default:0" json:"average_rating"`
	TotalReviews     int       `gorm:"default:0" json:"total_reviews"`
	CreatedAt        time.Time `json:"created_at"`
	UpdatedAt        time.Time `json:"updated_at"`
}
