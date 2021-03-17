import { Router } from 'express';
import { PrivateController } from '../controllers/fields';

const router = {
  private: Router(),
};

router.private.get('/fields_types', PrivateController.getFieldsTypes);
router.private.get('/fields/:userId', PrivateController.getFields);


export default router;