const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Import handlers & modules
const userRoutes = require('./routes/user.routes.js');
const postsRoutes = require('./routes/posts.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const rolesRoutes = require('./routes/roles.routes.js');
const commentsRoutes = require('./routes/comments.routes.js');

const { correctionTp1 } = require('./handlers/main.handler.js');

const protectedRoute = require('./middlewares/auth');

// Import libs
app.use(bodyParser.json());

// Routes
app.get('/correction-tp1', correctionTp1);

app.use('/users', protectedRoute, userRoutes);
app.use('/posts', protectedRoute, postsRoutes);
app.use('/roles', protectedRoute, rolesRoutes);
app.use('/comments', protectedRoute, commentsRoutes);

app.use('/auth', authRoutes);

// Run app
app.listen(3000);
