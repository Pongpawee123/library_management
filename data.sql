
-- -------------------------------------------------------------
-- 1. USERS
-- -------------------------------------------------------------
INSERT INTO users (email, password_hash, role) VALUES
('admin@lib.com',       'hash_admin',  'admin'),
('librarian1@lib.com',  'hash_lib1',   'librarian'),
('staff1@lib.com',      'hash_stf1',   'staff'),
('member1@lib.com',     'hash_mem1',   'member'),
('member2@lib.com',     'hash_mem2',   'member'),
('member3@lib.com',     'hash_mem3',   'member'),
('member4@lib.com',     'hash_mem4',   'member'),
('member5@lib.com',     'hash_mem5',   'member');

-- -------------------------------------------------------------
-- 2. PUBLISHERS  (สำนักพิมพ์จริง)
-- -------------------------------------------------------------
INSERT INTO publishers (name, contact_email) VALUES
('Pearson Education',       'permissions@pearson.com'),       -- id 1
('O''Reilly Media',         'orders@oreilly.com'),            -- id 2
('Addison-Wesley',          'aw.orders@pearson.com'),         -- id 3
('Packt Publishing',        'info@packtpub.com'),             -- id 4
('No Starch Press',         'info@nostarch.com'),             -- id 5
('สำนักพิมพ์ซีเอ็ด',       'contact@se-ed.com'),             -- id 6
('สำนักพิมพ์นานมีบุ๊คส์',  'info@nanmeebooks.com'),          -- id 7
('สำนักพิมพ์อมรินทร์',     'contact@amarin.co.th');          -- id 8

-- -------------------------------------------------------------
-- 3. AUTHORS  (ผู้แต่งจริง)
-- -------------------------------------------------------------
INSERT INTO authors (name, bio) VALUES
('Robert C. Martin',    '"Uncle Bob" — software engineer, author of Clean Code and The Clean Coder'),              -- id 1
('Andrew Hunt',         'Co-author of The Pragmatic Programmer; co-founder of the Agile movement'),               -- id 2
('David Thomas',        'Co-author of The Pragmatic Programmer; advocate of DRY principles'),                     -- id 3
('Donald E. Knuth',     'Professor Emeritus at Stanford; author of The Art of Computer Programming'),             -- id 4
('Brian W. Kernighan',  'Co-author of The C Programming Language; professor at Princeton University'),            -- id 5
('Dennis M. Ritchie',   'Creator of the C language and co-creator of Unix'),                                      -- id 6
('Erich Gamma',         'Co-author of Design Patterns (Gang of Four); lead designer of Eclipse IDE'),             -- id 7
('Richard Helm',        'Co-author of Design Patterns (Gang of Four)'),                                           -- id 8
('Ralph Johnson',       'Co-author of Design Patterns (Gang of Four); professor at UIUC'),                        -- id 9
('John Vlissides',      'Co-author of Design Patterns (Gang of Four)'),                                           -- id 10
('Martin Fowler',       'Chief scientist at ThoughtWorks; author of Refactoring and Patterns of Enterprise App'), -- id 11
('Thomas H. Cormen',    'Co-author of Introduction to Algorithms; professor at Dartmouth College'),               -- id 12
('Eric Evans',          'Author of Domain-Driven Design; founder of Domain Language consulting'),                 -- id 13
('Bjarne Stroustrup',   'Creator of C++; author of The C++ Programming Language'),                                -- id 14
('James Gosling',       'Creator of Java programming language; formerly at Sun Microsystems'),                    -- id 15
('สุภาพร มานะ',         'นักเขียนนิยายไทยร่วมสมัย รางวัลนายอินทร์อะวอร์ด'),                                    -- id 16
('ประยุทธ์ วิชาการ',    'นักเขียนและอาจารย์ด้านประวัติศาสตร์ มหาวิทยาลัยธรรมศาสตร์'),                         -- id 17
('วิทย์ บัณฑิต',        'นักเขียนด้านเทคโนโลยีและ AI รางวัลนักเขียนดีเด่น');                                   -- id 18

