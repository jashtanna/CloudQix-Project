package routes

import (
	"cloudQix/controller"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	api := r.Group("/api/v1")
	{
		api.POST("/map-json", controller.HandleDynamicMapping())
	}
}
