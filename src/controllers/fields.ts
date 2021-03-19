import { Request, Response } from 'express';
import { FieldType } from '../db/models/FieldType';
import { Field } from '../db/models/Field';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface FieldCreateFormData {
  userId: number;
  fieldTypeId: number;
  title	: string;
  entity: string;	
  startDate	: Date;
  endDate	: Date;
  description: string;	
}


export class PrivateController {
  public static async getTypes(req: Request, res: Response): Promise<any> {
    const fieldsTypesRepo = sequelize.getRepository(FieldType);
    try {
      const fieldstypes = await fieldsTypesRepo.findAll();
      res.send(fieldstypes);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }
  }

  public static async getAll(req: Request, res: Response): Promise<any> {
    const userId = (req.user as any).dataValues.id;

      const fieldsRepo = sequelize.getRepository(Field);

      try {
        const fieldList = await fieldsRepo.findAll({ where: { userId } })
        res.send(fieldList);
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
      }

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const fieldId = req.params.fieldId;
    const userLoggedId = (req.user as any).dataValues.id;
    const fieldsRepo = sequelize.getRepository(Field);

    try {
      const field = await fieldsRepo.findByPk(fieldId);
      if(field.userId == userLoggedId){
        res.send(field);
      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }

  }

  public static async setData(req: Request, res: Response): Promise<any> {
    const formData: FieldCreateFormData = req.body;
    const userLoggedId = Number((req.user as any).dataValues.id);

    const dataField = {
      userId: userLoggedId,
      fieldTypeId: formData.fieldTypeId,
      title	: formData.title,
      entity: formData.entity,
      startDate	: formData.startDate,
      endDate	: formData.endDate,
      description: formData.description
    } as Field;

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) res.send(HttpStatus.NO_CONTENT)
    }

    const fieldRepo = sequelize.getRepository(Field);
    
    try {
      const newField = await fieldRepo.create(dataField);
      
      const field = await fieldRepo.findByPk(newField.id);
     
      res.send(field);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }


  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const fieldId = req.params.fieldId;
    const userLoggedId = Number((req.user as any).dataValues.id);
    const fieldsRepo = sequelize.getRepository(Field);

    try {
      const field = await fieldsRepo.findByPk(fieldId);
      if(field.userId == userLoggedId){
        field.destroy();
        res.send(HttpStatus.OK);


      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }

  }

  public static async updateData(req: Request, res: Response): Promise<any> {
    
    const formData: FieldCreateFormData = req.body;
    const userLoggedId = Number((req.user as any).dataValues.id);
    const fieldId = req.params.fieldId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) res.send(HttpStatus.NO_CONTENT)
    }
    
    try {
      const fieldRepo = sequelize.getRepository(Field);
      const oldField = await fieldRepo.findByPk(fieldId);

      if(oldField.userId == userLoggedId){
      //verificando o que mudou
      if(oldField.fieldTypeId != formData.fieldTypeId) oldField.fieldTypeId = formData.fieldTypeId;
      if(oldField.title != formData.title) oldField.title = formData.title;
      if(oldField.entity != formData.entity) oldField.entity = formData.entity;
      if(oldField.startDate != formData.startDate) oldField.startDate = formData.startDate;
      if(oldField.endDate != formData.endDate) oldField.endDate = formData.endDate;
      if(oldField.description != formData.description) oldField.description = formData.description;

      oldField.save();
      res.send(oldField);

      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }


  }

}
