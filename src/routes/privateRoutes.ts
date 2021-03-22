import {
  NextFunction, Router, Request, Response,
} from 'express';
import fields from './fields';
import emails from './emails';
import skill from './skills';
import auth from './auth';
import phones from './phones';

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

router.use('/fields', fields.private);
router.use('/emails', emails.private);
router.use('/skills', skill.private);
router.use('/phones', phones.private);

export default router;