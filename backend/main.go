package main

import (
	"github.com/LattyCat/ToDoApp-with-golang-and-react/backend/handler"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/todos", handler.GetTodos)
	e.POST("/todos", handler.AddToDo)
	e.PUT("/todos/:id", handler.UpdateToDo)
	e.DELETE("/todos/:id", handler.DeleteToDo)

	e.Start(":8080")
}
