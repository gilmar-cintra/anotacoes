import { Request, Response } from 'express';
import { Address } from '../db/models/Address';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface AddressCreateFormData {
  userId: number;
  place: string;
  number: string;
  city: string;
  state: string;
  zipcode: string;
  complement: string;
}


export class PrivateController {
  

  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const addressRepo = sequelize.getRepository(Address);

      try {
        const addressList = await addressRepo.findAll({ where: { userId } })
        res.json(addressList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }
      

  }

  public static async getById(req: Request, res: Response): Promise<any> {
    
    const addressId = req.params.addressId;
    const userLoggedId = (req.user as any).dataValues.id;
    const addressRepo = sequelize.getRepository(Address);

    try {
      const address = await addressRepo.findByPk(addressId);
      if(address.userId == userLoggedId){
        res.json(address);
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
    
    const formData: AddressCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      place: formData.place,
      number: formData.number,
      city: formData.city,
      state: formData.state,
      zipcode: formData.zipcode,
      complement: formData.complement
    } as Address

    const addressRepo = sequelize.getRepository(Address);
    
    try {
      const newAddress = await addressRepo.create(dataField);
      const address = await addressRepo.findByPk(newAddress.id);     
      res.json(address);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
 
  }

  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const addressId = req.params.addressId;
    const userLoggedId = (req.user as any).dataValues.id;
    const addressRepo = sequelize.getRepository(Address);

    try {
      const address = await addressRepo.findByPk(addressId);
      if(address.userId == userLoggedId){
        address.destroy();
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
    
    const formData: AddressCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const addressId = req.params.addressId;
    
    try {
      const addressRepo = sequelize.getRepository(Address);
      let oldAddress = await addressRepo.findByPk(addressId);

      if(oldAddress.userId == userLoggedId){
        oldAddress = await oldAddress.update(formData);
        oldAddress.save();
        res.json(oldAddress);
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
