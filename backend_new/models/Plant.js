const db = require('../db');

class Plant {
    static async create({ userId, imagePath, plantName, species, confidenceScore, rawApiResponse }) {
        const [result] = await db.execute(
            'INSERT INTO plant_images (user_id, image_path, plant_name, species, confidence_score, raw_api_response) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, imagePath, plantName, species, confidenceScore, rawApiResponse]
        );
        return result;
    }

    static async findByUserId(userId) {
        const [rows] = await db.execute(
            'SELECT id, image_path, plant_name, species, confidence_score, raw_api_response, created_at FROM plant_images WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );
        return rows;
    }

    static async deleteById(id, userId) {
        const [result] = await db.execute(
            'DELETE FROM plant_images WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        return result;
    }
}

module.exports = Plant;
