import { Request, Response } from "express";
import { TodosListModel } from "./todos-lists.model";
/**
 * @todo порефачить связи между модулями (можно через конструктро добавлять хендлеры)
 */
import { TodoModel } from "../todos/todos.model";
import mongoose from "mongoose";

/**
 * @todo унаследоваться от BaseModuleController и сделать по налаогии с TodosController. + через TodosController получать модель для работы с БД
 * TodosController - положить через конструктор в свойство
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
            const isValidId = mongoose.Types.ObjectId.isValid(id);
            if (isValidId) {
                const deletedTodosList = await TodosListModel.findByIdAndDelete(id);
                const deletedTodo = await TodoModel.deleteMany({ todosListId: id });
                /**
                 * @todo сделать доп обработку на deletedTodosList и deletedTodo
                 * создать бейз-контроллер положить туда модель и наследоваться от него
                 * а потом через сонтроллер обращаться к моделям нужной сущности (тут про TodoModel)
                 * чтобы исплючить взаимодействие чужого контроллера с чужой моделью
                 */
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

export default new TodosListsController();
