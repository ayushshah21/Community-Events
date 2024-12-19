import express from "express";
import cors from 'cors';
import UserRouter from './routes/userRoutes' 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', UserRouter);

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});