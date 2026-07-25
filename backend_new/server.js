require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');

const db = require('./db');
const User = require('./models/User');
const Plant = require('./models/Plant');
const Feedback = require('./models/Feedback');
const WateringSchedule = require('./models/WateringSchedule');
const Reminder = require('./models/reminder');

const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY ;

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.uploadsDir = path.join(__dirname, 'uploads');
        this.frontendDir = path.join(__dirname, '../frontend_new');
        this.upload = null;

        this.ensureUploadsDir();
        this.configMulter();
        this.configMiddleware();
        this.configRoutes();
    }

    ensureUploadsDir() {
        if (!fs.existsSync(this.uploadsDir)) {
            fs.mkdirSync(this.uploadsDir, { recursive: true });
        }
    }

    configMulter() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => cb(null, this.uploadsDir),
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
                cb(null, uniqueName);
            }
        });
        this.upload = multer({ storage });
    }

    configMiddleware() {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'saffa-local-secret',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
        }));
    }

    configRoutes() {
        // Health check: use this first to confirm you are running this updated backend.
        this.app.get('/api/health', (req, res) => {
            res.status(200).json({
                message: 'Saffa Project backend is running',
                port: this.port,
                frontendDir: this.frontendDir,
                feedbackFeature: true
            });
        });

        // Register API
        this.app.post('/api/register', async (req, res) => {
            try {
                const { fullName, fullname, username, email, password } = req.body;
                const name = fullName || fullname || username;

                if (!name || !email || !password) {
                    return res.status(400).json({ message: 'Full name, email, and password are required' });
                }

                const existingUsers = await User.findByEmail(email);
                if (existingUsers.length > 0) {
                    return res.status(409).json({ message: 'User already exists' });
                }

                const result = await User.create(name, email, password);
                res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
            } catch (error) {
                console.error('Register error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Login API
        this.app.post('/api/login', async (req, res) => {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    return res.status(400).json({ message: 'Email and password are required' });
                }

                const users = await User.findByEmailAndPassword(email, password);
                if (users.length === 0) {
                    return res.status(401).json({ message: 'Invalid email or password' });
                }

                const user = users[0];
                req.session.userId = user.id;
                req.session.userRole = user.role;
                res.status(200).json({
                    message: 'Login successful',
                    user: { id: user.id, name: user.username, email: user.email, role: user.role }
                });
            } catch (error) {
                console.error('Login error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Save Plant Info API
        this.app.post('/api/save-plant', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const { plantName, probability, description, imageData } = req.body;
                if (!plantName || !imageData) {
                    return res.status(400).json({ message: 'Plant name and image are required' });
                }

                let filename;
                if (imageData.startsWith('data:image/')) {
                    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
                    const buffer = Buffer.from(base64Data, 'base64');
                    filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
                    fs.writeFileSync(path.join(this.uploadsDir, filename), buffer);
                } else {
                    filename = path.basename(imageData);
                }

                const imagePath = `/uploads/${filename}`;
                const result = await Plant.create({
                    userId: req.session.userId,
                    imagePath,
                    plantName,
                    species: plantName,
                    confidenceScore: probability || null,
                    rawApiResponse: JSON.stringify({ description: description || '' })
                });

                res.status(201).json({ message: 'Plant info saved', id: result.insertId });
            } catch (error) {
                console.error('Save plant error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Get User's Plant Images API
        this.app.get('/api/user-plants', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const plants = await Plant.findByUserId(req.session.userId);
                res.status(200).json({ message: 'Plants retrieved successfully', count: plants.length, plants });
            } catch (error) {
                console.error('Get plants error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Delete Plant API
        this.app.delete('/api/plant/:id', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'Not logged in' });
                }

                const result = await Plant.deleteById(req.params.id, req.session.userId);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Plant not found or not yours' });
                }

                res.status(200).json({ message: 'Plant deleted successfully' });
            } catch (error) {
                console.error('Delete plant error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Logout
        this.app.post('/api/logout', (req, res) => {
            req.session.destroy((err) => {
                if (err) return res.status(500).json({ message: 'Logout failed' });
                res.clearCookie('connect.sid');
                res.status(200).json({ message: 'Logged out successfully' });
            });
        });

        // Get current user session info
        this.app.get('/api/me', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'Not logged in' });
                }
                const user = await User.findById(req.session.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({
                    user: { id: user.id, name: user.username, email: user.email, role: user.role }
                });
            } catch (error) {
                console.error('Session check error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Get user's own feedback history
        this.app.get('/api/user/feedback', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const feedbacks = await Feedback.findByUserId(req.session.userId);
                res.status(200).json({
                    message: 'User feedback retrieved successfully',
                    count: feedbacks.length,
                    feedbacks
                });
            } catch (error) {
                console.error('User feedback error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Admin auth middleware
        const requireAdmin = (req, res, next) => {
            if (!req.session.userId) {
                return res.status(401).json({ message: 'Authentication required' });
            }
            if (req.session.userRole !== 'admin') {
                return res.status(403).json({ message: 'Admin access required' });
            }
            next();
        };

        // Submit Feedback API
        this.app.post('/api/feedback', async (req, res) => {
            try {
                const { feedbackType, complaintCategory, title, message } = req.body;

                const result = await Feedback.create({
                    userId: req.session.userId || null,
                    feedbackType,
                    complaintCategory,
                    title,
                    message
                });

                res.status(201).json({
                    message: 'Feedback submitted successfully',
                    feedbackId: result.insertId,
                    status: 'New'
                });
            } catch (error) {
                console.error('Feedback submit error:', error);
                res.status(error.statusCode || 500).json({
                    message: error.statusCode ? error.message : 'Server error',
                    details: error.statusCode ? undefined : error.message
                });
            }
        });

        // Admin - Get All Feedback API
        this.app.get('/api/admin/feedback', requireAdmin, async (req, res) => {
            try {
                const { type, status } = req.query;
                const feedbacks = await Feedback.getAll({ type, status });

                const summary = feedbacks.reduce((acc, item) => {
                    acc.total += 1;
                    acc[item.feedback_type] = (acc[item.feedback_type] || 0) + 1;
                    acc[item.status] = (acc[item.status] || 0) + 1;
                    return acc;
                }, { total: 0, Complaint: 0, Suggestion: 0, New: 0, 'In Progress': 0, Resolved: 0 });

                res.status(200).json({
                    message: 'Feedback list retrieved successfully',
                    count: feedbacks.length,
                    summary,
                    feedbacks
                });
            } catch (error) {
                console.error('Admin feedback error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Admin - Update Feedback Status API
        this.app.patch('/api/admin/feedback/:id/status', requireAdmin, async (req, res) => {
            try {
                const { status } = req.body;
                const result = await Feedback.updateStatus(req.params.id, status);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Feedback not found' });
                }

                res.status(200).json({ message: 'Feedback status updated successfully' });
            } catch (error) {
                console.error('Update feedback status error:', error);
                res.status(error.statusCode || 500).json({
                    message: error.statusCode ? error.message : 'Server error',
                    details: error.statusCode ? undefined : error.message
                });
            }
        });

        // Identify Plant Proxy API
        this.app.post('/api/identify', async (req, res) => {
            try {
                const { images, similar_images } = req.body;
                if (!images || !Array.isArray(images) || images.length === 0) {
                    return res.status(400).json({ message: 'Image data is required' });
                }

                const response = await axios.post('https://api.plant.id/v2/identify', {
                    images,
                    similar_images: !!similar_images
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Api-Key': PLANT_ID_API_KEY
                    }
                });

                res.json(response.data);
            } catch (error) {
                console.error('Plant.id API Error:', error.message);

                if (error.response) {
                    const status = error.response.status;
                    const data = error.response.data;

                    if (status === 429) {
                        return res.status(429).json({
                            message: 'Quota Limit Exceeded. Please use a new API Key.',
                            details: data
                        });
                    }

                    return res.status(status).json({
                        message: 'Error from Plant API',
                        details: data
                    });
                }

                res.status(500).json({ message: 'Internal Server Error during identification' });
            }
        });

        // Gemini Plant Care API
        this.app.post('/api/plant-care', async (req, res) => {
            try {
                const { plantName } = req.body;
                if (!plantName) {
                    return res.status(400).json({ message: 'Plant name is required' });
                }

                const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
                if (!GEMINI_API_KEY) {
                    return res.status(500).json({ message: 'Gemini API key not configured' });
                }

                const prompt = `You are a plant care expert. Provide concise care information for "${plantName}" in JSON format with exactly these fields:
{
  "soil": "preferred soil type and pH",
  "watering": "watering frequency and amount",
  "sunlight": "sunlight requirements",
  "temperature": "ideal temperature range",
  "tips": "one short care tip"
}
Return ONLY valid JSON, no markdown, no explanation.`;

                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) {
                    return res.status(500).json({ message: 'Empty response from Gemini' });
                }

                // Clean markdown code fences if present
                const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
                const careData = JSON.parse(cleaned);

                res.json({ plantName, care: careData });
            } catch (error) {
                console.error('Gemini API Error:', error.message);
                res.status(500).json({ message: 'Failed to get plant care info' });
            }
        });

        // ── Reminder API ──

        // Create a reminder
        this.app.post('/api/reminders', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const { title, reminderTime } = req.body;
                if (!title || !reminderTime) {
                    return res.status(400).json({ message: 'Title and time are required' });
                }

                const result = await Reminder.create({
                    userId: req.session.userId,
                    title,
                    reminderTime
                });

                const [rows] = await db.execute('SELECT id, user_id, title, reminder_time, created_at FROM reminders WHERE id = ?', [result.insertId]);
                res.status(201).json({ message: 'Reminder created', reminder: rows[0] });
            } catch (error) {
                console.error('Create reminder error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Get all reminders for logged-in user
        this.app.get('/api/reminders', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const reminders = await Reminder.findByUserId(req.session.userId);
                res.status(200).json({ message: 'Reminders retrieved', count: reminders.length, reminders });
            } catch (error) {
                console.error('Get reminders error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Delete a reminder
        this.app.delete('/api/reminders/:id', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'Not logged in' });
                }

                const result = await Reminder.delete(req.params.id, req.session.userId);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Reminder not found or not yours' });
                }

                res.status(200).json({ message: 'Reminder deleted' });
            } catch (error) {
                console.error('Delete reminder error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // ── Watering Schedule API ──

        // Generate watering schedule via Gemini
        this.app.post('/api/watering-schedule', async (req, res) => {
            try {
                const { plantName } = req.body;
                if (!plantName) {
                    return res.status(400).json({ message: 'Plant name is required' });
                }

                const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
                if (!GEMINI_API_KEY) {
                    return res.status(500).json({ message: 'Gemini API key not configured' });
                }

                const prompt = `You are a plant care expert. Generate a watering schedule for "${plantName}" in JSON format with exactly these fields:
{
  "frequency": "how often to water (e.g. 'Every 2 days', 'Once a week', 'Twice a week')",
  "amount": "how much water to give (e.g. '200ml', '1 cup', 'until soil is moist')",
  "bestTime": "best time of day to water (e.g. 'Morning', 'Evening', 'Early morning')",
  "notes": "one short additional watering tip for this plant"
}
Return ONLY valid JSON, no markdown, no explanation.`;

                const response = await axios.post(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [{
                            parts: [{ text: prompt }]
                        }]
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (!text) {
                    return res.status(500).json({ message: 'Empty response from Gemini' });
                }

                const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
                const schedule = JSON.parse(cleaned);

                res.json({ plantName, schedule });
            } catch (error) {
                console.error('Gemini Watering Schedule Error:', error.message);
                res.status(500).json({ message: 'Failed to generate watering schedule' });
            }
        });

        // Save a watering schedule to DB
        this.app.post('/api/watering-schedules', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const { plantName, frequency, amount, bestTime, notes } = req.body;
                if (!plantName) {
                    return res.status(400).json({ message: 'Plant name is required' });
                }

                const result = await WateringSchedule.create({
                    userId: req.session.userId,
                    plantName,
                    frequency: frequency || '',
                    amount: amount || '',
                    bestTime: bestTime || '',
                    notes: notes || ''
                });

                res.status(201).json({ message: 'Watering schedule saved', id: result.insertId });
            } catch (error) {
                console.error('Save schedule error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Get all schedules for logged-in user
        this.app.get('/api/watering-schedules', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'User not logged in' });
                }

                const schedules = await WateringSchedule.findByUserId(req.session.userId);
                res.status(200).json({ message: 'Schedules retrieved', count: schedules.length, schedules });
            } catch (error) {
                console.error('Get schedules error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Delete a watering schedule
        this.app.delete('/api/watering-schedule/:id', async (req, res) => {
            try {
                if (!req.session.userId) {
                    return res.status(401).json({ message: 'Not logged in' });
                }

                const result = await WateringSchedule.deleteById(req.params.id, req.session.userId);

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Schedule not found or not yours' });
                }

                res.status(200).json({ message: 'Schedule deleted successfully' });
            } catch (error) {
                console.error('Delete schedule error:', error);
                res.status(500).json({ message: 'Server error', details: error.message });
            }
        });

        // Static files and redirects
        this.app.get('/', (req, res) => res.redirect('/login.html'));
        this.app.use(express.static(this.frontendDir));
        this.app.use('/uploads', express.static(this.uploadsDir));

        // Friendly 404 so we know which backend is responding.
        this.app.use((req, res) => {
            if (req.path.startsWith('/api/')) {
                return res.status(404).json({ message: `API route not found: ${req.method} ${req.path}` });
            }

            res.status(404).send(`Page not found: ${req.path}. Static folder: ${this.frontendDir}`);
        });
    }

    async ensureCoreTables() {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        try {
            await db.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT 'user'");
        } catch (_) {
            try {
                const [cols] = await db.execute("SHOW COLUMNS FROM users LIKE 'role'");
                if (cols.length === 0) {
                    await db.execute("ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user'");
                }
            } catch (_2) {}
        }

        await db.execute(`
            CREATE TABLE IF NOT EXISTS plant_images (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                image_path VARCHAR(500) NOT NULL,
                plant_name VARCHAR(255) NOT NULL,
                species VARCHAR(255),
                confidence_score DECIMAL(6,3),
                raw_api_response JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_plant_images_user_id (user_id)
            )
        `);

        await Feedback.ensureTable();

        await db.execute(`
            CREATE TABLE IF NOT EXISTS watering_schedules (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                plant_name VARCHAR(255) NOT NULL,
                frequency VARCHAR(150),
                amount VARCHAR(150),
                best_time VARCHAR(100),
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await db.execute(`
            CREATE TABLE IF NOT EXISTS reminders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                title VARCHAR(255) NOT NULL,
                reminder_time VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        try {
            await db.execute("ALTER TABLE reminders MODIFY reminder_time VARCHAR(50) NOT NULL");
        } catch (_) {}

        console.log('Core tables are ready: users, plant_images, feedbacks, watering_schedules, reminders');
    }

    async start() {
        try {
            await this.ensureCoreTables();
            await User.seedAdmin();
        } catch (error) {
            console.error('Database setup failed. Static pages will still be served, but APIs need MySQL.');
            console.error(error.message);
        }

        this.app.listen(this.port, () => {
            console.log('----------------------------------------');
            console.log(`Saffa Project running on http://localhost:${this.port}`);
            console.log(`Login page:    http://localhost:${this.port}/login.html`);
            console.log(`Feedback page: http://localhost:${this.port}/feedback.html`);
            console.log(`Admin page:    http://localhost:${this.port}/admin-feedback.html`);
            console.log(`Schedules:     http://localhost:${this.port}/schedules.html`);
            console.log(`Health check:  http://localhost:${this.port}/api/health`);
            console.log(`Static folder: ${this.frontendDir}`);
            console.log('----------------------------------------');
        });
    }
}

const server = new Server();
server.start();
