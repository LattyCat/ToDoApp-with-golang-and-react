package handler

import (
	"net/http"
	"strconv"

	"github.com/LattyCat/ToDoApp-with-golang-and-react/backend/database"
	"github.com/LattyCat/ToDoApp-with-golang-and-react/backend/model"
	"github.com/labstack/echo/v4"
)

func GetTodos(c echo.Context) error {
	db := database.Connect()
	defer db.Close()

	rows, err := db.Query(`SELECT id, title, completed FROM todos`)
	if err != nil {
		return err
	}
	defer rows.Close()

	todos := []model.Todo{}
	for rows.Next() {
		t := model.Todo{}
		err = rows.Scan(&t.Id, &t.Title, &t.Completed)
		if err != nil {
			return err
		}
		todos = append(todos, t)
	}

	// rows.Err() をチェックすることで、rowsの繰り返し処理中に発生したエラーを検出できます。
	if err = rows.Err(); err != nil {
		return err
	}

	return c.JSON(http.StatusOK, todos)
}

func AddToDo(c echo.Context) error {
	t := &model.Todo{}
	if err := c.Bind(t); err != nil {
		return err
	}

	db := database.Connect()
	defer db.Close()

	sqlStatement := `INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING id`
	err := db.QueryRow(sqlStatement, t.Title, t.Completed).Scan(&t.Id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusCreated, t)
}

func UpdateToDo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	t := &model.Todo{Id: id}
	if err := c.Bind(t); err != nil {
		return err
	}

	db := database.Connect()
	defer db.Close()

	sqlStatement := `UPDATE todos SET title=$1, completed=$2 WHERE id=$3`
	_, err := db.Exec(sqlStatement, t.Title, t.Completed, t.Id)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, t)
}

func DeleteToDo(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	db := database.Connect()
	defer db.Close()

	sqlStatement := `DELETE FROM todos WHERE id=$1`
	_, err := db.Exec(sqlStatement, id)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusNoContent)
}
