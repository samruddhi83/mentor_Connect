package handler

import (
	"net/http"
	"strconv"

	"MentorConnect/db"
	"MentorConnect/model"
	"MentorConnect/utils"

	"github.com/gin-gonic/gin"
)

type TutorProfileUpdateReq struct {
	Headline        string  `json:"headline"`
	ExperienceYears int     `json:"experience_years"`
	HourlyRate      float64 `json:"hourly_rate"`
	LinkedInURL      string  `json:"linkedin_url"`
	GitHubURL       string  `json:"github_url"`
	WebsiteURL      string  `json:"website_url"`
	MeetingLink     string  `json:"meeting_link"`
}

type LearnerProfileUpdateReq struct {
	Education  string `json:"education"`
	CareerGoal string `json:"career_goal"`
}

func GetMyProfile(c *gin.Context) {
	userID, _ := c.Get("userID")
	userIDUint := userID.(uint)

	// Get user details
	var user model.User
	if err := db.DB.First(&user, userIDUint).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "User not found")
		return
	}

	// Get role-specific profile
	profileData := gin.H{}

	if user.Role == "tutor" {
		var tutorProfile model.TutorProfile
		if err := db.DB.Where("user_id = ?", userIDUint).First(&tutorProfile).Error; err == nil {
			profileData = gin.H{
				"headline":          tutorProfile.Headline,
				"experience_years":  tutorProfile.ExperienceYears,
				"hourly_rate":       tutorProfile.HourlyRate,
				"linkedin_url":      tutorProfile.LinkedInURL,
				"github_url":        tutorProfile.GitHubURL,
				"website_url":       tutorProfile.WebsiteURL,
				"meeting_link":      tutorProfile.MeetingLink,
				"average_rating":    tutorProfile.AverageRating,
				"total_reviews":     tutorProfile.TotalReviews,
			}
		}
	} else if user.Role == "learner" {
		var learnerProfile model.LearnerProfile
		if err := db.DB.Where("user_id = ?", userIDUint).First(&learnerProfile).Error; err == nil {
			profileData = gin.H{
				"education":   learnerProfile.Education,
				"career_goal": learnerProfile.CareerGoal,
			}
		}
	}

	// Combine user and profile data
	response := gin.H{
		"id":            user.ID,
		"first_name":    user.FirstName,
		"last_name":     user.LastName,
		"email":         user.Email,
		"phone":         user.Phone,
		"role":          user.Role,
		"profile_image": user.ProfileImage,
		"bio":           user.Bio,
		"is_active":     user.IsActive,
		"created_at":    user.CreatedAt,
		"updated_at":    user.UpdatedAt,
	}

	// Add role-specific profile data
	for key, value := range profileData {
		response[key] = value
	}

	utils.SendSuccess(c, http.StatusOK, "Profile retrieved successfully", response)
}

func UpdateMyProfile(c *gin.Context) {
	userID, _ := c.Get("userID")
	userIDUint := userID.(uint)

	// Get user details
	var user model.User
	if err := db.DB.First(&user, userIDUint).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "User not found")
		return
	}

	// Parse common user fields
	var req struct {
		FirstName   string `json:"first_name"`
		LastName    string `json:"last_name"`
		Phone       string `json:"phone"`
		Bio         string `json:"bio"`
		ProfileData gin.H  `json:"profile_data"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	// Update user basic info
	if req.FirstName != "" {
		user.FirstName = req.FirstName
	}
	if req.LastName != "" {
		user.LastName = req.LastName
	}
	if req.Phone != "" {
		user.Phone = req.Phone
	}
	if req.Bio != "" {
		user.Bio = req.Bio
	}

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to update user profile")
		return
	}

	// Update role-specific profile
	if user.Role == "tutor" {
		var tutorProfile model.TutorProfile
		if err := db.DB.Where("user_id = ?", userIDUint).First(&tutorProfile).Error; err != nil {
			// Create tutor profile if it doesn't exist
			tutorProfile = model.TutorProfile{UserID: userIDUint}
		}

		// Update tutor-specific fields
		if headline, ok := req.ProfileData["headline"].(string); ok && headline != "" {
			tutorProfile.Headline = headline
		}
		if expYears, ok := req.ProfileData["experience_years"].(float64); ok {
			tutorProfile.ExperienceYears = int(expYears)
		}
		if hourlyRate, ok := req.ProfileData["hourly_rate"].(float64); ok {
			tutorProfile.HourlyRate = hourlyRate
		}
		if linkedinURL, ok := req.ProfileData["linkedin_url"].(string); ok {
			tutorProfile.LinkedInURL = linkedinURL
		}
		if githubURL, ok := req.ProfileData["github_url"].(string); ok {
			tutorProfile.GitHubURL = githubURL
		}
		if websiteURL, ok := req.ProfileData["website_url"].(string); ok {
			tutorProfile.WebsiteURL = websiteURL
		}
		if meetingLink, ok := req.ProfileData["meeting_link"].(string); ok {
			tutorProfile.MeetingLink = meetingLink
		}

		if err := db.DB.Save(&tutorProfile).Error; err != nil {
			utils.SendError(c, http.StatusInternalServerError, "Failed to update tutor profile")
			return
		}

	} else if user.Role == "learner" {
		var learnerProfile model.LearnerProfile
		if err := db.DB.Where("user_id = ?", userIDUint).First(&learnerProfile).Error; err != nil {
			// Create learner profile if it doesn't exist
			learnerProfile = model.LearnerProfile{UserID: userIDUint}
		}

		// Update learner-specific fields
		if education, ok := req.ProfileData["education"].(string); ok {
			learnerProfile.Education = education
		}
		if careerGoal, ok := req.ProfileData["career_goal"].(string); ok {
			learnerProfile.CareerGoal = careerGoal
		}

		if err := db.DB.Save(&learnerProfile).Error; err != nil {
			utils.SendError(c, http.StatusInternalServerError, "Failed to update learner profile")
			return
		}
	}

	utils.SendSuccess(c, http.StatusOK, "Profile updated successfully", nil)
}

func GetPublicProfile(c *gin.Context) {
	userIDStr := c.Param("id")
	userID, err := strconv.ParseUint(userIDStr, 10, 32)
	if err != nil {
		utils.SendError(c, http.StatusBadRequest, "Invalid user ID")
		return
	}

	// Get user details
	var user model.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "User not found")
		return
	}

	// Only show public information
	response := gin.H{
		"id":            user.ID,
		"first_name":    user.FirstName,
		"last_name":     user.LastName,
		"role":          user.Role,
		"bio":           user.Bio,
		"profile_image": user.ProfileImage,
	}

	// Add role-specific public profile data
	if user.Role == "tutor" {
		var tutorProfile model.TutorProfile
		if err := db.DB.Where("user_id = ?", userID).First(&tutorProfile).Error; err == nil {
			response["headline"] = tutorProfile.Headline
			response["experience_years"] = tutorProfile.ExperienceYears
			response["hourly_rate"] = tutorProfile.HourlyRate
			response["average_rating"] = tutorProfile.AverageRating
			response["total_reviews"] = tutorProfile.TotalReviews
		}
	}

	utils.SendSuccess(c, http.StatusOK, "Public profile retrieved", response)
}
