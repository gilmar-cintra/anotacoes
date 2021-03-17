import { Request, Response } from 'express';
import { FieldType } from '../db/models/FieldType';
import { Field } from '../db/models/Field';
import sequelize from '../db/models/index';

export class PrivateController {
  public static async getFieldsTypes(req: Request, res: Response): Promise<any> {
    const fieldsTypesRepo = sequelize.getRepository(FieldType);
    try {
      const fieldstypes = await fieldsTypesRepo.findAll();
      res.send(fieldstypes);
    } catch (err) {
      res.status(500);
      res.send(err.toString());
    }
  }

  public static async getFields(req: Request, res: Response): Promise<any> {
    const userLoggedId = (req.user as any).dataValues.id;
    const userId = req.params.userId;

    if (userLoggedId == userId) {
      const fieldsRepo = sequelize.getRepository(Field);

      try {
        const fieldList = await fieldsRepo.findAll({ where: { userId } })
        res.send(fieldList);
      } catch (err) {
        res.status(500);
        res.send(err.toString());
      }

    } else {
      res.status(403);
      res.send("Você não tem autorização de acesso")
    }

  }
}
