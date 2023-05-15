import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";
import { BaseModuleController } from "../../containers/base-module/base-module.controller";
import { TodosModelValues } from "./todos.types";
import { TodosModel } from "./todos.model";
import { TodosListsModel } from "../todos-lists/todos-lists.model";
import { TodosListsModelValues } from "../todos-lists/todos-lists.types";

export class TodosController extends BaseModuleController<TodosModelValues> {
    /**
     * @todo уменьшить связность с моделью другого модуля. Получить todosListsModel через refModel?(): Model<model> колбек
     */
    todosListsModel!: Model<TodosListsModelValues>;

    constructor() {
        super();
        this.todosListsModel = TodosListsModel;
    }

    protected override getModel() {
        return TodosModel;
    }

    async getTodos(req: Request, res: Response): Promise<void> {
        try {
            const { list_id } = req.params;
            const todos = await this.model.find({ todosListId: list_id });
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async getTodo(req: Request, res: Response): Promise<void> {
        try {
            const { list_id, id } = req.params;
            const todoList = await this.todosListsModel.findById(list_id);

            if (!todoList) {
                res.status(404).json({ message: `Списка заметок с list_id=${list_id} не существует.` });
                return;
            }

            const todo = await this.model.findById(id);

            if (!todo) {
                res.status(404).json({ message: `Заметка с id=${id} не существует.` });
                return;
            }

            res.status(200).json(todo);
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async addTodo(req: Request, res: Response): Promise<void> {
        try {
            const { list_id } = req.params;
            const todoList = await this.todosListsModel.findById(list_id);

            if (!todoList) {
                res.status(404).json({
                    message: `Список заметок с list_id=${list_id} не существует`,
                });
                return;
            }

            const newTodo = await new this.model({
                ...req.body,
                isChecked: false,
                todosListId: todoList?._id,
            }).save();

            res.status(201).json({
                details: newTodo,
                message: "Заметка усшено создана.",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async editTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const todoList = await this.todosListsModel.findById(list_id);

            if (!todoList) {
                res.status(404).json({
                    message: `Список заметок с list_id=${list_id} не существует`,
                });
                return;
            }

            const updatedTodo = await this.model.findOneAndUpdate({ _id: id, todosListId: list_id }, req.body);

            if (!updatedTodo) {
                res.status(404).json({
                    message: `Заметки с id=${list_id} не существует`,
                });
                return;
            }

            res.status(200).json({
                details: updatedTodo,
                message: "Заметка усшено редактирована",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async checkTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const { isChecked } = req.body;
            const todoList = await this.todosListsModel.findById(list_id);

            if (!todoList) {
                res.status(404).json({
                    message: `Список заметок с list_id=${list_id} не существует`,
                });
                return;
            }

            if (isChecked === undefined) {
                res.status(400).json({ message: `Поле isChecked обязательно для заполнения` });
            }

            const updatedTodo = await this.model.findOneAndUpdate({ _id: id, todosListId: list_id }, { isChecked });

            if (!updatedTodo) {
                res.status(404).json({ message: `Заметка с id=${id} не существует.` });
                return;
            }

            res.status(200).json({
                details: updatedTodo,
                message: "Заметка усшено редактирована",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const todoList = await this.todosListsModel.findById(list_id);

            if (!todoList) {
                res.status(404).json({
                    message: `Список заметок с list_id=${list_id} не существует`,
                });
                return;
            }

            const deletedTodo = await this.model.findOneAndDelete({ _id: id, todosListId: list_id });

            if (!deletedTodo) {
                res.status(404).json({
                    message: `Заметка с id=${id} не существует.`,
                });
                return;
            }

            res.status(200).send({
                details: deletedTodo,
                message: `Заметка с id=${id} успешно удалена`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }
}
