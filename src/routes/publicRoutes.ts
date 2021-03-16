import { Router } from 'express';
import user from './user';
import auth from './auth';

import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../../swagger.json'




const router = Router();

router.use('/public', user.public);
router.use('/public', auth.public);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;