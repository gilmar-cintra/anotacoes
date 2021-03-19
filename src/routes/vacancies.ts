import { Router } from 'express';
import { PrivateController } from '../controllers/vacancies';

const router = {
  private: Router(),
};



router.private.post('', PrivateController.setData);

router.private.get('', PrivateController.getAll);

router.private.get('/:vacancyId', PrivateController.getById);

router.private.put('/:vacancyId', PrivateController.updateData);

router.private.delete('/:vacancyId', PrivateController.deleteById);



export default router;