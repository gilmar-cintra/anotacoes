import { Router } from 'express';
import { PrivateController } from '../controllers/addresses';

const router = {
  private: Router(),
};





router.private.get('', PrivateController.getAll);

router.private.post('', PrivateController.setData);

router.private.get('/:addressId', PrivateController.getById);

router.private.delete('/:addressId', PrivateController.deleteById);

router.private.put('/:addressId', PrivateController.updateData);


export default router;