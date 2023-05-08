import { Request, Response } from "express";
import { BaseModuleController } from "../../config/base-module/base-module.controller";
import { TodosListsModelValues } from "./todos-list.types";
import { TodosListModel } from "./todos-lists.model";
import todosController from "../todos/todos.controller";
import mongoose from "mongoose";

/**
 * @todo подумать как уменьшить связность кода с todosController
 */

export class TodosListsController extends BaseModuleController<TodosListsModelValues> {
    async getTodosLists(req: Request, res: Response): Promise<void> {
        console.log(321) // остановился тут, понять почему не доходят запросы сюда
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
            const isValidId = mongoose.Types.ObjectId.isValid(id);

            if (isValidId) {
                const todosList = await this.model.findById(id);

                if (todosList) {
                    res.status(200).json(todosList);
                    return;
                }
            }

            res.status(404).json({ message: `Список заметок с id=${id} не существует.` });
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
            const { id } = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(id);

            if (isValidId) {
                await this.model.updateOne({ _id: id }, req.body);

                const updatedTodosList = await this.model.findById(id);

                res.status(200).json({
                    details: updatedTodosList,
                    message: "Список заметок усшено редактирован.",
                });

                return;
            }

            res.status(404).json({ message: `Списка заметок с id=${id} не существует.` });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async deleteTodosList(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(id);
            if (isValidId) {
                const deletedTodosList = await this.model.findByIdAndDelete(id);
                const deletedTodo = await todosController.model.deleteMany({ todosListId: id });

                if (deletedTodosList && deletedTodo) {
                    res.status(200).send({
                        details: deletedTodosList,
                        message: `Cписок заметок с id=${id} успешно удален.`,
                    });
                    return;
                }
            }

            res.status(404).json({
                message: `Список заметок с id=${id} не существует.`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }
}
