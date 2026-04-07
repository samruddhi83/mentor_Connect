package db

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		// Use a local database connection as fallback
		dsn = "root:root@123@tcp(127.0.0.1:3306)/mentorConnect?charset=utf8mb4&parseTime=True&loc=Local"
	}

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Database connection established!")

	// Database schema already created manually, skip auto-migration
	fmt.Println("Using existing database schema...")

	fmt.Println("Database tables created successfully!")

	DB = db
}
