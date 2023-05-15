import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { BaseModuleMiddleware } from "../../containers/base-module/base-module.middleware";

export class TodosMiddleware extends BaseModuleMiddleware {
    protected override middlewaresInit() {
        return {
            ids: (req: Request, res: Response, next: NextFunction) => {
                const { id, list_id } = req.params;
                if (id) {
                    const isValidId = Types.ObjectId.isValid(id);

                    if (!isValidId) {
                        res.status(400).json({ message: `Невалидный id=${id}` });
                        return;
                    }
                }
                if (list_id) {
                    const isValidListId = Types.ObjectId.isValid(list_id);

                    if (!isValidListId) {
                        res.status(400).json({ message: `Невалидный list_id=${list_id}` });
                        return;
                    }
                }
                next();
            },
        };
    }
}
