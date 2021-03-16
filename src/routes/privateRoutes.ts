import {
  NextFunction, Router, Request, Response,
} from 'express';
import fields from './fields';
import auth from './auth';

const router = Router();

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.isUnauthenticated()) {
    res.status(401);
    res.end();
  } else {
    next();
  }
});

router.use(auth.private);

router.use('/field', fields.private);

export default router;