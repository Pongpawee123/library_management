--  schema.sql  –  Library Management System
--  Roles: admin, librarian, member

-- 1. USERS
-- -------------------------------------------------------------
CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role          VARCHAR(50) NOT NULL
                  CHECK (role IN ('admin', 'librarian', 'member')),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. MEMBERS
-- -------------------------------------------------------------
CREATE TABLE members (
    id         SERIAL PRIMARY KEY,
    user_id    INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name  VARCHAR(255) NOT NULL,
    phone      VARCHAR(20),
    status     VARCHAR(50) DEFAULT 'active'
               CHECK (status IN ('active', 'suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PUBLISHERS
---------------------------------------------------------------
CREATE TABLE publishers (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(255) NOT NULL UNIQUE,
    contact_email VARCHAR(255),
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. AUTHORS
---------------------------------------------------------------
CREATE TABLE authors (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    bio        TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. CATEGORIES
---------------------------------------------------------------
CREATE TABLE categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- -------------------------------------------------------------
-- 6. BOOKS
--    cover_image เก็บเป็น URL ชี้ไปยังไฟล์รูปภาพ
--    เช่น /uploads/covers/clean-code.jpg
--         https://cdn.example.com/covers/clean-code.jpg
-- -------------------------------------------------------------
CREATE TABLE books (
    id               SERIAL PRIMARY KEY,
    title            VARCHAR(255) NOT NULL,
    isbn             VARCHAR(20) UNIQUE,
    publisher_id     INT REFERENCES publishers(id) ON DELETE SET NULL,
    cover_image      VARCHAR(500),
    total_copies     INT NOT NULL CHECK (total_copies >= 0),
    available_copies INT NOT NULL CHECK (available_copies >= 0),
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (available_copies <= total_copies)
);

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_isbn  ON books(isbn);

-- 7. BOOK_AUTHORS  (Many-to-Many)
---------------------------------------------------------------
CREATE TABLE book_authors (
    book_id   INT NOT NULL REFERENCES books(id)   ON DELETE CASCADE,
    author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

-- 8. BOOK_CATEGORIES  (Many-to-Many)
---------------------------------------------------------------
CREATE TABLE book_categories (
    book_id     INT NOT NULL REFERENCES books(id)      ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, category_id)
);

-- 9. BORROW_RECORDS
---------------------------------------------------------------
CREATE TABLE borrow_records (
    id          SERIAL PRIMARY KEY,
    member_id   INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    book_id     INT NOT NULL REFERENCES books(id)   ON DELETE CASCADE,
    borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date    TIMESTAMP NOT NULL,
    returned_at TIMESTAMP,
    fine_amount NUMERIC(10,2) DEFAULT 0 CHECK (fine_amount >= 0),
    extended    BOOLEAN DEFAULT FALSE,
    status      VARCHAR(50) DEFAULT 'borrowed'
                CHECK (status IN ('borrowed', 'returned', 'overdue'))
);

CREATE INDEX idx_borrow_member ON borrow_records(member_id);
CREATE INDEX idx_borrow_book   ON borrow_records(book_id);

CREATE UNIQUE INDEX unique_active_borrow
ON borrow_records(member_id, book_id)
WHERE returned_at IS NULL;

-- 10. RESERVATIONS
---------------------------------------------------------------
CREATE TABLE reservations (
    id          SERIAL PRIMARY KEY,
    member_id   INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    book_id     INT NOT NULL REFERENCES books(id)   ON DELETE CASCADE,
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status      VARCHAR(50) DEFAULT 'pending'
                CHECK (status IN ('pending', 'fulfilled', 'cancelled'))
);

CREATE INDEX idx_reservation_member ON reservations(member_id);
CREATE INDEX idx_reservation_book   ON reservations(book_id);