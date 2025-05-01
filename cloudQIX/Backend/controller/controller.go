package controller

import (
	"cloudQix/service"
	"github.com/gin-gonic/gin"
	"net/http"
	"log"
)

func HandleDynamicMapping() gin.HandlerFunc {
	return func(c *gin.Context) {
		log.Println("Received request to HandleDynamicMapping")

		var input struct {
			RequestJSON    map[string]interface{} `json:"request_json"`
			RequestMapping map[string]string      `json:"request_mapping"`
		}

		log.Println("Binding JSON data...")
		if err := c.BindJSON(&input); err != nil {
			log.Printf("Error binding JSON: %s", err.Error())
			c.JSON(http.StatusBadRequest, map[string]any{
				"error":   "Invalid JSON format",
				"details": err.Error(),
			})
			return
		}

		log.Printf("Request JSON: %+v", input.RequestJSON)
		log.Printf("Request Mapping: %+v", input.RequestMapping)

		// Checking for missing or nil fields before processing
		if input.RequestJSON == nil || input.RequestMapping == nil {
			log.Println("Error: request_json or request_mapping is nil")
			c.JSON(http.StatusBadRequest, map[string]any{
				"error": "request_json or request_mapping is nil",
			})
			return
		}

		log.Println("Processing mapping...")
		// implementing  the actual transformation logic to the service layer
		output, err := service.ProcessMapping(input.RequestJSON, input.RequestMapping)
		if err != nil {
			log.Printf("Error processing mapping: %s", err.Error())
			c.JSON(http.StatusInternalServerError, map[string]any{
				"error": err.Error(),
			})
			return
		}

		log.Println("Mapping processed successfully")
		c.JSON(http.StatusOK, output)
	}
}
