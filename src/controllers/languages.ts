import { Request, Response } from 'express';
import { Language } from '../db/models/Language';
import { LanguageLevel } from '../db/models/LanguageLevel';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface LanguageCreateFormData {
  userId: number;
  languageId: number;
  stars	: number;
}



export class PrivateController {

  public static async getTypes(req: Request, res: Response): Promise<any> {
    const LanguageTypesRepo = sequelize.getRepository(Language);
    try {
      const languagestypes = await LanguageTypesRepo.findAll();
      res.json(languagestypes);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
  }

  
  public static async getAll(req: Request, res: Response): Promise<any> {
    const userId = (req.user as any).dataValues.id;

      const languageLevel = sequelize.getRepository(LanguageLevel);

      try {
        const languageLevelList = await languageLevel.findAll({ where: { userId } })
        res.json(languageLevelList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }

  }

  
  public static async getById(req: Request, res: Response): Promise<any> {
    
    const levelId = req.params.languageLevelId;
    const userLoggedId = (req.user as any).dataValues.id;
    const languageLevelRepo = sequelize.getRepository(LanguageLevel);

    try {
      const languageLevel = await languageLevelRepo.findByPk(levelId);
      if(languageLevel.userId == userLoggedId){
        res.json(languageLevel);
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
    const formData: LanguageCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      languageId: formData.languageId,
      stars	: formData.stars,
    } as LanguageLevel;

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const languageLevelRepo = sequelize.getRepository(LanguageLevel);
    
    try {
      const newLevel = await languageLevelRepo.create(dataField);
      
      const level = await languageLevelRepo.findByPk(newLevel.id);
     
      res.json(level);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }


  }

  
  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const levelId = req.params.languageLevelId;
    const userLoggedId = (req.user as any).dataValues.id;
    const levelRepo = sequelize.getRepository(LanguageLevel);

    try {
      const level = await levelRepo.findByPk(levelId);
      if(level.userId == userLoggedId){
        level.destroy();
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
    
    const formData: LanguageCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const LevelId = req.params.languageLevelId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const languageLevelRepo = sequelize.getRepository(LanguageLevel);
      let oldLevel = await languageLevelRepo.findByPk(LevelId);

      if(oldLevel.userId == userLoggedId){
        oldLevel = await oldLevel.update(formData);
        oldLevel.save();
      res.json(oldLevel);
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
