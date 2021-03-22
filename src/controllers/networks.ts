import { Request, Response } from 'express';
import { NetworkType } from '../db/models/NetworkType';
import { Network } from '../db/models/Network';
import HttpStatus from 'http-status-codes';
import sequelize from '../db/models/index';

export interface NetworkCreateFormData {
  userId: number;
  networkTypeId: number;
  link	: string;
}


export class PrivateController {
  
  public static async getTypes(req: Request, res: Response): Promise<any> {
    
    const networksTypesRepo = sequelize.getRepository(NetworkType);
    try {
      const networktypes = await networksTypesRepo.findAll();
      res.json(networktypes);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
  }

  
  public static async getAll(req: Request, res: Response): Promise<any> {
 
    const userId = (req.user as any).dataValues.id;

      const NetworksRepo = sequelize.getRepository(Network);

      try {
        const networkList = await NetworksRepo.findAll({ where: { userId } })
        res.json(networkList);
        return
      } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
        return
      }
      

  }


  public static async getById(req: Request, res: Response): Promise<any> {
    
    const networkId = req.params.networkId;
    const userLoggedId = (req.user as any).dataValues.id;
    const networkRepo = sequelize.getRepository(Network);

    try {
      const network = await networkRepo.findByPk(networkId);
      if(network.userId == userLoggedId){
        res.json(network);
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
    
    const formData: NetworkCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;

    const dataField = {
      userId: userLoggedId,
      networkTypeId: formData.networkTypeId,
      link: formData.link
    } as Network

    //Checar se está vazio ou não
    for (var prop in dataField) {
      if(!dataField[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }

    const networkRepo = sequelize.getRepository(Network);
    
    try {
      const newNetwork = await networkRepo.create(dataField);
      const network = await networkRepo.findByPk(newNetwork.id);     
      res.json(network);
      return
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(err.toString());
      return
    }
 
  }

   
  public static async deleteById(req: Request, res: Response): Promise<any> {
    
    const networkId = req.params.networkId;
    const userLoggedId = (req.user as any).dataValues.id;
    const networkRepo = sequelize.getRepository(Network);

    try {
      const network = await networkRepo.findByPk(networkId);
      if(network.userId == userLoggedId){
        network.destroy();
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
    
    const formData: NetworkCreateFormData = req.body;
    const userLoggedId = (req.user as any).dataValues.id;
    const networkId = req.params.networkId;

    //Verificando se existe algum campo vazio
    for (var prop in formData) {
      if(!formData[prop]) {
        res.status(HttpStatus.BAD_REQUEST)
        res.send(`O seguinte campo não foi preenchido '${prop}'`)
        return
      }
    }
    
    try {
      const networkRepo = sequelize.getRepository(Network);
      let oldNetwork = await networkRepo.findByPk(networkId);

      if(oldNetwork.userId == userLoggedId){
        oldNetwork = await oldNetwork.update(formData);
        oldNetwork.save();
        res.json(oldNetwork);
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
