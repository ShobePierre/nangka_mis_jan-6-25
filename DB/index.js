import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import pwdUserRoutes from './routes/pwdUserRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { initializeDatabase } from './utils/dbInit.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet());

// CORS - Allow all origins for development (restrict in production)
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting - More lenient for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pwd-users', pwdUserRoutes);
app.use('/api/admins', adminRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Nangka MIS Backend API' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Start server
const server = app.listen(PORT, async () => {
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Initialize database with test data
  try {
    await initializeDatabase();
    console.log('\n✓ Backend ready for testing');
    console.log('  Admin Login: testadmin / Admin@123');
    console.log('  PWD Login: Use the auto-generated PWD ID / Dela Cruz (surname)');
    console.log('\n');
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
  }
});

export default app;
