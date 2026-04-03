package main

import (
	"log"
	"os"

	"mentor-connect/db"
	"mentor-connect/router"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("Not using .env file or it could not be loaded")
	}

	// Connect to database
	db.ConnectDB()

	// Setup Router
	r := router.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
