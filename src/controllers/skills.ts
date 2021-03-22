import { Request, Response } from 'express';
import { Skills } from '../db/models/Skills';
import { SkillLevel } from '../db/models/SkillLevel';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface SkillCreateFormData {
  userId: number;
  skillId: number;
  stars	: number;
}



export class PrivateController {

  public static async getTypes(req: Request, res: Response): Promise<any> {
    const skillsTypesRepo = sequelize.getRepository(Skills);
    try {
      const skillstypes = await skillsTypesRepo.findAll();
      res.json(skillstypes);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
  }

  public static async getAll(req: Request, res: Response): Promise<any> {
    const userId = (req.user as any).dataValues.id;

      const skillLevel = sequelize.getRepository(SkillLevel);

      try {
        const skillList = await skillLevel.findAll({ where: { userId } })
        res.json(skillList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const skillId = req.params.skillLevelId;
    const userLoggedId = (req.user as any).dataValues.id;
    const skillsRepo = sequelize.getRepository(SkillLevel);

    try {
      const skill = await skillsRepo.findByPk(skillId);
      if(skill.userId == userLoggedId){
        res.json(skill);
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
    const formData: SkillCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      skillId: formData.skillId,
      stars	: formData.stars,
    } as SkillLevel;

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const skillRepo = sequelize.getRepository(SkillLevel);
    
    try {
      const newSkill = await skillRepo.create(dataField);
      
      const skill = await skillRepo.findByPk(newSkill.id);
     
      res.json(skill);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }


  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const skillId = req.params.skillLevelId;
    const userLoggedId = (req.user as any).dataValues.id;
    const skillsRepo = sequelize.getRepository(SkillLevel);

    try {
      const skill = await skillsRepo.findByPk(skillId);
      if(skill.userId == userLoggedId){
        skill.destroy();
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

  //skillLevelId
  public static async updateData(req: Request, res: Response): Promise<any> {
    
    const formData: SkillCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const skillLevelId = req.params.skillLevelId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const skillLevelRepo = sequelize.getRepository(SkillLevel);
      let oldSkillLevel = await skillLevelRepo.findByPk(skillLevelId);

      if(oldSkillLevel.userId == userLoggedId){
        oldSkillLevel = await oldSkillLevel.update(formData);
        oldSkillLevel.save();
      res.json(oldSkillLevel);
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
