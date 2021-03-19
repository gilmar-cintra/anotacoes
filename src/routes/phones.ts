import { Router } from 'express';
import { PrivateController } from '../controllers/phones';

const router = {
  private: Router(),
};

//1 - Retorna todos os tipos de fields
router.private.get('/types', PrivateController.getTypes);

//2 - Cria o email do usuario
router.private.post('', PrivateController.setData);

//3 - Retorna todos fields do usuário da sessão vigente
router.private.get('', PrivateController.getAll);

//4 - Retorna um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:phoneId', PrivateController.getById);

//5 - Atualiza um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.put('/:phoneId', PrivateController.updateData);

//6 - Deleta o um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.delete('/:phoneId', PrivateController.deleteById);








export default router;