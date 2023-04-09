import express from "express";
import bodyParser from "body-parser";
import { PORT } from "./constants.js";
import router from './router.js'

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(router)

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
