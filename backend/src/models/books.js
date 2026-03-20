const pool = require('../config/db.js');

module.exports = {

    // ดึงหนังสือทั้งหมด
    async getAll() {
        const result = await pool.query(`
            SELECT 
                b.id,
                b.title,
                b.isbn,
                b.total_copies,
                b.available_copies,
                b.created_at,
                p.name                     AS publisher,
                ARRAY_AGG(DISTINCT a.name) AS authors,
                ARRAY_AGG(DISTINCT c.name) AS categories
            FROM books b
            LEFT JOIN publishers p       ON b.publisher_id = p.id
            LEFT JOIN book_authors ba    ON b.id = ba.book_id
            LEFT JOIN authors a          ON ba.author_id = a.id
            LEFT JOIN book_categories bc ON b.id = bc.book_id
            LEFT JOIN categories c       ON bc.category_id = c.id
            GROUP BY b.id, p.name
            ORDER BY b.id ASC
        `);
        return result.rows;
    },
    // ดึงหนังสือเล่มเดียว
    async getById(id) {
        const result = await pool.query(`
            SELECT 
                b.id,
                b.title,
                b.isbn,
                b.total_copies,
                b.available_copies,
                b.created_at,
                p.name                     AS publisher,
                ARRAY_AGG(DISTINCT a.name) AS authors,
                ARRAY_AGG(DISTINCT c.name) AS categories
            FROM books b
            LEFT JOIN publishers p       ON b.publisher_id = p.id
            LEFT JOIN book_authors ba    ON b.id = ba.book_id
            LEFT JOIN authors a          ON ba.author_id = a.id
            LEFT JOIN book_categories bc ON b.id = bc.book_id
            LEFT JOIN categories c       ON bc.category_id = c.id
            WHERE b.id = $1
            GROUP BY b.id, p.name
        `, [id]);
        return result.rows[0];
    },
    // เพิ่มหนังสือใหม่
    async create({ title, isbn, publisher_id, total_copies, author_ids, category_ids }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // insert หนังสือ
            const bookResult = await client.query(`
                INSERT INTO books (title, isbn, publisher_id, total_copies, available_copies)
                VALUES ($1, $2, $3, $4, $4) RETURNING *
            `, [title, isbn, publisher_id, total_copies]);

            const book = bookResult.rows[0];
            // insert authors
            if (author_ids?.length > 0) {
                for (const author_id of author_ids) {
                    await client.query(
                        'INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)',
                        [book.id, author_id]
                    );
                }
            }
            // insert categories
            if (category_ids?.length > 0) {
                for (const category_id of category_ids) {
                    await client.query(
                        'INSERT INTO book_categories (book_id, category_id) VALUES ($1, $2)',
                        [book.id, category_id]
                    );
                }
            }
            await client.query('COMMIT');
            return book;

        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    },
    // แก้ไขหนังสือ
    async update(id, { title, isbn, publisher_id, total_copies }) {
        const result = await pool.query(`
            UPDATE books
            SET title=$1, isbn=$2, publisher_id=$3, total_copies=$4
            WHERE id=$5 RETURNING *
        `, [title, isbn, publisher_id, total_copies, id]);
        return result.rows[0];
    },
    // ลบหนังสือ
    async remove(id) {
        const result = await pool.query(
            'DELETE FROM books WHERE id=$1 RETURNING *', [id]
        );
        return result.rows[0];
    }
};