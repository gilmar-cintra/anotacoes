import { Request, Response } from 'express';
import { Skills } from '../db/models/Skills';
import { SkillLevel } from '../db/models/SkillLevel';


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

  public static async getLevels(req: Request, res: Response): Promise<any> {

    const userLoggedId = (req.user as any).dataValues.id;
    const userId = req.params.userId;

    if (userLoggedId == userId) {
      const skillLevelRepo = sequelize.getRepository(SkillLevel);

      try {
        const skillslevels = await skillLevelRepo.findAll({ where: { userId } })
        res.send(skillslevels);
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
