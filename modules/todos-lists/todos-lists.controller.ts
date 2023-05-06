import { Request, Response } from "express";
import { TodosListModel } from "./todos-lists.model";
import mongoose from "mongoose";

/**
 * @todo возможно сделать обертку над контроллерами в config/modules/base.controller.ts
 */

class TodosListsController {
    async getTodosLists(req: Request, res: Response): Promise<void> {
        try {
            const todosLists = await TodosListModel.find();
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
                const todosList = await TodosListModel.findById(id);

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
            const newTodosList = await new TodosListModel({ ...req.body }).save();

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
                await TodosListModel.updateOne({ _id: id }, req.body);

                const updatedTodosList = await TodosListModel.findById(id);

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
            // найти все тудушки списка и удалить их
            const deletedTodosList = await TodosListModel.findByIdAndDelete(id);

            if (deletedTodosList) {
                res.status(200).send({
                    details: deletedTodosList,
                    message: `Cписок заметок с id=${id} успешно удален.`,
                });
                return;
            }

            res.status(404).json({
                message: `Список заметок с id=${id} не существует.`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }
}

export default new TodosListsController();
