--
-- PostgreSQL database dump
--

\restrict z2MhY1iCF02fu3Pe0W8msFBfwZDAU4ujxZ88inYkCgPjyOIj5cl8oJbpn6hblBW

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-18 12:52:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 222 (class 1255 OID 24932)
-- Name: fn_hitung_umur(date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_hitung_umur(p_tgl date) RETURNS integer
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
  RETURN DATE_PART('year', AGE(CURRENT_DATE, p_tgl))::INT;
END;
$$;


ALTER FUNCTION public.fn_hitung_umur(p_tgl date) OWNER TO postgres;

--
-- TOC entry 225 (class 1255 OID 24935)
-- Name: fn_log_delete_siswa(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_log_delete_siswa() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO log_siswa (kode_siswa, nama_siswa, aksi)
  VALUES (OLD.kode_siswa, OLD.nama_siswa, 'DELETE');
  RETURN OLD;
END;
$$;


ALTER FUNCTION public.fn_log_delete_siswa() OWNER TO postgres;

--
-- TOC entry 223 (class 1255 OID 24933)
-- Name: fn_siswa_by_jurusan(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.fn_siswa_by_jurusan(p_jurusan character varying) RETURNS TABLE(kode_siswa character varying, nama_siswa character varying, umur integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN QUERY
  SELECT s.kode_siswa, s.nama_siswa, fn_hitung_umur(s.tgl_siswa)
  FROM siswa s WHERE s.jurusan_siswa = p_jurusan;
END;
$$;


ALTER FUNCTION public.fn_siswa_by_jurusan(p_jurusan character varying) OWNER TO postgres;

--
-- TOC entry 224 (class 1255 OID 24934)
-- Name: sp_tambah_siswa(character varying, character varying, character varying, date, character varying); Type: PROCEDURE; Schema: public; Owner: postgres
--

CREATE PROCEDURE public.sp_tambah_siswa(IN p_kode character varying, IN p_nama character varying, IN p_alamat character varying, IN p_tgl date, IN p_jurusan character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO siswa VALUES (p_kode, p_nama, p_alamat, p_tgl, p_jurusan);
END;
$$;


ALTER PROCEDURE public.sp_tambah_siswa(IN p_kode character varying, IN p_nama character varying, IN p_alamat character varying, IN p_tgl date, IN p_jurusan character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 24938)
-- Name: log_siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.log_siswa (
    id integer NOT NULL,
    kode_siswa character varying(10),
    nama_siswa character varying(100),
    aksi character varying(20),
    waktu timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.log_siswa OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24937)
-- Name: log_siswa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.log_siswa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.log_siswa_id_seq OWNER TO postgres;

--
-- TOC entry 5026 (class 0 OID 0)
-- Dependencies: 220
-- Name: log_siswa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.log_siswa_id_seq OWNED BY public.log_siswa.id;


--
-- TOC entry 219 (class 1259 OID 24922)
-- Name: siswa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.siswa (
    kode_siswa character varying(10) NOT NULL,
    nama_siswa character varying(100) NOT NULL,
    alamat_siswa character varying(255) NOT NULL,
    tgl_siswa date NOT NULL,
    jurusan_siswa character varying(50) NOT NULL
);


ALTER TABLE public.siswa OWNER TO postgres;

--
-- TOC entry 4864 (class 2604 OID 24941)
-- Name: log_siswa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log_siswa ALTER COLUMN id SET DEFAULT nextval('public.log_siswa_id_seq'::regclass);


--
-- TOC entry 5020 (class 0 OID 24938)
-- Dependencies: 221
-- Data for Name: log_siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.log_siswa (id, kode_siswa, nama_siswa, aksi, waktu) FROM stdin;
1	S099	Aman Madani	DELETE	2026-11-18 10:17:49.029556
2	S004	Rina Putri Lestari	DELETE	2026-11-18 10:28:56.426133
3	S003	Andi Wijaya	DELETE	2026-11-18 11:07:22.820886
4	S005	Rezra Praw	DELETE	2026-11-18 11:21:50.994531
\.


--
-- TOC entry 5018 (class 0 OID 24922)
-- Dependencies: 219
-- Data for Name: siswa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) FROM stdin;
S008	Paramadina Mulya	Tambun Selatan	2006-02-13	Multimedia
S010	Weri Yunelda	Solok Selatan	2006-01-10	Akuntansi
S001	Budi Santoso	Jakarta	2008-03-15	Akuntansi
S002	Siti Aminah	Bekasi	2008-07-21	TKJ
S007	Riri Fauzia Haris	Bekasi	2006-04-19	RPL
\.


--
-- TOC entry 5027 (class 0 OID 0)
-- Dependencies: 220
-- Name: log_siswa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.log_siswa_id_seq', 4, true);


--
-- TOC entry 4869 (class 2606 OID 24945)
-- Name: log_siswa log_siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log_siswa
    ADD CONSTRAINT log_siswa_pkey PRIMARY KEY (id);


--
-- TOC entry 4867 (class 2606 OID 24931)
-- Name: siswa siswa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.siswa
    ADD CONSTRAINT siswa_pkey PRIMARY KEY (kode_siswa);


--
-- TOC entry 4870 (class 2620 OID 24936)
-- Name: siswa trg_siswa_after_delete; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_siswa_after_delete AFTER DELETE ON public.siswa FOR EACH ROW EXECUTE FUNCTION public.fn_log_delete_siswa();


-- Completed on 2026-11-18 12:52:24

--
-- PostgreSQL database dump complete
--

\unrestrict z2MhY1iCF02fu3Pe0W8msFBfwZDAU4ujxZ88inYkCgPjyOIj5cl8oJbpn6hblBW

