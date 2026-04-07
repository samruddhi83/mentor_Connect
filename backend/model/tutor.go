package model

type Tutor struct {
	ID              uint    `gorm:"primaryKey" json:"id"`
	UserID          uint    `gorm:"uniqueIndex;not null" json:"user_id"`
	Bio             string  `gorm:"type:text" json:"bio"`
	Skills          string  `gorm:"type:text" json:"skills"` // Comma separated or JSON string
	Topics          string  `gorm:"type:text" json:"topics"` // Comma separated or JSON string
	ExperienceYears int     `json:"experience_years"`
	HourlyRate      float64 `json:"hourly_rate"`
	ProfileImage    string  `gorm:"size:255" json:"profile_image"`
	Rating          float32 `json:"rating"`
}
