import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
	name: String,
	isDone: Boolean,
})

const Todo = mongoose.model("todo", todoSchema)

export default Todo;
