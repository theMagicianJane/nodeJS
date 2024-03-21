import express from 'express';
import bodyParser from 'body-parser';
import authMiddleware from "./middleware/authMiddleware.js";
import UrlController from "./controllers/UrlController.js";
import CodeController from "./controllers/CodeController.js";
import UserController from "./controllers/UserController.js";



const app = express();


app.use(authMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.send('Works!')
});
app.set('view engine', 'pug');
app.use('/files', express.static("view"));


app.use('/info', new UrlController());
app.use('/code', new CodeController());
app.use('/user', new UserController());


app.use((err, req, res) => {

  res.status(500).send(err.message);
});

app.listen(8000, () => {
  console.log('Server is started');
});