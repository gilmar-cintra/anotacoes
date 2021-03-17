import { Router } from 'express';
import { PrivateController } from '../controllers/phones';

const router = {
  private: Router(),
};


//Retorna todos os tipos de telefone
router.private.get('/types', PrivateController.getTypes);

//Retorna um telefone especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:phoneId', PrivateController.getById);

//Retorna todos telefones do usuário
router.private.get('/phones', PrivateController.getAll);

//Cria o telefone do usuario
router.private.post('/phones', PrivateController.setData);

//Atualiza telefone do usuario
router.private.put('/phones', PrivateController.updateData);

//Deleta um telefone especifico com o seu Id, desde que seja de propriedade do usuário
router.private.delete('/phones/:phoneId', PrivateController.deleteData);


export default router;