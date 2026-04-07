package handler

import (
	"net/http"
	"strconv"
	"strings"
	"time"

	"MentorConnect/db"
	"MentorConnect/model"
	"MentorConnect/utils"

	"github.com/gin-gonic/gin"
)

func GetTutors(c *gin.Context) {
	var tutors []model.Tutor
	if err := db.DB.Preload("User").Find(&tutors).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch tutors")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Tutors retrieved", tutors)
}

func GetTutorByID(c *gin.Context) {
	id := c.Param("id")
	var tutor model.Tutor

	if err := db.DB.Preload("User").Where("id = ?", id).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "Tutor not found")
		return
	}
	utils.SendSuccess(c, http.StatusOK, "Tutor retrieved", tutor)
}

func UpdateTutor(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var tutor model.Tutor
	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusForbidden, "Not authorized to update this profile")
		return
	}

	if err := c.ShouldBindJSON(&tutor); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	db.DB.Save(&tutor)
	utils.SendSuccess(c, http.StatusOK, "Tutor profile updated", tutor)
}

func DeleteTutor(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var tutor model.Tutor
	if err := db.DB.Where("id = ? AND user_id = ?", id, userID).First(&tutor).Error; err != nil {
		utils.SendError(c, http.StatusForbidden, "Not authorized")
		return
	}

	db.DB.Delete(&tutor)
	utils.SendSuccess(c, http.StatusOK, "Tutor deleted", nil)
}

// TimeSlot represents a bookable time slot
type TimeSlot struct {
	Time      string `json:"time"`
	Duration  int    `json:"duration"`
	Available bool   `json:"available"`
}

// TutorSlot represents a tutor with their available time slots
type TutorSlot struct {
	ID        uint       `json:"id"`
	Tutor     TutorInfo  `json:"tutor"`
	Date      string     `json:"date"`
	TimeSlots []TimeSlot `json:"time_slots"`
}

// TutorInfo contains basic tutor information
type TutorInfo struct {
	ID         uint    `json:"id"`
	Name       string  `json:"name"`
	Avatar     string  `json:"avatar"`
	Rating     float32 `json:"rating"`
	Skills     string  `json:"skills"`
	HourlyRate float64 `json:"hourly_rate"`
}

func GetAvailableSlots(c *gin.Context) {
	var tutorProfiles []model.TutorProfile
	if err := db.DB.Find(&tutorProfiles).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to fetch tutors")
		return
	}

	var availableSlots []TutorSlot

	for _, tutor := range tutorProfiles {
		// Get user information for this tutor
		var user model.User
		if err := db.DB.Where("id = ?", tutor.UserID).First(&user).Error; err != nil {
			continue // Skip if user not found
		}

		// Get availability for this tutor
		var availabilities []model.TutorAvailability
		db.DB.Where("tutor_id = ?", tutor.ID).Find(&availabilities)

		for _, availability := range availabilities {
			// Generate time slots for this availability
			timeSlots := generateTimeSlotsFromAvailability(availability)

			tutorSlot := TutorSlot{
				ID: tutor.ID,
				Tutor: TutorInfo{
					ID:         tutor.ID,
					Name:       user.GetFullName(),
					Avatar:     user.ProfileImage,
					Rating:     tutor.AverageRating,
					Skills:     getSkillsForTutor(tutor.ID),
					HourlyRate: tutor.HourlyRate,
				},
				Date:      availability.AvailableDate.Format("2006-01-02"),
				TimeSlots: timeSlots,
			}

			availableSlots = append(availableSlots, tutorSlot)
		}
	}

	utils.SendSuccess(c, http.StatusOK, "Available slots retrieved", availableSlots)
}

// generateTimeSlotsFromAvailability creates time slots from availability
func generateTimeSlotsFromAvailability(availability model.TutorAvailability) []TimeSlot {
	var slots []TimeSlot

	// Generate slots every 30 minutes
	for current := availability.StartTime; current.Add(30*time.Minute).Before(availability.EndTime) || current.Equal(availability.EndTime.Add(-30*time.Minute)); current = current.Add(30 * time.Minute) {
		// Add 15-minute slot
		slots = append(slots, TimeSlot{
			Time:      current.Format("15:04"),
			Duration:  15,
			Available: !availability.IsBooked,
		})

		// Add 30-minute slot
		slots = append(slots, TimeSlot{
			Time:      current.Format("15:04"),
			Duration:  30,
			Available: !availability.IsBooked,
		})
	}

	return slots
}

// getSkillsForTutor returns skills for a tutor
func getSkillsForTutor(tutorID uint) string {
	var tutorTopics []model.TutorTopic
	var topics []model.Topic

	// Get tutor topics
	db.DB.Where("tutor_id = ?", tutorID).Find(&tutorTopics)

	// Get topic IDs
	topicIDs := make([]uint, len(tutorTopics))
	for i, tt := range tutorTopics {
		topicIDs[i] = tt.TopicID
	}

	// Get topics
	if len(topicIDs) > 0 {
		db.DB.Where("id IN ?", topicIDs).Find(&topics)
	}

	var skills []string
	for _, topic := range topics {
		skills = append(skills, topic.Name)
	}

	return strings.Join(skills, ",")
}

// generateTimeSlots creates 15-minute and 30-minute slots between start and end time
func generateTimeSlots(startTime, endTime string) []TimeSlot {
	var slots []TimeSlot

	// Parse times
	start := parseTime(startTime)
	end := parseTime(endTime)

	// Generate slots every 30 minutes
	for current := start; current.Add(30*time.Minute).Before(end) || current.Equal(end.Add(-30*time.Minute)); current = current.Add(30 * time.Minute) {
		// Add 15-minute slot
		slots = append(slots, TimeSlot{
			Time:      current.Format("15:04"),
			Duration:  15,
			Available: true,
		})

		// Add 30-minute slot
		slots = append(slots, TimeSlot{
			Time:      current.Format("15:04"),
			Duration:  30,
			Available: true,
		})
	}

	return slots
}

// parseTime converts a string time to time.Time
func parseTime(timeStr string) time.Time {
	parts := strings.Split(timeStr, ":")
	hour, _ := strconv.Atoi(parts[0])
	minute, _ := strconv.Atoi(parts[1])

	return time.Date(2024, time.January, 1, hour, minute, 0, 0, time.UTC)
}

// getNextOccurrenceOfDay returns the next occurrence of the specified day
func getNextOccurrenceOfDay(day string) time.Time {
	now := time.Now()
	days := map[string]time.Weekday{
		"Sunday":    time.Sunday,
		"Monday":    time.Monday,
		"Tuesday":   time.Tuesday,
		"Wednesday": time.Wednesday,
		"Thursday":  time.Thursday,
		"Friday":    time.Friday,
		"Saturday":  time.Saturday,
	}

	targetDay := days[day]
	daysUntil := int((targetDay - now.Weekday() + 7) % 7)
	if daysUntil == 0 {
		daysUntil = 7 // If today is the target day, go to next week
	}

	return now.AddDate(0, 0, daysUntil)
}
