import { Router } from 'express';
import { PrivateController } from '../controllers/skills';

const router = {
  private: Router(),
};

/*
router.private.get('/skills', PrivateController.getSkills);
router.private.get('/levels/:userId', PrivateController.getLevels);

*/

//1 - Retorna todos os tipos de skills
router.private.get('/types', PrivateController.getTypes);

/*
//3 - Retorna todos level skills do usuário da sessão vigente
router.private.get('', PrivateController.getAll);

//4 - Retorna um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:skillLevelId', PrivateController.getById);

//2 - Cria o field do usuario
router.private.post('', PrivateController.setData);

//6 - Deleta o um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.delete('/:skillLevelId', PrivateController.deleteById);

//5 - Atualiza um field especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.put('/:skillLevelId', PrivateController.updateData);

*/

export default router;