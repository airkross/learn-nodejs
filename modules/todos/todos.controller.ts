import { Request, Response } from "express";
import { TodoModel } from "./todos.model";
import mongoose from "mongoose";

/**
 * @todo возможно сделать обертку над контроллерами в config/modules/base.controller.ts
 */

class TodosController {
    async getTodos(req: Request, res: Response): Promise<void> {
        try {
            const todos = await TodoModel.find();
            res.status(200).json(todos);
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
                    return
                }
            }

            res.status(404).json({ message: `Заметка с id=${id} не существует.` })
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async addTodo(req: Request, res: Response): Promise<void> {
        try {
            const newTodo = await new TodoModel({ ...req.body }).save();

            if (newTodo) {
                res.status(201).json({
                    details: newTodo,
                    message: "Заметка усшено создана.",
                });
                return;
            }

            res.status(400).json({
                message: "Ошбика создания заметки.",
            });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async editTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const isValidId = mongoose.Types.ObjectId.isValid(id);

            if (isValidId) {
                await TodoModel.updateOne({ _id: id }, req.body);

                const updatedTodo = await TodoModel.findById(id);

                res.status(200).json({
                    details: updatedTodo,
                    message: "Заметка усшено редактирована",
                });
                
                return
            }

            res.status(404).json({  message: `Заметка с id=${id} не существует.` });
        } catch (error) {
            res.status(500).send(`Ошибка сервера: ${error}`);
        }
    }

    async deleteTodo(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedTodo = await TodoModel.findByIdAndDelete(id);

            if (deletedTodo) {
                res.status(200).send({
                    details: deletedTodo,
                    message: `Заметка с id=${id} успешно удалена`,
                });
                return;
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
