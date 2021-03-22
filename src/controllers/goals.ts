import { Request, Response } from 'express';
import { Goal } from '../db/models/Goal';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface GoalCreateFormData {
  userId: number;
  goal: string;
}


export class PrivateController {
  

  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const goalRepo = sequelize.getRepository(Goal);

      try {
        const goalList = await goalRepo.findAll({ where: { userId } })
        res.json(goalList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }
      

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const goalId = req.params.goalId;
    const userLoggedId = (req.user as any).dataValues.id;
    const goalRepo = sequelize.getRepository(Goal);

    try {
      const goal = await goalRepo.findByPk(goalId);
      if(goal.userId == userLoggedId){
        res.json(goal);
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
    
    const formData: GoalCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      goal: formData.goal
    } as Goal

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const goalRepo = sequelize.getRepository(Goal);
    
    try {
      const newGoal = await goalRepo.create(dataField);
      const goal = await goalRepo.findByPk(newGoal.id);     
      res.json(goal);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
 
  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const goalId = req.params.goalId;
    const userLoggedId = (req.user as any).dataValues.id;
    const goalRepo = sequelize.getRepository(Goal);

    try {
      const goal = await goalRepo.findByPk(goalId);
      if(goal.userId == userLoggedId){
        goal.destroy();
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
    
    const formData: GoalCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const goalId = req.params.goalId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const goalRepo = sequelize.getRepository(Goal);
      let oldGoal = await goalRepo.findByPk(goalId);

      if(oldGoal.userId == userLoggedId){
        oldGoal = await oldGoal.update(formData);
        oldGoal.save();
        res.json(oldGoal);
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
