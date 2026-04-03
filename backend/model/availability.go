package model

type Availability struct {
	ID        uint   `gorm:"primaryKey" json:"id"`
	TutorID   uint   `gorm:"index;not null" json:"tutor_id"`
	Tutor     Tutor  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"tutor,omitempty"`
	Day       string `gorm:"size:20;not null" json:"day"`        // e.g. Monday, Tuesday
	StartTime string `gorm:"size:10;not null" json:"start_time"` // e.g. 09:00
	EndTime   string `gorm:"size:10;not null" json:"end_time"`   // e.g. 17:00
}
