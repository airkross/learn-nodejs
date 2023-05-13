import mongoose from "mongoose";
import { TodosModelValues } from "./todos.types";

/**
 * @todo возможно сделать обертку над схемами унаследоваться от mongoose.Schema
 */

const todosSchema = new mongoose.Schema({
    isChecked: {
        type: Boolean,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    todosListId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TodosLists",
    },
});

export const TodosModel = mongoose.model<TodosModelValues>("Todos", todosSchema);
