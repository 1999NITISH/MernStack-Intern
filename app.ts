import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true,               // Allow cookies/sessions if needed
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

export default app;

  
