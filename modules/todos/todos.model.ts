import mongoose from "mongoose";

/**
 * @todo сделать абстракцию над mongoose.Schema
 */

const Todo = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

export const TodoModel = mongoose.model("todos", Todo);
