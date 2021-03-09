import app from "./app";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../swagger.json'

const { PORT = 5000 } = process.env;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
