package router

import (
	"MentorConnect/handler"
	"MentorConnect/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Set up CORS middleware
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	api := r.Group("/api")
	{
		// Auth routes
		auth := api.Group("/auth")
		{
			auth.POST("/register", handler.Register)
			auth.POST("/login", handler.Login)
			auth.GET("/profile", middleware.AuthMiddleware(), handler.GetProfile)
		}

		// Profile routes
		profile := api.Group("/profile")
		profile.Use(middleware.AuthMiddleware())
		{
			profile.GET("/", handler.GetMyProfile)
			profile.PUT("/", handler.UpdateMyProfile)
			profile.GET("/:id", handler.GetPublicProfile)
		}

		// Tutor routes
		tutors := api.Group("/tutors")
		{
			tutors.GET("/", handler.GetTutors)
			tutors.GET("/:id", handler.GetTutorByID)
			tutors.PUT("/:id", middleware.AuthMiddleware(), middleware.RoleMiddleware("tutor"), handler.UpdateTutor)
			tutors.DELETE("/:id", middleware.AuthMiddleware(), middleware.RoleMiddleware("tutor"), handler.DeleteTutor)
		}

		// Available slots endpoint
		api.GET("/slots", handler.GetAvailableSlots)

		// Availability
		availability := api.Group("/availability")
		availability.Use(middleware.AuthMiddleware())
		{
			availability.GET("/", handler.GetAvailability)
			availability.POST("/", middleware.RoleMiddleware("tutor"), handler.AddAvailability)
			availability.POST("/bulk", middleware.RoleMiddleware("tutor"), handler.AddBulkAvailability)
			availability.DELETE("/:id", middleware.RoleMiddleware("tutor"), handler.DeleteAvailability)
		}

		// Subscriptions
		subscriptions := api.Group("/subscriptions")
		subscriptions.Use(middleware.AuthMiddleware())
		{
			subscriptions.GET("/my", handler.GetMySubscription)
			subscriptions.POST("/", middleware.RoleMiddleware("learner"), handler.Subscribe)
		}

		// Appointments
		appointments := api.Group("/appointments")
		appointments.Use(middleware.AuthMiddleware())
		{
			appointments.POST("/", middleware.RoleMiddleware("learner"), handler.BookAppointment)
			appointments.GET("/", handler.GetMyAppointments)
			appointments.PUT("/status/:id", middleware.RoleMiddleware("tutor"), handler.UpdateAppointmentStatus)
		}

		// Reviews
		reviews := api.Group("/reviews")
		{
			reviews.GET("/:tutorId", handler.GetTutorReviews)
			reviews.POST("/", middleware.AuthMiddleware(), middleware.RoleMiddleware("learner"), handler.AddReview)
		}
	}

	return r
}
