import { Router } from 'express';
import { PrivateController } from '../controllers/fields';

const router = {
  private: Router(),
};

//1 - Retorna todos os tipos de fields
router.private.get('/types', PrivateController.getTypes);

//2 - Cria o field do usuario
router.private.post('', PrivateController.setData);

//3 - Retorna todos fields do usuário da sessão vigente
router.private.get('', PrivateController.getAll);

//4 - Retorna um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:fieldId', PrivateController.getById);

//5 - Atualiza um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.put('/:fieldId', PrivateController.updateData);

//6 - Deleta o um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.delete('/:fieldId', PrivateController.deleteById);








export default router;