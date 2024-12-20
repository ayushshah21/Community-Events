import express from "express";
import cors from 'cors';
import UserRouter from './routes/userRoutes' 
import EventRouter from './routes/eventRoutes'

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', UserRouter);
app.use('/events', EventRouter);

app.listen(3000, () => {
    console.log("Listening on Port 3000")
});