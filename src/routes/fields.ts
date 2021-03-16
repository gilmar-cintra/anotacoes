import { Router } from 'express';
import { PrivateController } from '../controllers/fields';

const router = {
  private: Router(),
};

router.private.get('/fields_types', PrivateController.getFieldsTypes);


export default router;