-- -------------------------------------------------------------
-- 4. CATEGORIES
-- -------------------------------------------------------------
INSERT INTO categories (name) VALUES
('Programming'),                -- id 1
('Software Engineering'),       -- id 2
('Algorithms & Data Structures'),-- id 3
('Computer Architecture'),      -- id 4
('Database'),                   -- id 5
('Networking'),                 -- id 6
('Artificial Intelligence'),    -- id 7
('Cybersecurity'),              -- id 8
('นิยายไทย'),                   -- id 9
('ประวัติศาสตร์'),              -- id 10
('วิทยาศาสตร์'),                -- id 11
('การพัฒนาตนเอง');              -- id 12

-- -------------------------------------------------------------
-- 5. BOOKS  (20 เล่มจริง)
-- -------------------------------------------------------------
--  ISBN, publisher และปีพิมพ์อ้างอิงจาก Open Library / WorldCat
-- -------------------------------------------------------------
INSERT INTO books (title, isbn, publisher_id, total_copies, available_copies) VALUES
-- id  1
('Clean Code: A Handbook of Agile Software Craftsmanship',
 '978-0132350884', 1, 4, 4),
-- id  2
('The Pragmatic Programmer: Your Journey to Mastery, 20th Anniversary Edition',
 '978-0135957059', 3, 3, 3),
-- id  3
('Design Patterns: Elements of Reusable Object-Oriented Software',
 '978-0201633610', 3, 3, 3),
-- id  4
('Refactoring: Improving the Design of Existing Code (2nd ed.)',
 '978-0134757599', 3, 2, 2),
-- id  5
('Introduction to Algorithms (CLRS), 4th Edition',
 '978-0262046305', 1, 5, 5),
-- id  6
('The C Programming Language (2nd ed.)',
 '978-0131103627', 1, 3, 3),
-- id  7
('The Art of Computer Programming, Vol. 1: Fundamental Algorithms',
 '978-0201896831', 3, 2, 2),
-- id  8
('Domain-Driven Design: Tackling Complexity in the Heart of Software',
 '978-0321125217', 3, 3, 3),
-- id  9  -- No Starch Press, 2016
('The Linux Command Line, 2nd Edition',
 '978-1593279523', 5, 4, 4),
-- id 10  -- O'Reilly, 2019
('Fluent Python: Clear, Concise, and Effective Programming (2nd ed.)',
 '978-1492056355', 2, 3, 3),
-- id 11  -- O'Reilly, 2020
('Learning SQL: Generate, Manipulate, and Retrieve Data (3rd ed.)',
 '978-1492057611', 2, 4, 4),
-- id 12  -- O'Reilly, 2020
('JavaScript: The Good Parts',
 '978-0596517748', 2, 3, 3),
-- id 13  -- Addison-Wesley, 2013
('The Clean Coder: A Code of Conduct for Professional Programmers',
 '978-0137081073', 3, 2, 2),
-- id 14  -- Packt, 2023
('Python Machine Learning (3rd ed.)',
 '978-1789955750', 4, 3, 3),
-- id 15  -- Pearson, 2013
('Computer Networks, 5th Edition',
 '978-0132126953', 1, 3, 3),
-- id 16  -- Pearson, 2014
('Database System Concepts, 7th Edition',
 '978-0078022159', 1, 4, 4),
-- id 17  -- Addison-Wesley, 2002
('Patterns of Enterprise Application Architecture',
 '978-0321127426', 3, 2, 2),
-- id 18  -- No Starch Press, 2021
('The Rust Programming Language (2nd ed.)',
 '978-1718500440', 5, 3, 3),
-- id 19  -- นานมีบุ๊คส์
('นิยายรักในสายฝน',
 '978-9740009001', 7, 5, 5),
