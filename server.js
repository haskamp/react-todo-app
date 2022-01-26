import express from "express"
import {}
const app = express();
const port = 3313


app.listen(port, () => {
	console.log("He is listining")
})

// Hello World
app.get("/", (request, response) => {
	response.send("Hello World!")
})


app.get("/api/todos", (request, response) => {
	response.json([{id: 1, name: "name"}])
})




app.get("/", (request, response) => {
	response.send("Handle GET request")
})
app.post("/", (request, response) => {
	response.send("Handle POST request")
})
app.put("/", (request, response) => {
	response.send("Handle PUT request")
})
app.delete("/", (request, response) => {
	response.send("Handle POST request")
})

