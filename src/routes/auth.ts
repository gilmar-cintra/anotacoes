import { Router } from 'express';
import { PublicController, PrivateController } from '../controllers/auth';

const router = {
  public: Router(),
  private: Router(),
};

router.public.post('/auth/login', PublicController.login);
router.public.post('/auth/logout', PublicController.logout);
router.private.get('/auth/check_session', PrivateController.checkSession);


export default router;