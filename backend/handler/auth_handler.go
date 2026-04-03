package handler

import (
	"net/http"
	"os"
	"time"

	"mentor-connect/db"
	"mentor-connect/model"
	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type RegisterReq struct {
	FullName string `json:"full_name" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
	Role     string `json:"role" binding:"required,oneof=learner tutor"`
}

type LoginReq struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func Register(c *gin.Context) {
	var req RegisterReq
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	// Check if user exists
	var existingUser model.User
	if err := db.DB.Where("email = ?", req.Email).First(&existingUser).Error; err == nil {
		utils.SendError(c, http.StatusConflict, "Email already in use")
		return
	}

	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to hash password")
		return
	}

	user := model.User{
		FullName: req.FullName,
		Email:    req.Email,
		Password: string(hashedPwd),
		Role:     req.Role,
	}

	if err := db.DB.Create(&user).Error; err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to create user")
		return
	}

	// If tutor, automatically create a tutor profile stub
	if user.Role == "tutor" {
		tutor := model.Tutor{UserID: user.ID}
		db.DB.Create(&tutor)
	}

	utils.SendSuccess(c, http.StatusCreated, "User registered successfully", user)
}

func Login(c *gin.Context) {
	var req LoginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.SendError(c, http.StatusBadRequest, err.Error())
		return
	}

	var user model.User
	if err := db.DB.Where("email = ?", req.Email).First(&user).Error; err != nil {
		utils.SendError(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		utils.SendError(c, http.StatusUnauthorized, "Invalid credentials")
		return
	}

	// Generate JWT
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		utils.SendError(c, http.StatusInternalServerError, "Failed to generate token")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Login successful", gin.H{
		"token": tokenString,
		"user":  user,
	})
}

func GetProfile(c *gin.Context) {
	userID, _ := c.Get("userID")

	var user model.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		utils.SendError(c, http.StatusNotFound, "User not found")
		return
	}

	utils.SendSuccess(c, http.StatusOK, "Profile retrieved", user)
}
