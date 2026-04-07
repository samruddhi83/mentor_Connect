package main

import (
	"log"
	"os"

	"MentorConnect/db"
	"MentorConnect/router"

	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	// Connect to database
	db.ConnectDB()

	// Setup routes
	r := router.SetupRouter()

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on port %s", port)
	log.Fatal(r.Run(":" + port))
}
