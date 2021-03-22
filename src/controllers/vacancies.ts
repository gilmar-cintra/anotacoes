import { Request, Response } from 'express';
import { Vacancy } from '../db/models/Vacancy';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface VacancyCreateFormData {
  userId: number;
  vacancy: string;
}


export class PrivateController {
  

  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const VacancyRepo = sequelize.getRepository(Vacancy);

      try {
        const vancancyList = await VacancyRepo.findAll({ where: { userId } })
        res.json(vancancyList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }
      

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const vacancyId = req.params.vacancyId;
    const userLoggedId = (req.user as any).dataValues.id;
    const vacancyRepo = sequelize.getRepository(Vacancy);

    try {
      const vacancy = await vacancyRepo.findByPk(vacancyId);
      if(vacancy.userId == userLoggedId){
        res.json(vacancy);
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
    
    const formData: VacancyCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      vacancy: formData.vacancy
    } as Vacancy

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const vacancyRepo = sequelize.getRepository(Vacancy);
    
    try {
      const newVacancy = await vacancyRepo.create(dataField);
      const vacancy = await vacancyRepo.findByPk(newVacancy.id);     
      res.json(vacancy);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
 
  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const vacancyId = req.params.vacancyId;
    const userLoggedId = (req.user as any).dataValues.id;
    const vacancyRepo = sequelize.getRepository(Vacancy);

    try {
      const vacancy = await vacancyRepo.findByPk(vacancyId);
      if(vacancy.userId == userLoggedId){
        vacancy.destroy();
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
    
    const formData: VacancyCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const vacancyId = req.params.vacancyId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const vacancyRepo = sequelize.getRepository(Vacancy);
      let oldVacancy = await vacancyRepo.findByPk(vacancyId);

      if(oldVacancy.userId == userLoggedId){
        oldVacancy = await oldVacancy.update(formData);
        oldVacancy.save();
        res.json(oldVacancy);
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
