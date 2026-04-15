const pool = require('../config/db.js');

module.exports = {

    // ดึงหนังสือทั้งหมด
    async getAll() {
        const result = await pool.query(`
            SELECT 
                b.id,
                b.title,
                b.isbn,
                b.cover_image,          
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

    async getById(id) {
        const result = await pool.query(`
            SELECT 
                b.id,
                b.title,
                b.isbn,
                b.cover_image,          
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

    async create({ title, isbn, publisher_id, total_copies, cover_image, author_ids, category_ids }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const bookResult = await client.query(`
                INSERT INTO books (title, isbn, publisher_id, cover_image, total_copies, available_copies)
                VALUES ($1, $2, $3, $4, $5, $5) RETURNING *
                -- ↑ เพิ่ม cover_image
            `, [title, isbn, publisher_id, cover_image, total_copies]);

            const book = bookResult.rows[0];

            if (author_ids?.length > 0) {
                for (const author_id of author_ids) {
                    await client.query(
                        'INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)',
                        [book.id, author_id]
                    );
                }
            }

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

    async update(id, { title, isbn, publisher_id, total_copies, available_copies }) {
        const result = await pool.query(`
            UPDATE books
            SET title = $1, isbn = $2, total_copies = $3, available_copies = $4
            WHERE id = $5 RETURNING *
        `, [title, isbn, total_copies, available_copies, id]);
        
        // If publisher needs to be mapped later we can do it, but the checklist specifies the core 4 properties above
        return result.rows[0];
    },

    // ลบหนังสือ
    async remove(id) {
        const result = await pool.query(
            'DELETE FROM books WHERE id = $1 RETURNING *', [id]
        );
        return result.rows[0];
    },
};