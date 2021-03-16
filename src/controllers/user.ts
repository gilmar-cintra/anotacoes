import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../db/models/User';
import sequelize from '../db/models/index';

//import { UserCreateFormData } from '../types';

interface UserCreateFormData {
  name: string;
  email: string;
  password: string;
}

interface UserLoginFormData {
  email: string;
  password: string;
}


export class PublicController {
  public static async createUser(req: Request, res: Response): Promise<any> {
    const formData: UserCreateFormData = req.body;

    if (!formData.password) {
      res.status(409);
      res.send('Please provide a valid password');
      return;
    }

    const dataUser = {
      name: formData.name,
      email: formData.email,
      password: bcrypt.hashSync(
        String(formData.password),
        bcrypt.genSaltSync(10),
      ),
      active: true,
    } as User;
    const userRepo = sequelize.getRepository(User);
    try {
      const newUser = await userRepo.create(dataUser);
      const user = await userRepo.findByPk(newUser.id);
      res.send(user);
    } catch (err) {
      res.status(500);
      res.send(err.toString());
    }


  }

  public static async login(req: Request, res: Response): Promise<any> {
    const formData: UserLoginFormData = req.body;

    console.log(formData);
  }
}
