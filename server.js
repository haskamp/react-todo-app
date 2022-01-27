import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import {writeFile, readFile} from "fs/promises"
import {v4 as uuid} from "uuid";
import {connectDatabase, getTodoCollection} from "./utils/database.js";

const app = express();
const port = 3313

app.use(express.json())
app.use(cors())

if (!process.env.MONGODB_URI) {
	throw new Error("No URI variable in dotenv")
}

// Hello World
app.get("/", (request, response) => {
	response.send("Hello World!")
})

const DATABASE_URI = "./database/database.json"

// Database abfrage
app.get("/api/todos", async (request, response) => {
	// Get data from DB
	const collection = getTodoCollection();
	// Parse data

	// unfertig get methode
	response.json(json.todos)
})

// ToDos auf datenbank speichern
app.post("/api/todos",  async (request, response) => {
	// get data from db
	const collection = getTodoCollection();
	// Create new to do
	const todo = {
		name: "clean Kitchen",
		isDone: false,
	};
	// Add to-do
	const mongodbResponse = await collection.insertOne(todo)
	// save changes to database
	response.status(201).send(`Insertion successful, Added ID ${mongodbResponse.insertedId}`)
});


// Delete last to do?
app.delete("/api/todos", async (request, response) => {
	// get data from db
	const data = await readFile(DATABASE_URI, "utf8")
	const json = JSON.parse(data)
	// delete to-do entry
	const { id } = request.body; // woher die id? was ist sie?
	// warum funktioniert das hier nur als funktion
	const indexOfTodo= json.todos.findIndex((todos) => {todos.id === id})
	json.todos.splice(indexOfTodo, 1)
	// save changes to database
	await writeFile(DATABASE_URI, JSON.stringify(json, null, 4))
	response.status(201)
})




connectDatabase(process.env.MONGODB_URI)
	.then(() => {
		app.listen(port, () => {
			console.log("He is listening")
		})
	})


/*app.put("/api/todos", async (request, response) => {
	const { id, update } = request.body;
	const data = await readFile(DATABASE_URI, "utf-8");
	const json = JSON.parse(data);
	const index = json.todos.findIndex(user => user.id === id);
	if (index < 0) {
		throw new Error("This entry does not exist");
	}
	json.todos[index] = { ...json.todos[index], ...update, id };
	await writeFile(DATABASE_URI, JSON.stringify(json, null, 4));
	// Send a 200
	response.status(200);
	response.send(json.todos[index]);
	// Or 204 (No Content)
	// response.status(204);
	// response.send();
});*/



/*// ToDos auf datenbank speichern
app.post("/api/todos",  async (request, response) => {
	// get data from db
	const data = await readFile(DATABASE_URI, "utf8")
	const json = JSON.parse(data)
	// Create new to do
	const todo = {
		name: "clean Kitchen",
		done: false,
		id: uuid(),
	};
	// Add to-do
	json.todos.push(todo);
	// save changes to database
	await writeFile(DATABASE_URI, JSON.stringify(json, null, 4))
	response.status(201)
});*/


