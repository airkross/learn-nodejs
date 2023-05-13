import mongoose from "mongoose";
import { TodosListsModelValues } from "./todos-lists.types";

/**
 * @todo возможно сделать обертку над схемами унаследоваться от mongoose.Schema
 */

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

export const TodosListsModel = mongoose.model<TodosListsModelValues>("TodosLists", todoListSchema);
