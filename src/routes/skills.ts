import { Router } from 'express';
import { PrivateController } from '../controllers/skills';

const router = {
  private: Router(),
};

router.private.get('/skills', PrivateController.getSkills);


export default router;