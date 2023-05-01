import mongoose from "mongoose";

/**
 * @todo возможно сделать обертку над схемами унаследоваться от mongoose.Schema
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
