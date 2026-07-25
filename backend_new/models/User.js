const db = require('../db');
const bcrypt = require('bcrypt');

class User {
    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    }

    static async create(username, email, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }

    static async findByEmailAndPassword(email, password) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return [];

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        return isPasswordValid ? [user] : [];
    }

    static async seedAdmin() {
        const email = 'admin@myplant.com';
        const existing = await this.findByEmail(email);
        if (existing.length > 0) {
            console.log('Admin account already exists');
            return;
        }
        await this.create('Admin', email, 'admin123', 'admin');
        console.log('Default admin account created: admin@myplant.com / admin123');
    }
}

module.exports = User;
