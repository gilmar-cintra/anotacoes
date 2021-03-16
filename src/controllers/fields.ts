import { Request, Response } from 'express';
import { FieldType } from '../db/models/FieldType';
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
}
