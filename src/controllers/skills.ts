import { Request, Response } from 'express';
import { Skills } from '../db/models/Skills';
import sequelize from '../db/models/index';

export class PrivateController {
  public static async getSkills(req: Request, res: Response): Promise<any> {
    const skillsRepo = sequelize.getRepository(Skills);
    try {
      const skillsList = await skillsRepo.findAll();
      res.send(skillsList);
    } catch (err) {
      res.status(500);
      res.send(err.toString());
    }
  }
}
