//Express Initialiazation
const express = require('express');
const db = require('./config/database');
const app = express();
const sequelizeStore = require('connect-session-sequelize');


//CORS Initialization
const cors = require('cors');



//Express Session Initializatio
const session = require('express-session');

//Environment setup
require('dotenv').config()
const PORT = process.env.PORT || 5000;

//API Routes
const usersRoutes = require('./routes/users');
const articlesRoutes = require('./routes/articles');
const authRoutes = require('./routes/auth');
const downloaders = require('./routes/downloaders.js');

//Midleware Logs
const middlewareLog = require('./middleware/logs');

//Midleware
// (async()=>{
//     await db.sync();
// })()

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.use(middlewareLog)
app.use(express.json())
app.use(authRoutes);
// store.sync();

//API users
app.use('/users', usersRoutes)

//API articles
app.use('/articles', articlesRoutes)

//API Downloader youtube
app.use('/downloaders', downloaders)


//Server Port
app.listen(PORT, () => {
    console.log(`Server Berhasil di running di port ${PORT}`);
})