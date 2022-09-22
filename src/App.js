import React, { useState, useEffect } from 'react';
import './App.css';

// Importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
	let localTodos = [];
	if (localStorage.getItem('todos') !== null) {
		localTodos = JSON.parse(localStorage.getItem('todos'));
	}

	// States
	const [inputText, setInputText] = useState("");
	const [todos, setTodos] = useState(localTodos);
	const [status, setStatus] = useState("all");
	const [filteredTodos, setFilteredTodos] = useState([]);

	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);


	// Functions
	function filterHandler() {
		switch (status) {
			case "completed":
				setFilteredTodos(todos.filter(todo => todo.completed === true));
				break;
			case "uncompleted":
				setFilteredTodos(todos.filter(todo => todo.completed === false));
				break;
			default:
				setFilteredTodos(todos);
		}
	}

	// Save to local storage
	function saveLocalTodos() {
		const json = JSON.stringify(todos);
		localStorage.setItem('todos', json);
	}

	return (
		<div className="App">
			<header>
				<h1>Aaron's Todo List</h1>
			</header>
			<Form
				todos={todos}
				setTodos={setTodos}
				inputText={inputText}
				setInputText={setInputText}
				setStatus={setStatus}
			/>
			<TodoList todos={filteredTodos} setTodos={setTodos} />
		</div>
	);
}

export default App;
