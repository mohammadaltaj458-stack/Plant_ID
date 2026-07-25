const db = require('../db');

const ALLOWED_TYPES = ['Complaint', 'Suggestion'];
const ALLOWED_COMPLAINT_CATEGORIES = [
    'Website is slow',
    'Button is not working',
    'Wrong information',
    'Reminder issue',
    'Plant Identification issue',
    'Another'
];
const ALLOWED_STATUSES = ['New', 'In Progress', 'Resolved'];

class Feedback {
    static async ensureTable() {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NULL,
                feedback_type ENUM('Complaint', 'Suggestion') NOT NULL,
                complaint_category VARCHAR(100) NULL,
                title VARCHAR(150) NOT NULL,
                message TEXT NOT NULL,
                status ENUM('New', 'In Progress', 'Resolved') NOT NULL DEFAULT 'New',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    }

    static validate({ feedbackType, complaintCategory, title, message }) {
        if (!feedbackType || !ALLOWED_TYPES.includes(feedbackType)) {
            return 'Feedback type must be Complaint or Suggestion';
        }

        if (!title || !title.trim()) {
            return 'Feedback title is required';
        }

        if (!message || !message.trim()) {
            return 'Feedback message is required';
        }

        if (feedbackType === 'Complaint') {
            if (!complaintCategory || !ALLOWED_COMPLAINT_CATEGORIES.includes(complaintCategory)) {
                return 'Complaint category is required';
            }
        }

        return null;
    }

    static async create({ userId, feedbackType, complaintCategory, title, message }) {
        await this.ensureTable();

        const validationError = this.validate({ feedbackType, complaintCategory, title, message });
        if (validationError) {
            const error = new Error(validationError);
            error.statusCode = 400;
            throw error;
        }

        const category = feedbackType === 'Complaint' ? complaintCategory : null;

        const [result] = await db.execute(
            `INSERT INTO feedbacks
             (user_id, feedback_type, complaint_category, title, message)
             VALUES (?, ?, ?, ?, ?)`,
            [userId || null, feedbackType, category, title.trim(), message.trim()]
        );

        return result;
    }

    static async findByUserId(userId) {
        await this.ensureTable();

        const [rows] = await db.execute(
            `SELECT
                f.id,
                f.feedback_type,
                f.complaint_category,
                f.title,
                f.message,
                f.status,
                f.created_at,
                f.updated_at
             FROM feedbacks f
             WHERE f.user_id = ?
             ORDER BY f.created_at DESC`,
            [userId]
        );

        return rows;
    }

    static async getAll({ type, status }) {
        await this.ensureTable();

        const filters = [];
        const params = [];

        if (type && ALLOWED_TYPES.includes(type)) {
            filters.push('f.feedback_type = ?');
            params.push(type);
        }

        if (status && ALLOWED_STATUSES.includes(status)) {
            filters.push('f.status = ?');
            params.push(status);
        }

        const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

        const [rows] = await db.execute(
            `SELECT
                f.id,
                f.user_id,
                u.username,
                u.email,
                f.feedback_type,
                f.complaint_category,
                f.title,
                f.message,
                f.status,
                f.created_at,
                f.updated_at
             FROM feedbacks f
             LEFT JOIN users u ON u.id = f.user_id
             ${whereClause}
             ORDER BY f.created_at DESC`,
            params
        );

        return rows;
    }

    static async updateStatus(id, status) {
        await this.ensureTable();

        if (!ALLOWED_STATUSES.includes(status)) {
            const error = new Error('Invalid feedback status');
            error.statusCode = 400;
            throw error;
        }

        const [result] = await db.execute(
            'UPDATE feedbacks SET status = ? WHERE id = ?',
            [status, id]
        );

        return result;
    }
}

Feedback.ALLOWED_TYPES = ALLOWED_TYPES;
Feedback.ALLOWED_COMPLAINT_CATEGORIES = ALLOWED_COMPLAINT_CATEGORIES;
Feedback.ALLOWED_STATUSES = ALLOWED_STATUSES;

module.exports = Feedback;
