import { Request, Response } from "express";
import { TodoModel } from "./todos.model";
import { TodosListModel } from "../todos-lists/todos-lists.model";
import mongoose from "mongoose";

/**
 * @todo возможно сделать обертку над контроллерами в config/modules/base.controller.ts
 */

class TodosController {
    async getTodos(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(list_id);
            if (isValidId) {
                const todos = await TodoModel.find({ todosListId: list_id });
                res.status(200).json(todos);
                return;
            }

            res.status(404).json({
                message: `Список заметок с id=${id} не существу`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async getTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(id);

            if (isValidId) {
                const todo = await TodoModel.findById(id);

                if (todo) {
                    res.status(200).json(todo);
                    return;
                }
            }

            res.status(404).json({ message: `Заметка с id=${id} не существует.` });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async addTodo(req: Request, res: Response): Promise<void> {
        try {
            const { list_id } = req.params;
            const isValidListId = mongoose.Types.ObjectId.isValid(list_id);

            if (isValidListId) {
                const todoList = await TodosListModel.findById(list_id);
                const newTodo = await new TodoModel({
                    ...req.body,
                    isChecked: false,
                    todosListId: todoList?._id,
                }).save();

                if (newTodo) {
                    res.status(201).json({
                        details: newTodo,
                        message: "Заметка усшено создана.",
                    });
                    return;
                }
            }

            res.status(404).json({
                message: `Список заметок с id=${list_id} не существу`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async editTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const isValidTodoId = mongoose.Types.ObjectId.isValid(id);
            const isValidListId = mongoose.Types.ObjectId.isValid(id);

            /**
             * @todo добавить раздельные проверки
             */
            if (isValidTodoId && isValidListId) {
                await TodoModel.findOneAndUpdate({ _id: id, todosListId: list_id }, req.body);

                const updatedTodo = await TodoModel.findById(id);

                res.status(200).json({
                    details: updatedTodo,
                    message: "Заметка усшено редактирована",
                });

                return;
            }

            res.status(404).json({ message: `Заметка с id=${id} не существует.` });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async checkTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;
            const { isChecked } = req.body;
            const isValidTodoId = mongoose.Types.ObjectId.isValid(id);
            const isValidListId = mongoose.Types.ObjectId.isValid(id);

            if (isChecked === undefined) {
                res.status(400).json({ message: `Поле isChecked обязательно для заполнения` });
            }

            if (isValidTodoId && isValidListId && isChecked !== undefined) {
                await TodoModel.findOneAndUpdate({ _id: id, todosListId: list_id }, { isChecked });

                const updatedTodo = await TodoModel.findById(id);

                res.status(200).json({
                    details: updatedTodo,
                    message: "Заметка усшено редактирована",
                });

                return;
            }

            res.status(404).json({ message: `Заметка с id=${id} не существует.` });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id, list_id } = req.params;

            const isValidTodoId = mongoose.Types.ObjectId.isValid(id);
            const isValidListId = mongoose.Types.ObjectId.isValid(list_id);

            if (isValidTodoId && isValidListId) {
                const deletedTodo = await TodoModel.findOneAndDelete({ _id: id, todosListId: list_id });

                if (deletedTodo) {
                    res.status(200).send({
                        details: deletedTodo,
                        message: `Заметка с id=${id} успешно удалена`,
                    });
                    return;
                }
            }

            res.status(404).json({
                message: `Заметка с id=${id} не существует.`,
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }
}

export default new TodosController();
