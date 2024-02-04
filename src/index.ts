import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app: express.Application = express();
const port = 4000;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// this middelware convert json request to javascript object
app.use(bodyParser.json());

app.use(routes);

app.listen(port, async (): Promise<void> => {
  const url = `http://localhost:${port}`;
  console.log(` open ${url} to review the project ...`);
});

export default app;
