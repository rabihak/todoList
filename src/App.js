import "./App.css";
import React, { useState, useEffect } from "react";
//Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";
function App() {
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);

	//use effect
	useEffect(() => {
		getLocalTodos();
	}, []);
	useEffect(() => {
		saveLocalTodos();
		filterHandler();
	}, [todos, status]);

	//functions
	const filterHandler = () => {
		switch (status) {
			case "completed":
				setFilteredTodos(todos.filter((todo) => todo.completed == true));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter((todo) => todo.completed == false));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};
	//save to local
	const saveLocalTodos = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};
	const getLocalTodos = () => {
		if (localStorage.getItem("todos") === null) {
			localStorage.setItem("todos", JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem("todos"));
			setTodos(todoLocal);
		}
	};

	//render
	return (
		<div className='App'>
			<header>
				<h1 className='Todolist-h1'> Todo List </h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				setInputText={setInputText}
				inputText={inputText}
				setStatus={setStatus}
			/>
			<TodoList
				setTodos={setTodos}
				todos={todos}
				filteredTodos={filteredTodos}
				setFilteredTodos={setFilteredTodos}
			/>
		</div>
	);
}

export default App;
