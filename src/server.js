import express from 'express';
import router from './router/router.js';
import { connectDB } from './config/db.js';


connectDB();
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router)


export default app