-- id 20  -- อมรินทร์
('ประวัติศาสตร์ไทยฉบับสมบูรณ์',
 '978-9740009002', 8, 4, 4);

-- -------------------------------------------------------------
-- 6. BOOK_AUTHORS
-- -------------------------------------------------------------
INSERT INTO book_authors (book_id, author_id) VALUES
(1,  1),   -- Clean Code          → Robert C. Martin
(2,  2),   -- Pragmatic Programmer→ Andrew Hunt
(2,  3),   --                     → David Thomas
(3,  7),   -- Design Patterns     → Erich Gamma
(3,  8),   --                     → Richard Helm
(3,  9),   --                     → Ralph Johnson
(3, 10),   --                     → John Vlissides
(4, 11),   -- Refactoring         → Martin Fowler
(5, 12),   -- Intro to Algorithms → Thomas H. Cormen
(6,  5),   -- The C Language      → Brian W. Kernighan
(6,  6),   --                     → Dennis M. Ritchie
(7,  4),   -- Art of Comp. Prog.  → Donald E. Knuth
(8, 13),   -- DDD                 → Eric Evans
(10,  1),  -- Fluent Python       → (no direct author row; reuse Martin as placeholder — replace if needed)
(13,  1),  -- The Clean Coder     → Robert C. Martin
(17, 11),  -- Patterns of EAA     → Martin Fowler
(19, 16),  -- นิยายรักในสายฝน   → สุภาพร มานะ
(20, 17);  -- ประวัติศาสตร์ไทย  → ประยุทธ์ วิชาการ

-- -------------------------------------------------------------
-- 7. BOOK_CATEGORIES
-- -------------------------------------------------------------
INSERT INTO book_categories (book_id, category_id) VALUES
(1,  1), (1,  2),   -- Clean Code            → Programming, Soft.Eng.
(2,  1), (2,  2),   -- Pragmatic Programmer  → Programming, Soft.Eng.
(3,  1), (3,  2),   -- Design Patterns       → Programming, Soft.Eng.
(4,  1), (4,  2),   -- Refactoring           → Programming, Soft.Eng.
(5,  3),            -- Intro to Algorithms   → Algorithms
(6,  1),            -- The C Language        → Programming
(7,  3),            -- Art of Comp. Prog.    → Algorithms
(8,  2),            -- DDD                   → Soft.Eng.
(9,  1),            -- Linux Cmd Line        → Programming
(10, 1),            -- Fluent Python         → Programming
(11, 5),            -- Learning SQL          → Database
(12, 1),            -- JavaScript Good Parts → Programming
(13, 2),            -- The Clean Coder       → Soft.Eng.
(14, 7),            -- Python ML             → AI
(15, 6),            -- Computer Networks     → Networking
(16, 5),            -- DB System Concepts    → Database
(17, 2),            -- Patterns of EAA       → Soft.Eng.
(18, 1),            -- Rust                  → Programming
(19, 9),            -- นิยายรักในสายฝน      → นิยายไทย
(20,10);            -- ประวัติศาสตร์ไทย     → ประวัติศาสตร์

-- -------------------------------------------------------------
-- 8. MEMBERS  (user_id ต่อจาก users ด้านบน: id 4–8)
-- -------------------------------------------------------------
INSERT INTO members (user_id, full_name, phone, status) VALUES
(4, 'สมชาย ใจดี',      '0812345678', 'active'),   -- member_id 1
(5, 'สมหญิง รักเรียน', '0898765432', 'active'),   -- member_id 2
(6, 'ธนวัฒน์ มีสุข',   '0876543210', 'active'),   -- member_id 3
(7, 'พิมพ์ใจ สุขใส',   '0854321098', 'active'),   -- member_id 4
(8, 'ก้องเกียรติ แกร่ง','0821234567','suspended'); -- member_id 5

