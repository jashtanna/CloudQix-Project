package main

import (
	"cloudQix/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	routes.RegisterCorsMiddleware(r)

	routes.RegisterRoutes(r)

	r.Run(":8080")
}
