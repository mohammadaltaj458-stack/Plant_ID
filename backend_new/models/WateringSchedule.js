const db = require('../db');

class WateringSchedule {
    static async create({ userId, plantName, frequency, amount, bestTime, notes }) {
        const [result] = await db.execute(
            'INSERT INTO watering_schedules (user_id, plant_name, frequency, amount, best_time, notes) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, plantName, frequency, amount, bestTime, notes]
        );
        return result;
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute(
            'SELECT id, plant_name, frequency, amount, best_time, notes, created_at FROM watering_schedules WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }

    static async deleteById(id, userId) {
        const [result] = await db.execute(
            'DELETE FROM watering_schedules WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result;
    }
}

module.exports = WateringSchedule;
