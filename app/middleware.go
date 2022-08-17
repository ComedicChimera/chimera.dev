package app

import (
	"time"

	"github.com/gin-gonic/gin"
)

func forceStaticReload(c *gin.Context) {
	c.Header("Expires", "Tue, 01 Jan 2000 00:00:00 GMT")
	c.Header("Last-Modified", time.Now().Format(time.RFC1123))
	c.Header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0")
	c.Header("Pragma", "no-cache")

	c.Next()
}
