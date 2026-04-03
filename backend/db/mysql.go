package db

import (
	"fmt"
	"log"
	"os"

	"mentor-connect/model"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DB_DSN")
	if dsn == "" {
		// Use a local database connection as fallback
		dsn = "root:password@tcp(127.0.0.1:3306)/mentor_connect?charset=utf8mb4&parseTime=True&loc=Local"
	}

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Database connection established!")

	err = db.AutoMigrate(
		&model.User{},
		&model.Tutor{},
		&model.Availability{},
		&model.Subscription{},
		&model.Appointment{},
		&model.Review{},
	)

	if err != nil {
		log.Fatalf("Failed to auto-migrate database: %v", err)
	}

	DB = db
}
