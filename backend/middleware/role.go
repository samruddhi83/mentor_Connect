package middleware

import (
	"net/http"

	"mentor-connect/utils"

	"github.com/gin-gonic/gin"
)

func RoleMiddleware(requiredRole string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("role")
		if !exists {
			utils.SendError(c, http.StatusUnauthorized, "Unauthorized")
			c.Abort()
			return
		}

		// Tutor routes might also be accessed by admins if added later, but for now strict check:
		if role.(string) != requiredRole {
			utils.SendError(c, http.StatusForbidden, "Forbidden: insufficient permissions")
			c.Abort()
			return
		}

		c.Next()
	}
}