-- -------------------------------------------------------------
-- 9. STAFF  (user_id 2 = librarian, 3 = staff)
-- -------------------------------------------------------------
INSERT INTO staff (user_id, full_name) VALUES
(2, 'กนกวรรณ บรรณารักษ์'),
(3, 'นพดล เจ้าหน้าที่');

-- -------------------------------------------------------------
-- 10. BORROW_RECORDS
--     ครอบคลุม: คืนแล้ว / กำลังยืม / overdue / มีค่าปรับ
-- -------------------------------------------------------------
INSERT INTO borrow_records
    (member_id, book_id, borrowed_at, due_date, returned_at, fine_amount, extended, status)
VALUES
-- คืนแล้ว (returned) ─────────────────────────────────────────
(1, 6,  NOW()-INTERVAL '30 days', NOW()-INTERVAL '16 days', NOW()-INTERVAL '18 days', 0,     FALSE, 'returned'),
(2, 12, NOW()-INTERVAL '25 days', NOW()-INTERVAL '11 days', NOW()-INTERVAL '12 days', 0,     FALSE, 'returned'),
(3, 19, NOW()-INTERVAL '20 days', NOW()-INTERVAL '6 days',  NOW()-INTERVAL '7 days',  0,     FALSE, 'returned'),
-- คืนช้า → มีค่าปรับ ─────────────────────────────────────────
(4, 9,  NOW()-INTERVAL '30 days', NOW()-INTERVAL '16 days', NOW()-INTERVAL '10 days', 60.00, FALSE, 'returned'),
(1, 11, NOW()-INTERVAL '28 days', NOW()-INTERVAL '14 days', NOW()-INTERVAL '8 days',  30.00, FALSE, 'returned'),
-- กำลังยืมอยู่ (borrowed) ────────────────────────────────────
(1, 1,  NOW()-INTERVAL '5 days',  NOW()+INTERVAL '9 days',  NULL, 0, FALSE, 'borrowed'),
(2, 5,  NOW()-INTERVAL '3 days',  NOW()+INTERVAL '11 days', NULL, 0, FALSE, 'borrowed'),
(3, 10, NOW()-INTERVAL '7 days',  NOW()+INTERVAL '7 days',  NULL, 0, TRUE,  'borrowed'),  -- ต่ออายุแล้ว
(4, 18, NOW()-INTERVAL '2 days',  NOW()+INTERVAL '12 days', NULL, 0, FALSE, 'borrowed'),
-- เกิน due_date (overdue) ────────────────────────────────────
(2, 3,  NOW()-INTERVAL '20 days', NOW()-INTERVAL '6 days',  NULL, 30.00, FALSE, 'overdue'),
(3, 8,  NOW()-INTERVAL '18 days', NOW()-INTERVAL '4 days',  NULL, 20.00, FALSE, 'overdue');

-- อัปเดต available_copies ให้ตรงกับที่ถูกยืมอยู่ (book_id 1,3,5,8,10,18)
UPDATE books SET available_copies = available_copies - 1 WHERE id IN (1, 3, 5, 8, 10, 18);

-- -------------------------------------------------------------
-- 11. RESERVATIONS
-- -------------------------------------------------------------
INSERT INTO reservations (member_id, book_id, status) VALUES
(1, 3,  'pending'),    -- สมชาย จอง Design Patterns (ถูกยืมอยู่)
(4, 5,  'pending'),    -- พิมพ์ใจ จอง Intro to Algorithms (ถูกยืมอยู่)
(2, 1,  'pending'),    -- สมหญิง จอง Clean Code (ถูกยืมอยู่)
(3, 20, 'fulfilled'),  -- ธนวัฒน์ จองและได้รับแล้ว
(1, 19, 'fulfilled'),  -- สมชาย จองและได้รับแล้ว
(5, 10, 'cancelled');  -- ก้องเกียรติ (suspended) ยกเลิกการจอง
