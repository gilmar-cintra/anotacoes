import { Router } from 'express';
import user from './user';
import auth from './auth';

const router = Router();

router.use('/public', user.public);
router.use('/public', auth.public);

export default router;