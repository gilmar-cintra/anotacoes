import { Request, Response, NextFunction } from 'express';
import HttpStatus from 'http-status-codes';
import passport from 'passport';

export class PublicController {
  public static async login(req: Request, res: Response, next: NextFunction): Promise<any> {

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send(err.toString());
      }
      if (!user) {
        res.status(HttpStatus.UNAUTHORIZED);
        if (info) {
          res.send(info.message);
        } else {
          res.end();
        }
      }
      req.logIn(user, (errLogIn) => {
        if (errLogIn) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR);
          res.end();
        }
        res.send(user);
      });
    })(req, res, next);

  }


  public static async logout(req: Request, res: Response): Promise<any> {
    req.logout();
    res.end();
  }

}

export class PrivateController {
  public static async checkSession(req: Request, res: Response): Promise<any> {
    res.send(true);
  }
}