import { Router } from 'express';
import { PrivateController } from '../controllers/emails';

const router = {
  private: Router(),
};


//Retorna todos os tipos de emails
router.private.get('/types', PrivateController.getTypes);

//Retorna um email especifico pelo seu Id, desde que seja de propriedade do usuário
router.private.get('/:emailId', PrivateController.getById);

//Retorna todos emails do usuário
router.private.get('/emails', PrivateController.getAll);

//Cria o emails do usuario
router.private.post('/emails', PrivateController.setData);

//Atualiza emails do usuario
router.private.put('/emails', PrivateController.updateData);

//Deleta um emails especifico com o seu Id, desde que seja de propriedade do usuário
router.private.delete('/emails/:emailId', PrivateController.deleteData);


export default router;