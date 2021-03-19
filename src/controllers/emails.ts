import { Request, Response } from 'express';
import { EmailType } from '../db/models/EmailType';
import { Email } from '../db/models/Email';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface EmailCreateFormData {
  userId: number;
  emailTypeId: number;
  email	: string;
}


export class PrivateController {
  public static async getTypes(req: Request, res: Response): Promise<any> {
    const emailsTypesRepo = sequelize.getRepository(EmailType);
    try {
      const emailstypes = await emailsTypesRepo.findAll();
      res.send(emailstypes);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }
  }

  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const emailsRepo = sequelize.getRepository(Email);

      try {
        const emailList = await emailsRepo.findAll({ where: { userId } })
        res.send(emailList);
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
      }
      

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const emailId = req.params.fieldId;
    const userLoggedId = (req.user as any).dataValues.id;
    const emailsRepo = sequelize.getRepository(Email);

    try {
      const email = await emailsRepo.findByPk(emailId);
      if(email.userId == userLoggedId){
        res.send(email);
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
    
    const formData: EmailCreateFormData = req.body;
    const userLoggedId = Number((req.user as any).dataValues.id);

    const dataField = {
      userId: userLoggedId,
      emailTypeId: formData.emailTypeId,
      email: formData.email
    } as Email

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) res.send(HttpStatus.NO_CONTENT)
    }

    const emailRepo = sequelize.getRepository(Email);
    
    try {
      const newEmail = await emailRepo.create(dataField);
      
      const email = await emailRepo.findByPk(newEmail.id);
     
      res.send(email);
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
    }
 
  }

 
  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const emailId = req.params.emailId;
    const userLoggedId = Number((req.user as any).dataValues.id);
    const emailsRepo = sequelize.getRepository(Email);

    try {
      const email = await emailsRepo.findByPk(emailId);
      if(email.userId == userLoggedId){
        email.destroy();
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
    
    const formData: EmailCreateFormData = req.body;
    const userLoggedId = Number((req.user as any).dataValues.id);
    const emailId = req.params.emailId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) res.send(HttpStatus.NO_CONTENT)
    }
    
    try {
      const emailRepo = sequelize.getRepository(Email);
      const oldEmail = await emailRepo.findByPk(emailId);

      if(oldEmail.userId == userLoggedId){
      //verificando o que mudou
      if(oldEmail.emailTypeId != formData.emailTypeId) oldEmail.emailTypeId = formData.emailTypeId;
      if(oldEmail.email != formData.email) oldEmail.email = formData.email;
      
      oldEmail.save();
      res.send(oldEmail);
      
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
