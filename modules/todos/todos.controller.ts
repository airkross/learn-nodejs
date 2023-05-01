import { Request, Response } from "express";
import { TodoModel } from "./todos.model";
import mongoose from "mongoose";

/**
 * @todo сделать абстракцию которая будет включать в себя метод который будет принимать статус и пейлод
 */

const getTodosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).send(`Ошибка сервера: ${error}`);
    }
};

const getTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(id);
        const onError = () => res.status(404).json({ message: `Заметка с id=${id} не существует.` })
        if (!isValidId) {
            onError()
        }

        const todo = await TodoModel.findById(id);

        if (todo) {
            res.status(200).json(todo);
        } else {
            onError()
        }
    } catch (error) {
        res.status(500).send(`Ошибка сервера: ${error}`);
    }
};

const addTodoController = async (req: Request, res: Response): Promise<void> => {
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
};

const editTodoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const isValidId = mongoose.Types.ObjectId.isValid(id);

        if (!isValidId) {
            res.status(404).json({
                message: `Заметка с id=${id} не существует.`,
            });

            return;
        }

        await TodoModel.updateOne({ _id: id }, req.body);

        const updatedTodo = await TodoModel.findById(id);

        res.status(200).json({
            details: updatedTodo,
            message: "Заметка усшено редактирована",
        });
    } catch (error) {
        res.status(500).send(`Ошибка сервера: ${error}`);
    }
};

const deleteTodoController = async (req: Request, res: Response): Promise<void> => {
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
};

export { getTodosController, getTodoController, addTodoController, editTodoController, deleteTodoController };
