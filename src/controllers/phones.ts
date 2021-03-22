import { Request, Response } from 'express';
import { PhoneType } from '../db/models/PhoneType';
import { Phone } from '../db/models/Phone';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface PhoneCreateFormData {
  userId: number;
  phoneTypeId: number;
  phone	: string;
}


export class PrivateController {
  
  public static async getTypes(req: Request, res: Response): Promise<any> {
    
    const phonesTypesRepo = sequelize.getRepository(PhoneType);
    try {
      const phonestypes = await phonesTypesRepo.findAll();
      res.json(phonestypes);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
  }

  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const PhonesRepo = sequelize.getRepository(Phone);

      try {
        const phoneList = await PhonesRepo.findAll({ where: { userId } })
        res.json(phoneList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }
      

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const phoneId = req.params.phoneId;
    const userLoggedId = (req.user as any).dataValues.id;
    const phoneRepo = sequelize.getRepository(Phone);

    try {
      const phone = await phoneRepo.findByPk(phoneId);
      if(phone.userId == userLoggedId){
        res.json(phone);
        return
      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
        return
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }

  }

  public static async setData(req: Request, res: Response): Promise<any> {
    
    const formData: PhoneCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      phoneTypeId: formData.phoneTypeId,
      phone: formData.phone
    } as Phone

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const emailRepo = sequelize.getRepository(Phone);
    
    try {
      const newPhone = await emailRepo.create(dataField);
      const phone = await emailRepo.findByPk(newPhone.id);     
      res.json(phone);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
 
  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const phoneId = req.params.phoneId;
    const userLoggedId = (req.user as any).dataValues.id;
    const phonesRepo = sequelize.getRepository(Phone);

    try {
      const phone = await phonesRepo.findByPk(phoneId);
      if(phone.userId == userLoggedId){
        phone.destroy();
        res.send(HttpStatus.OK);
        return

      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
        return
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }

  }

  public static async updateData(req: Request, res: Response): Promise<any> {
    
    const formData: PhoneCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const phoneId = req.params.phoneId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const phoneRepo = sequelize.getRepository(Phone);
      let oldPhone = await phoneRepo.findByPk(phoneId);

      if(oldPhone.userId == userLoggedId){
        oldPhone = await oldPhone.update(formData);
        oldPhone.save();
        res.json(oldPhone);
        return
      
      } else {
        res.status(HttpStatus.UNAUTHORIZED);
        res.send("Você não tem autorização de acesso")
        return
      }

    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }


  }

}
