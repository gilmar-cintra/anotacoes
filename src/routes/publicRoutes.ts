import { Router } from 'express';
import user from './user';

const router = Router();

router.use('/public', user.public);

export default router;