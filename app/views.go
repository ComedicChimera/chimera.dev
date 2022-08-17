package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func viewIndex(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{"Title": "Home"})
}
