import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { BaseModuleMiddleware } from "../../containers/base-module/base-module.middleware";

export class TodosListsMiddleware extends BaseModuleMiddleware {
    protected override middlewaresInit() {
        return {
            list_id: (req: Request, res: Response, next: NextFunction) => {
                const { list_id } = req.params;
                if (list_id) {
                    const isValidListId = Types.ObjectId.isValid(list_id);
    
                    if (!isValidListId) {
                        res.status(400).json({ message: `Невалидный list_id=${list_id}` });
                        return;
                    }
                }
                next();
            }
        }
    }
}
