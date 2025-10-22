const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/ads', require('./routes/ads'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/ai-content', require('./routes/ai-content'));
app.use('/api/chat-moderation', require('./routes/chat-moderation'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/creator', require('./routes/creator'));
app.use('/api/live', require('./routes/live'));
app.use('/api/live-ai', require('./routes/live-ai'));
app.use('/api/live-captions', require('./routes/live-captions'));
app.use('/api/live-translation', require('./routes/live-translation'));
app.use('/api/live-superchat', require('./routes/live-superchat'));
app.use('/api/monetization', require('./routes/monetization'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/playlists', require('./routes/playlists'));
app.use('/api/promotions', require('./routes/promotions'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/shorts', require('./routes/shorts'));
app.use('/api/subscriptions', require('./routes/subscriptions'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/users', require('./routes/users'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/watch-later', require('./routes/watch-later'));

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
