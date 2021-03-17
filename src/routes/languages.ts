import { Router } from 'express';
import { PrivateController } from '../controllers/languages';

const router = {
  private: Router(),
};


//Retorna todos os tipos de languages
router.private.get('/types', PrivateController.getTypes);

//Retorna um language especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:languageId', PrivateController.getById);

//Retorna todos languages do usuário
router.private.get('/languages', PrivateController.getAll);

//Cria o languages do usuario
router.private.post('/languages', PrivateController.setData);

//Atualiza languages do usuario
router.private.put('/languages', PrivateController.updateData);

//Deleta um languages especifico com o seu Id, desde que seja de propriedade do usuário
router.private.delete('/languages/:languageId', PrivateController.deleteData);


export default router;