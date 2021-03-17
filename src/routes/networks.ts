import { Router } from 'express';
import { PrivateController } from '../controllers/networks';

const router = {
  private: Router(),
};


//Retorna todos os tipos de networks
router.private.get('/types', PrivateController.getTypes);

//Retorna um networks especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:networkId', PrivateController.getById);

//Retorna todos networks do usuário
router.private.get('/networks', PrivateController.getAll);

//Cria o telefone do usuario
router.private.post('/networks', PrivateController.setData);

//Atualiza telefone do usuario
router.private.put('/networks', PrivateController.updateData);

//Deleta um telefone especifico com o seu Id, desde que seja de propriedade do usuário
router.private.delete('/networks/:networkId', PrivateController.deleteData);


export default router;