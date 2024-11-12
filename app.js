// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const authenticateToken = require('./middlewares/authMiddleware');

const app = express();
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', userRoutes); 
app.use('/tasks', authenticateToken, taskRoutes); 

sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(3000, () => console.log('Server running on port 3000'));
});

