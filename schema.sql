--Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL
        CHECK (role IN ('admin','librarian','staff','member')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--publishers
CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    contact_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--authors
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

--books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publisher_id INT REFERENCES publishers(id) ON DELETE SET NULL,
    total_copies INT NOT NULL CHECK (total_copies >= 0),
    available_copies INT NOT NULL CHECK (available_copies >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (available_copies <= total_copies)
);

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_isbn ON books(isbn);

--book_authors
CREATE TABLE book_authors (
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    author_id INT REFERENCES authors(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

--book_categories 
CREATE TABLE book_categories (
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, category_id)
);

--members
CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(50) DEFAULT 'active'
        CHECK (status IN ('active','suspended')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE members
ADD COLUMN user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE;

--staff
CREATE TABLE staff (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE staff
ADD COLUMN user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE;

--borrow_records
CREATE TABLE borrow_records (
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    borrowed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    returned_at TIMESTAMP,
    fine_amount NUMERIC(10,2) DEFAULT 0 CHECK (fine_amount >= 0),
    extended BOOLEAN DEFAULT FALSE,
	status VARCHAR(50)
        CHECK (status IN ('borrowed','returned','overdue'))
        DEFAULT 'borrowed'
);

CREATE INDEX idx_borrow_member ON borrow_records(member_id);
CREATE INDEX idx_borrow_book ON borrow_records(book_id);

--reservations
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    member_id INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
    book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pending'
        CHECK (status IN ('pending','fulfilled','cancelled'))
);

CREATE INDEX idx_reservation_member ON reservations(member_id);
CREATE INDEX idx_reservation_book ON reservations(book_id);

CREATE UNIQUE INDEX unique_active_borrow
ON borrow_records(member_id, book_id)
WHERE returned_at IS NULL;
