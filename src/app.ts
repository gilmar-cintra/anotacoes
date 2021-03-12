import express from 'express'
import PublicRoutes from './routes/publicRoutes'
import cors from 'cors';

const {
  BASE_URL_DOC,
} = process.env;

const app = express();

//Utilizado para devolver a resposta em Json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: BASE_URL_DOC,
  }),
);

app.use(PublicRoutes);

export default app;