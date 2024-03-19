import express from 'express';
import authMiddleware from "./middleware/authMiddleware.js";
import urlController from "./controllers/urlController.js";
import codeController from "./controllers/codeController.js";
import userController from "./controllers/userController.js";



const app = express();

app.use(authMiddleware);
app.use('/info', urlController);
app.use('/code', codeController);
app.use('/user', userController);

app.listen(8000, () => {
  console.log('Server is started');
});