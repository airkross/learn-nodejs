import mongoose from "mongoose";
import { TodosListModelProps } from './todos-list.types'

/**
 * @todo возможно сделать обертку над схемами унаследоваться от mongoose.Schema
 */

const TodoList = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

export const TodosListModel = mongoose.model<TodosListModelProps>("TodosLists", TodoList);
