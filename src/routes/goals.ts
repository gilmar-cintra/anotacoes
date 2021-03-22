import { Router } from 'express';
import { PrivateController } from '../controllers/goals';

const router = {
  private: Router(),
};





router.private.get('', PrivateController.getAll);

router.private.post('', PrivateController.setData);

router.private.get('/:goalId', PrivateController.getById);

router.private.delete('/:goalId', PrivateController.deleteById);

router.private.put('/:goalId', PrivateController.updateData);


export default router;