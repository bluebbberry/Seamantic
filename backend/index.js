import express from 'express';
import cors from "cors";
import statusesController from "./src/controllers/statuses.controller.js";
import userController from "./src/controllers/user.controller.js";
import dolphinController from "./src/controllers/dolphin.controller.js";

// ============== REST API ===================
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/statuses', statusesController);
app.use('/user', userController);
app.use('/dolphin', dolphinController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
