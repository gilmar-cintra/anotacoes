import { Router } from 'express';
import { PrivateController } from '../controllers/vacancies';

const router = {
  private: Router(),
};





router.private.get('', PrivateController.getAll);

router.private.post('', PrivateController.setData);

router.private.get('/:vacancyId', PrivateController.getById);

router.private.delete('/:vacancyId', PrivateController.deleteById);

router.private.put('/:vacancyId', PrivateController.updateData);


export default router;