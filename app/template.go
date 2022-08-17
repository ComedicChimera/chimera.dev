package app

import (
	"log"
	"path/filepath"

	"github.com/gin-contrib/multitemplate"
)

func createCustomRenderer(templateDir string) multitemplate.Renderer {
	r := multitemplate.NewRenderer()

	baseTmpl := filepath.Join(templateDir, "base.html")

	pages, err := filepath.Glob(filepath.Join(templateDir, "pages/*.html"))
	if err != nil {
		log.Fatalln(err)
	}

	for _, page := range pages {
		r.AddFromFiles(filepath.Base(page), baseTmpl, page)
	}

	return r
}
