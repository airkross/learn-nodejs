import mongoose, { Model } from "mongoose";
import { Request, Response } from "express";
import { BaseModuleController } from "../../containers/base-module/base-module.controller";
import { TodosListsModelValues } from "./todos-lists.types";
import { TodosListsModel } from "./todos-lists.model";
import { TodosModel } from "../todos/todos.model";
import { TodosModelValues } from "../todos/todos.types";

export class TodosListsController extends BaseModuleController<TodosListsModelValues> {
    todosModel!: Model<TodosModelValues>;

    constructor() {
        super();
        this.todosModel = TodosModel;
    }

    protected override getModel() {
        return TodosListsModel;
    }

    async getTodosLists(req: Request, res: Response): Promise<void> {
        try {
            const todosLists = await this.model.find();
            res.status(200).json(todosLists);
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async getTodoList(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const todosList = await this.model.findById(id);

            if (!todosList) {
                res.status(404).json({ message: `Список заметок с id=${id} не существует.` });
                return;
            }

            res.status(200).json(todosList);
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async addTodosList(req: Request, res: Response): Promise<void> {
        try {
            const newTodosList = await new this.model({ ...req.body }).save();

            if (newTodosList) {
                res.status(201).json({
                    details: newTodosList,
                    message: "Список заметок усшено создан.",
                });
                return;
            }

            res.status(400).json({
                message: "Ошбика создания списка заметок.",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async editTodosList(req: Request, res: Response): Promise<void> {
        try {
            const { list_id } = req.params;
            const updatedTodosList = await this.model.findByIdAndUpdate({ _id: list_id }, req.body);

            if (!updatedTodosList) {
                res.status(404).json({ message: `Списка заметок с list_id=${list_id} не существует.` });
                return;
            }

            res.status(200).json({
                details: updatedTodosList,
                message: "Список заметок усшено редактирован.",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async deleteTodosList(req: Request, res: Response): Promise<void> {
        try {
            const { list_id } = req.params;
            const deletedTodosList = await this.model.findByIdAndDelete(list_id);

            if (!deletedTodosList) {
                res.status(404).json({
                    message: `Список заметок с list_id=${list_id} не существует.`,
                });
                return;
            }

            await this.todosModel.deleteMany({ todosListId: list_id });
            res.status(200).send({
                details: deletedTodosList,
                message: `Cписок заметок с list_id=${list_id} успешно удален.`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }
}
