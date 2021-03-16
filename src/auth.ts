import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Op } from 'sequelize';
import sequelize from './db/models';
import { User } from './db/models/User';

passport.serializeUser((user: User, done) => { done(null, user.id); });
passport.deserializeUser(async (userId: number, done) => {
  const userRepo = sequelize.getRepository(User);
  try {
    const user = await userRepo.findByPk(userId);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
  const userRepo = sequelize.getRepository(User);
  try {
    const user = await userRepo.findOne({
      where: {
        email: {
          [Op.iLike]: email,
        },
      },
      attributes: ['id', 'email', 'password', 'active'],
    });
    if (!user) {
      return done(null, false, { message: 'Invalid e-mail and/or password' });
    }
    if (!user.active) {
      return done(null, false, { message: 'Inactive account.' });
    }
    if (bcrypt.compareSync(password, user.password)) {
      const userInfo = await userRepo.findByPk(user.id);
      return done(null, userInfo);
    }
    return done(null, false, { message: 'Invalid e-mail and/or password' });
  } catch (err) {
    return done(err, null);
  }
}));
export default passport;