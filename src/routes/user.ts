import { Router } from 'express';
import { PublicController } from '../controllers/user';

const router = {
  public: Router(),
  private: Router(),
};

router.public.post('/users', PublicController.createUser);

export default router;