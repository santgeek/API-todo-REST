import React, { useState, useEffect } from "react";

const Home = () => {

	let [inputValue, setInputValue] = useState("");
	let [arrToDo, setArrToDo] = useState([]);
	let [hoverIndex, setHoverIndex] = useState(null);

	const createUser = async () => {
		await fetch('https://playground.4geeks.com/todo/users/santiago', {
			method: 'POST',
			body: { name: "santiago", id: 666 },
			headers: { "Content-Type": "application/json" }
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => {
				console.error("Error", error)
			})
	}

	const handleKeyDown = async (e) => {
		if (inputValue.trim() === "") return
		if (e.key === "Enter") {
			setArrToDo([...arrToDo, inputValue.trim()]);
			await addTask();
			obtainData()
			setInputValue("");
		}
	};

	const handleDelete = (index) => {
		setArrToDo(arrToDo.filter((curr, i) => i !== index));
	};

	const handleDeleteList = () => {
		fetch('https://playground.4geeks.com/todo/users/santiago', {
			method: 'DELETE'
		})
			.then(response => {
				if (response.ok) {
					setArrToDo([])
					createUser()
				} else {
					console.log("error")
				}
			})
			.catch(error => {
				console.log("Error", error)
			})
	}

	const obtainData = async () => {
		await fetch('https://playground.4geeks.com/todo/users/santiago')
			.then((response) => response.json())
			.then((json) => console.log(json))
	}

	const newItem = { label: inputValue };
	const addTask = () => {
		if (inputValue) {
			fetch('https://playground.4geeks.com/todo/todos/santiago', {
				method: "POST",
				body: JSON.stringify(newItem),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data)
				})
				.catch(error => {
					console.log("Error", error)
				})
		}
	}

	useEffect(() => {
		createUser()
	}, [])

	useEffect(() => {
		obtainData()
	}, [])

	return (
		<div className="container w-50 text-center mt-5 d-flex flex-column">
			<div className="mb-2">
				<h1 className="display-2 fw-light text-muted">todos</h1>
			</div>

			<ul className="list-group rounded-0">
				<li className="list-group-item input-group-md">
					<input
						className="border-0 d-block text-start form-control text-secondary fs-4"
						type="text"
						onKeyDown={handleKeyDown}
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						placeholder={arrToDo.length === 0 ? "No hay tareas, añadir tareas" : ""}
					/>
				</li>
				{arrToDo.map((element, index) =>
					<li
						key={index}
						className="list-group-item d-flex justify-content-between text-secondary fs-4"
						onMouseEnter={() => setHoverIndex(index)}
						onMouseLeave={() => setHoverIndex(null)}
					> {element}
						{hoverIndex === index && (
							<button
								className="btn btn-sm justify-content-between"
								onClick={() => handleDelete(index)}
							>
								x
							</button>
						)}
					</li>

				)}
				<li className="list-group-item text-start text-secondary">
					<h6 className="h6 fw-lighter"><small>{arrToDo.length} items left</small> </h6>
				</li>
				<div className="backgroundBox1"></div>
				<div className="backgroundBox2"></div>
			</ul>

			<div className="background-box">back1</div>
			<div className="background-box2">back2</div>
			<button id="clean" type="button" className="btn btn-lg" onClick={() => handleDeleteList()}>Limpiar lista</button>
		</div>
	);
};

export default Home;