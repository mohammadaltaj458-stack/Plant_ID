const db = require('../db');

class Reminder {
    static async create({ userId, title, reminderTime }) {
        const [result] = await db.execute(
            'INSERT INTO reminders (user_id, title, reminder_time) VALUES (?, ?, ?)',
            [userId, title, reminderTime]
        );
        return result;
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute(
            'SELECT id, user_id, title, reminder_time, created_at FROM reminders WHERE user_id = ? ORDER BY reminder_time ASC',
            [userId]
        );
        return rows;
    }

    static async delete(id, userId) {
        const [result] = await db.execute('DELETE FROM reminders WHERE id = ? AND user_id = ?', [id, userId]);
        return result;
    }
}

module.exports = Reminder;
