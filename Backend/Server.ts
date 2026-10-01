import "dotenv/config";
import { v2 as cloudinary } from "cloudinary"
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./Server/Configs/db.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import AuthRouter from "./Server/Routes/AuthRoutes.js";
import ThumbnailRouter from "./Server/Routes/Thumbnailroutes.js";
import UserRouter from "./Server/Routes/UserRoute.js";

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }
}

await connectDB();
const app = express();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [
        'http://localhost:5173', 
        'http://localhost:3000', 
        'https://thumbnail-gen-frontend-mu.vercel.app'
      ];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or server-to-server)
        if (!origin) return callback(null, true);
        
        // If it's in our allowed list, permit it
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        
        // Fallback for Vercel preview/production deployments
        if (origin.endsWith('.vercel.app')) {
            return callback(null, true);
        }
        
        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

const isProduction = process.env.NODE_ENV === 'production';
if (isProduction) {
    app.set('trust proxy', 1);
}

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 day
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL as string,
        collectionName: 'sessions'
    })
}));

app.use('/api/auth',AuthRouter);
app.use('/api/thumbnail',ThumbnailRouter);
app.use('/api/user',UserRouter)

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});  

export default app;