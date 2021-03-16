import express from 'express'
import session from 'express-session'
import redis from 'redis'
import connectRedis from 'connect-redis'
import helmet from 'helmet';
import cors from 'cors';
import passport from './auth';
import publicRoutes from './routes/publicRoutes'
import privateRoutes from './routes/privateRoutes'


const {
  BASE_URL_FRONT,
  SESS_SECRET_OLD,
  SESS_SECRET_NEW,
  SESS_LIFETIME,
  SESS_NAME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} = process.env;

// 0 - Inicialização do express e algumas configurações importantes
const app = express();

app.use(helmet());

//Utilizado para devolver a resposta em Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: BASE_URL_FRONT,
  }),
);

//1 - configuração do Redis
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD,
});



//2 - Configura o middleware de sessão
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: [SESS_SECRET_OLD, SESS_SECRET_NEW],
  name: SESS_NAME,
  cookie: {
    httpOnly: true,
    maxAge: Number(SESS_LIFETIME),
    sameSite: true,
    secure: false,
  },
  resave: false,
  saveUninitialized: false,
}));



//3 - criar um endpoint para login
app.use(passport.initialize());
app.use(passport.session());

app.use(publicRoutes);
app.use(privateRoutes);


export default app;