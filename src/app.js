import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import api from './routes/api.js';
import fileupload from 'express-fileupload';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // para leer el id enviado en el body junto al archivo de la imagen
app.use(
  fileupload({
    limits: {
      fileSize: 5000000, //5mb
    },
    abortOnLimit: true,
  })
);
app.use(express.static('src/public'));
app.use('/v1/', api);

export default app;
