--
-- PostgreSQL database dump
--

\restrict iblSypZtw43XXAklVMeuoh2NVzFDGxXAf1EglzW0cCl1NKepe6EtBLRhgjAsdIJ

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: authors; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.authors (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    bio text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.authors OWNER TO myfull;

--
-- Name: authors_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.authors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.authors_id_seq OWNER TO myfull;

--
-- Name: authors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.authors_id_seq OWNED BY public.authors.id;


--
-- Name: book_authors; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.book_authors (
    book_id integer NOT NULL,
    author_id integer NOT NULL
);


ALTER TABLE public.book_authors OWNER TO myfull;

--
-- Name: book_categories; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.book_categories (
    book_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.book_categories OWNER TO myfull;

--
-- Name: books; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.books (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    isbn character varying(20),
    publisher_id integer,
    total_copies integer NOT NULL,
    available_copies integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT books_available_copies_check CHECK ((available_copies >= 0)),
    CONSTRAINT books_check CHECK ((available_copies <= total_copies)),
    CONSTRAINT books_total_copies_check CHECK ((total_copies >= 0))
);


ALTER TABLE public.books OWNER TO myfull;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.books_id_seq OWNER TO myfull;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: borrow_records; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.borrow_records (
    id integer NOT NULL,
    member_id integer NOT NULL,
    book_id integer NOT NULL,
    borrowed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    due_date timestamp without time zone NOT NULL,
    returned_at timestamp without time zone,
    fine_amount numeric(10,2) DEFAULT 0,
    extended boolean DEFAULT false,
    status character varying(50) DEFAULT 'borrowed'::character varying,
    CONSTRAINT borrow_records_fine_amount_check CHECK ((fine_amount >= (0)::numeric)),
    CONSTRAINT borrow_records_status_check CHECK (((status)::text = ANY ((ARRAY['borrowed'::character varying, 'returned'::character varying, 'overdue'::character varying])::text[])))
);


ALTER TABLE public.borrow_records OWNER TO myfull;

--
-- Name: borrow_records_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.borrow_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.borrow_records_id_seq OWNER TO myfull;

--
-- Name: borrow_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.borrow_records_id_seq OWNED BY public.borrow_records.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(100) NOT NULL
);


ALTER TABLE public.categories OWNER TO myfull;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO myfull;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: members; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.members (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    phone character varying(20),
    status character varying(50) DEFAULT 'active'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer,
    CONSTRAINT members_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'suspended'::character varying])::text[])))
);


ALTER TABLE public.members OWNER TO myfull;

--
-- Name: members_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.members_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.members_id_seq OWNER TO myfull;

--
-- Name: members_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.members_id_seq OWNED BY public.members.id;


--
-- Name: publishers; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.publishers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    contact_email character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.publishers OWNER TO myfull;

--
-- Name: publishers_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.publishers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.publishers_id_seq OWNER TO myfull;

--
-- Name: publishers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.publishers_id_seq OWNED BY public.publishers.id;


--
-- Name: reservations; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    member_id integer NOT NULL,
    book_id integer NOT NULL,
    reserved_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50) DEFAULT 'pending'::character varying,
    CONSTRAINT reservations_status_check CHECK (((status)::text = ANY ((ARRAY['pending'::character varying, 'fulfilled'::character varying, 'cancelled'::character varying])::text[])))
);


ALTER TABLE public.reservations OWNER TO myfull;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO myfull;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: staff; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.staff (
    id integer NOT NULL,
    full_name character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer
);


ALTER TABLE public.staff OWNER TO myfull;

--
-- Name: staff_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.staff_id_seq OWNER TO myfull;

--
-- Name: staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.staff_id_seq OWNED BY public.staff.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: myfull
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    role character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['admin'::character varying, 'librarian'::character varying, 'staff'::character varying, 'member'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO myfull;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: myfull
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO myfull;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myfull
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: authors id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.authors ALTER COLUMN id SET DEFAULT nextval('public.authors_id_seq'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: borrow_records id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.borrow_records ALTER COLUMN id SET DEFAULT nextval('public.borrow_records_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: members id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.members ALTER COLUMN id SET DEFAULT nextval('public.members_id_seq'::regclass);


--
-- Name: publishers id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.publishers ALTER COLUMN id SET DEFAULT nextval('public.publishers_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: staff id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.staff ALTER COLUMN id SET DEFAULT nextval('public.staff_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: authors authors_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.authors
    ADD CONSTRAINT authors_pkey PRIMARY KEY (id);


--
-- Name: book_authors book_authors_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_pkey PRIMARY KEY (book_id, author_id);


--
-- Name: book_categories book_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_categories
    ADD CONSTRAINT book_categories_pkey PRIMARY KEY (book_id, category_id);


--
-- Name: books books_isbn_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_isbn_key UNIQUE (isbn);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: borrow_records borrow_records_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.borrow_records
    ADD CONSTRAINT borrow_records_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: members members_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_pkey PRIMARY KEY (id);


--
-- Name: members members_user_id_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_user_id_key UNIQUE (user_id);


--
-- Name: publishers publishers_name_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_name_key UNIQUE (name);


--
-- Name: publishers publishers_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.publishers
    ADD CONSTRAINT publishers_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);


--
-- Name: staff staff_user_id_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_user_id_key UNIQUE (user_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_books_isbn; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_books_isbn ON public.books USING btree (isbn);


--
-- Name: idx_books_title; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_books_title ON public.books USING btree (title);


--
-- Name: idx_borrow_book; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_borrow_book ON public.borrow_records USING btree (book_id);


--
-- Name: idx_borrow_member; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_borrow_member ON public.borrow_records USING btree (member_id);


--
-- Name: idx_reservation_book; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_reservation_book ON public.reservations USING btree (book_id);


--
-- Name: idx_reservation_member; Type: INDEX; Schema: public; Owner: myfull
--

CREATE INDEX idx_reservation_member ON public.reservations USING btree (member_id);


--
-- Name: unique_active_borrow; Type: INDEX; Schema: public; Owner: myfull
--

CREATE UNIQUE INDEX unique_active_borrow ON public.borrow_records USING btree (member_id, book_id) WHERE (returned_at IS NULL);


--
-- Name: book_authors book_authors_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.authors(id) ON DELETE CASCADE;


--
-- Name: book_authors book_authors_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_authors
    ADD CONSTRAINT book_authors_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: book_categories book_categories_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_categories
    ADD CONSTRAINT book_categories_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: book_categories book_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.book_categories
    ADD CONSTRAINT book_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: books books_publisher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_publisher_id_fkey FOREIGN KEY (publisher_id) REFERENCES public.publishers(id) ON DELETE SET NULL;


--
-- Name: borrow_records borrow_records_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.borrow_records
    ADD CONSTRAINT borrow_records_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: borrow_records borrow_records_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.borrow_records
    ADD CONSTRAINT borrow_records_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id) ON DELETE CASCADE;


--
-- Name: members members_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.members
    ADD CONSTRAINT members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reservations reservations_book_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_book_id_fkey FOREIGN KEY (book_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: reservations reservations_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.members(id) ON DELETE CASCADE;


--
-- Name: staff staff_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myfull
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict iblSypZtw43XXAklVMeuoh2NVzFDGxXAf1EglzW0cCl1NKepe6EtBLRhgjAsdIJ

