package app

import (
	"github.com/gin-gonic/gin"
)

func Run() {
	router := gin.Default()

	staticRouter := router.Static("/static", "./static")
	if gin.Mode() == gin.DebugMode {
		staticRouter.Use(forceStaticReload)
	}

	router.HTMLRender = createCustomRenderer("templates")
	router.GET("/", viewIndex)

	router.Run()
}
