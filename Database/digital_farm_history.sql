--
-- PostgreSQL database dump
--

\restrict IyyEsKpPdIqbB4N03f62sBMnMgmcCYbHz2uZvBTtuILvLWI6P7rdeoYNqMNRm7X

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

-- Started on 2026-09-20 13:02:23

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
-- TOC entry 2 (class 3079 OID 16388)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 5076 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 225 (class 1259 OID 16519)
-- Name: activities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    crop_cycle_id uuid NOT NULL,
    activity_type_id uuid NOT NULL,
    activity_date date NOT NULL,
    description text,
    quantity numeric(12,2),
    unit character varying(30),
    cost numeric(12,2),
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activities OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16510)
-- Name: activity_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.activity_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.activity_types OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16618)
-- Name: ai_evidence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_evidence (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ai_query_id uuid NOT NULL,
    activity_id uuid,
    document_id uuid,
    relevance_score numeric(5,4)
);


ALTER TABLE public.ai_evidence OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16604)
-- Name: ai_queries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_queries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    question text NOT NULL,
    answer text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.ai_queries OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16485)
-- Name: crop_cycles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crop_cycles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    field_id uuid NOT NULL,
    crop_id uuid NOT NULL,
    season_id uuid NOT NULL,
    variety character varying(100),
    sowing_date date,
    expected_harvest_date date,
    actual_harvest_date date,
    status character varying(50),
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.crop_cycles OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16476)
-- Name: crops; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.crops (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.crops OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16580)
-- Name: documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.documents (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    farm_id uuid NOT NULL,
    field_id uuid,
    crop_cycle_id uuid,
    document_type character varying(100),
    file_name character varying(255) NOT NULL,
    file_url text NOT NULL,
    extracted_text text,
    uploaded_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.documents OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16552)
-- Name: expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenses (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    crop_cycle_id uuid NOT NULL,
    expense_date date NOT NULL,
    category character varying(100) NOT NULL,
    description text,
    amount numeric(12,2) NOT NULL,
    payment_method character varying(50),
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.expenses OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16437)
-- Name: farms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.farms (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    farm_name character varying(150) NOT NULL,
    village character varying(100),
    district character varying(100),
    state character varying(100),
    total_area_acres numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.farms OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16450)
-- Name: fields; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fields (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    farm_id uuid NOT NULL,
    field_name character varying(100) NOT NULL,
    area_acres numeric(10,2),
    soil_type character varying(100),
    irrigation_type character varying(100),
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.fields OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16566)
-- Name: harvests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.harvests (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    crop_cycle_id uuid NOT NULL,
    harvest_date date NOT NULL,
    quantity numeric(12,2),
    unit character varying(30),
    quality_grade character varying(50),
    selling_price numeric(12,2),
    total_revenue numeric(12,2),
    buyer character varying(150),
    notes text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.harvests OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16539)
-- Name: inputs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inputs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    activity_id uuid NOT NULL,
    input_type character varying(100) NOT NULL,
    product_name character varying(150) NOT NULL,
    quantity numeric(12,2),
    unit character varying(30),
    cost numeric(12,2),
    supplier character varying(150),
    notes text
);


ALTER TABLE public.inputs OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16465)
-- Name: seasons; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seasons (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    farm_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    year integer NOT NULL,
    start_date date,
    end_date date
);


ALTER TABLE public.seasons OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16425)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash text NOT NULL,
    phone character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 16519)
-- Dependencies: 225
-- Data for Name: activities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activities (id, crop_cycle_id, activity_type_id, activity_date, description, quantity, unit, cost, notes, created_at, updated_at) FROM stdin;
34856007-1ee5-48d3-aee2-f5b909400f1c	8688db81-8884-4c5c-8e0b-0a32395fb219	c61e763f-a52f-4a9b-aee9-793676df8b46	2025-11-05	Field preparation and ploughing completed	\N	\N	\N	Initial land preparation	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274	8688db81-8884-4c5c-8e0b-0a32395fb219	b452900c-9b57-4f96-ad59-d7e94e353fd9	2025-11-15	Wheat seeds sown	50.00	kg	\N	HD 2967 wheat variety	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
bc23acc8-a2ff-40c1-8438-5b68e016177f	8688db81-8884-4c5c-8e0b-0a32395fb219	e27b4c70-69cd-4499-8978-e3d6b90a3824	2025-12-01	First irrigation completed	2.00	hours	\N	Drip irrigation	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
f634ef5a-35b0-412b-b6a0-93a0d0e26ed1	8688db81-8884-4c5c-8e0b-0a32395fb219	47e05813-7a93-4ded-a09b-96b75b25063e	2025-12-10	Fertilizer applied to wheat crop	100.00	kg	3500.00	NPK fertilizer	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
d8a400dd-3fb0-490b-bcad-b9e3ae9d9a52	8688db81-8884-4c5c-8e0b-0a32395fb219	499e5ed4-25d6-4d22-8004-8a86c50f8640	2026-01-05	Pesticide applied for crop protection	5.00	litre	2200.00	Crop protection treatment	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
6d0ad2a6-e4eb-4707-b1fc-514f16ab6b90	8688db81-8884-4c5c-8e0b-0a32395fb219	90c85719-1e1b-48f3-9e93-5c9f63552a44	2026-01-15	Manual weeding completed	\N	\N	1800.00	Labour cost	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
d34dfe58-84c4-4a83-93e7-9095cc416332	8688db81-8884-4c5c-8e0b-0a32395fb219	e87f356d-3f75-4d21-81b9-7f9d1e8d4f74	2026-03-20	Wheat harvesting completed	\N	\N	\N	Harvest completed successfully	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
\.


--
-- TOC entry 5063 (class 0 OID 16510)
-- Dependencies: 224
-- Data for Name: activity_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.activity_types (id, name, category, created_at) FROM stdin;
c61e763f-a52f-4a9b-aee9-793676df8b46	Ploughing	Land Preparation	2026-09-20 12:37:26.507786
b452900c-9b57-4f96-ad59-d7e94e353fd9	Sowing	Planting	2026-09-20 12:37:26.507786
e27b4c70-69cd-4499-8978-e3d6b90a3824	Irrigation	Water Management	2026-09-20 12:37:26.507786
47e05813-7a93-4ded-a09b-96b75b25063e	Fertilization	Nutrient Management	2026-09-20 12:37:26.507786
499e5ed4-25d6-4d22-8004-8a86c50f8640	Pesticide Application	Crop Protection	2026-09-20 12:37:26.507786
90c85719-1e1b-48f3-9e93-5c9f63552a44	Weeding	Crop Maintenance	2026-09-20 12:37:26.507786
e87f356d-3f75-4d21-81b9-7f9d1e8d4f74	Harvesting	Harvest	2026-09-20 12:37:26.507786
\.


--
-- TOC entry 5070 (class 0 OID 16618)
-- Dependencies: 231
-- Data for Name: ai_evidence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_evidence (id, ai_query_id, activity_id, document_id, relevance_score) FROM stdin;
\.


--
-- TOC entry 5069 (class 0 OID 16604)
-- Dependencies: 230
-- Data for Name: ai_queries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_queries (id, user_id, question, answer, created_at) FROM stdin;
\.


--
-- TOC entry 5062 (class 0 OID 16485)
-- Dependencies: 223
-- Data for Name: crop_cycles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crop_cycles (id, field_id, crop_id, season_id, variety, sowing_date, expected_harvest_date, actual_harvest_date, status, notes, created_at, updated_at) FROM stdin;
8688db81-8884-4c5c-8e0b-0a32395fb219	66214d15-3c87-4831-9f1e-c50840e03521	1c746d9c-1b13-47a4-895c-dccfb46c805c	724bbc53-d19f-4e21-9220-33e7039f087f	HD 2967	2025-11-15	2026-03-20	2026-03-20	Completed	Wheat crop cycle for Rabi season	2026-09-20 12:43:12.878217	2026-09-20 12:43:12.878217
\.


--
-- TOC entry 5061 (class 0 OID 16476)
-- Dependencies: 222
-- Data for Name: crops; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.crops (id, name, category, created_at) FROM stdin;
1c746d9c-1b13-47a4-895c-dccfb46c805c	Wheat	Cereal	2026-09-20 12:35:03.989384
5360b47e-3849-4777-9a99-5eaaf0d33071	Rice	Cereal	2026-09-20 12:35:03.989384
e2992d02-43b9-4a87-9dff-b8f7bb2de522	Sugarcane	Cash Crop	2026-09-20 12:35:03.989384
ab88bb2f-a6d3-452f-89eb-161a4bc82be1	Soybean	Oilseed	2026-09-20 12:35:03.989384
188712ea-19f8-4507-bb84-eee8424457f3	Cotton	Cash Crop	2026-09-20 12:35:03.989384
\.


--
-- TOC entry 5068 (class 0 OID 16580)
-- Dependencies: 229
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.documents (id, farm_id, field_id, crop_cycle_id, document_type, file_name, file_url, extracted_text, uploaded_at) FROM stdin;
\.


--
-- TOC entry 5066 (class 0 OID 16552)
-- Dependencies: 227
-- Data for Name: expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenses (id, crop_cycle_id, expense_date, category, description, amount, payment_method, notes, created_at) FROM stdin;
cf8b23af-e6c9-45f6-952a-95dedc8dc227	8688db81-8884-4c5c-8e0b-0a32395fb219	2025-11-05	Machinery	Tractor and ploughing	3000.00	Cash	Land preparation	2026-09-20 12:43:12.878217
f36b6b1b-a0c7-4332-a64c-0bf9f49a5c16	8688db81-8884-4c5c-8e0b-0a32395fb219	2025-11-15	Seeds	Wheat seeds	2500.00	UPI	HD 2967 variety	2026-09-20 12:43:12.878217
8714465b-e6e9-43e8-9c0a-f56a10477737	8688db81-8884-4c5c-8e0b-0a32395fb219	2025-12-10	Fertilizer	NPK fertilizer	3500.00	UPI	Crop nutrition	2026-09-20 12:43:12.878217
d4cc9283-f1da-419f-b106-d83a7dcdb3ea	8688db81-8884-4c5c-8e0b-0a32395fb219	2026-01-05	Pesticide	Crop protection	2200.00	Cash	Pesticide application	2026-09-20 12:43:12.878217
f6d2345d-7fd2-4132-b1f7-16319d769114	8688db81-8884-4c5c-8e0b-0a32395fb219	2026-01-15	Labour	Weeding labour	1800.00	Cash	Manual weeding	2026-09-20 12:43:12.878217
93ba3f65-9c01-47fb-b3db-715b303e0795	8688db81-8884-4c5c-8e0b-0a32395fb219	2026-03-20	Harvesting	Harvesting labour and machinery	4000.00	UPI	Harvest operations	2026-09-20 12:43:12.878217
\.


--
-- TOC entry 5058 (class 0 OID 16437)
-- Dependencies: 219
-- Data for Name: farms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.farms (id, user_id, farm_name, village, district, state, total_area_acres, created_at, updated_at) FROM stdin;
3ddb8a80-5521-4532-b261-62677c8ff4ee	7721bdac-c50f-4e11-8e98-436f6ab2488e	Green Valley Farm	Ichalkaranji	Kolhapur	Maharashtra	10.50	2026-09-20 12:39:21.945673	2026-09-20 12:39:21.945673
\.


--
-- TOC entry 5059 (class 0 OID 16450)
-- Dependencies: 220
-- Data for Name: fields; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fields (id, farm_id, field_name, area_acres, soil_type, irrigation_type, notes, created_at, updated_at) FROM stdin;
66214d15-3c87-4831-9f1e-c50840e03521	3ddb8a80-5521-4532-b261-62677c8ff4ee	Field A	4.00	Black Soil	Drip Irrigation	Main field for crop production	2026-09-20 12:40:24.630697	2026-09-20 12:40:24.630697
ea1c5125-7b45-445a-9301-87cdde24938c	3ddb8a80-5521-4532-b261-62677c8ff4ee	Field B	3.50	Black Soil	Canal Irrigation	Secondary field for crop production	2026-09-20 12:41:04.085414	2026-09-20 12:41:04.085414
\.


--
-- TOC entry 5067 (class 0 OID 16566)
-- Dependencies: 228
-- Data for Name: harvests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.harvests (id, crop_cycle_id, harvest_date, quantity, unit, quality_grade, selling_price, total_revenue, buyer, notes, created_at) FROM stdin;
720ef77b-c672-4db2-8638-c6a1ed2ce858	8688db81-8884-4c5c-8e0b-0a32395fb219	2026-03-20	4200.00	kg	A	25.00	105000.00	Local Grain Buyer	Good quality wheat harvest	2026-09-20 12:43:12.878217
\.


--
-- TOC entry 5065 (class 0 OID 16539)
-- Dependencies: 226
-- Data for Name: inputs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inputs (id, activity_id, input_type, product_name, quantity, unit, cost, supplier, notes) FROM stdin;
5c2aa783-d7e7-462e-bf8a-e68b5eeb0969	bc4e4c2f-f8a2-44f8-bac7-fd2e299c6274	Seed	Wheat HD 2967	50.00	kg	2500.00	Local Seed Supplier	Certified wheat seed
40c13c6e-91ce-43a4-9b86-1382ddc55d8e	f634ef5a-35b0-412b-b6a0-93a0d0e26ed1	Fertilizer	NPK 10:26:26	100.00	kg	3500.00	Agro Fertilizer Store	Applied during crop growth
b2f2bf59-0bff-44f9-b4d9-4ff861ec43f0	d8a400dd-3fb0-490b-bcad-b9e3ae9d9a52	Pesticide	Crop Protection Solution	5.00	litre	2200.00	Agro Chemicals Supplier	Used for crop protection
\.


--
-- TOC entry 5060 (class 0 OID 16465)
-- Dependencies: 221
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seasons (id, farm_id, name, year, start_date, end_date) FROM stdin;
724bbc53-d19f-4e21-9220-33e7039f087f	3ddb8a80-5521-4532-b261-62677c8ff4ee	Rabi	2025	2025-11-01	2026-03-31
\.


--
-- TOC entry 5057 (class 0 OID 16425)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password_hash, phone, created_at, updated_at) FROM stdin;
7721bdac-c50f-4e11-8e98-436f6ab2488e	Test Farmer	farmer@test.com	demo_password_hash	9876543210	2026-09-20 12:38:32.900723	2026-09-20 12:38:32.900723
\.


--
-- TOC entry 4881 (class 2606 OID 16528)
-- Name: activities activities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_pkey PRIMARY KEY (id);


--
-- TOC entry 4877 (class 2606 OID 16518)
-- Name: activity_types activity_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_types
    ADD CONSTRAINT activity_types_name_key UNIQUE (name);


--
-- TOC entry 4879 (class 2606 OID 16516)
-- Name: activity_types activity_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activity_types
    ADD CONSTRAINT activity_types_pkey PRIMARY KEY (id);


--
-- TOC entry 4893 (class 2606 OID 16623)
-- Name: ai_evidence ai_evidence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_evidence
    ADD CONSTRAINT ai_evidence_pkey PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 16612)
-- Name: ai_queries ai_queries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_queries
    ADD CONSTRAINT ai_queries_pkey PRIMARY KEY (id);


--
-- TOC entry 4875 (class 2606 OID 16494)
-- Name: crop_cycles crop_cycles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop_cycles
    ADD CONSTRAINT crop_cycles_pkey PRIMARY KEY (id);


--
-- TOC entry 4871 (class 2606 OID 16484)
-- Name: crops crops_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_name_key UNIQUE (name);


--
-- TOC entry 4873 (class 2606 OID 16482)
-- Name: crops crops_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crops
    ADD CONSTRAINT crops_pkey PRIMARY KEY (id);


--
-- TOC entry 4889 (class 2606 OID 16588)
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- TOC entry 4885 (class 2606 OID 16560)
-- Name: expenses expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (id);


--
-- TOC entry 4865 (class 2606 OID 16444)
-- Name: farms farms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT farms_pkey PRIMARY KEY (id);


--
-- TOC entry 4867 (class 2606 OID 16459)
-- Name: fields fields_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fields
    ADD CONSTRAINT fields_pkey PRIMARY KEY (id);


--
-- TOC entry 4887 (class 2606 OID 16574)
-- Name: harvests harvests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvests
    ADD CONSTRAINT harvests_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 16546)
-- Name: inputs inputs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_pkey PRIMARY KEY (id);


--
-- TOC entry 4869 (class 2606 OID 16470)
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (id);


--
-- TOC entry 4861 (class 2606 OID 16436)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4863 (class 2606 OID 16434)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4900 (class 2606 OID 16534)
-- Name: activities activities_activity_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_activity_type_id_fkey FOREIGN KEY (activity_type_id) REFERENCES public.activity_types(id) ON DELETE RESTRICT;


--
-- TOC entry 4901 (class 2606 OID 16529)
-- Name: activities activities_crop_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.activities
    ADD CONSTRAINT activities_crop_cycle_id_fkey FOREIGN KEY (crop_cycle_id) REFERENCES public.crop_cycles(id) ON DELETE CASCADE;


--
-- TOC entry 4909 (class 2606 OID 16629)
-- Name: ai_evidence ai_evidence_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_evidence
    ADD CONSTRAINT ai_evidence_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE SET NULL;


--
-- TOC entry 4910 (class 2606 OID 16624)
-- Name: ai_evidence ai_evidence_ai_query_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_evidence
    ADD CONSTRAINT ai_evidence_ai_query_id_fkey FOREIGN KEY (ai_query_id) REFERENCES public.ai_queries(id) ON DELETE CASCADE;


--
-- TOC entry 4911 (class 2606 OID 16634)
-- Name: ai_evidence ai_evidence_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_evidence
    ADD CONSTRAINT ai_evidence_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE SET NULL;


--
-- TOC entry 4908 (class 2606 OID 16613)
-- Name: ai_queries ai_queries_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_queries
    ADD CONSTRAINT ai_queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4897 (class 2606 OID 16500)
-- Name: crop_cycles crop_cycles_crop_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop_cycles
    ADD CONSTRAINT crop_cycles_crop_id_fkey FOREIGN KEY (crop_id) REFERENCES public.crops(id) ON DELETE RESTRICT;


--
-- TOC entry 4898 (class 2606 OID 16495)
-- Name: crop_cycles crop_cycles_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop_cycles
    ADD CONSTRAINT crop_cycles_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.fields(id) ON DELETE CASCADE;


--
-- TOC entry 4899 (class 2606 OID 16505)
-- Name: crop_cycles crop_cycles_season_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.crop_cycles
    ADD CONSTRAINT crop_cycles_season_id_fkey FOREIGN KEY (season_id) REFERENCES public.seasons(id) ON DELETE CASCADE;


--
-- TOC entry 4905 (class 2606 OID 16599)
-- Name: documents documents_crop_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_crop_cycle_id_fkey FOREIGN KEY (crop_cycle_id) REFERENCES public.crop_cycles(id) ON DELETE SET NULL;


--
-- TOC entry 4906 (class 2606 OID 16589)
-- Name: documents documents_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- TOC entry 4907 (class 2606 OID 16594)
-- Name: documents documents_field_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_field_id_fkey FOREIGN KEY (field_id) REFERENCES public.fields(id) ON DELETE SET NULL;


--
-- TOC entry 4903 (class 2606 OID 16561)
-- Name: expenses expenses_crop_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_crop_cycle_id_fkey FOREIGN KEY (crop_cycle_id) REFERENCES public.crop_cycles(id) ON DELETE CASCADE;


--
-- TOC entry 4894 (class 2606 OID 16445)
-- Name: farms farms_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.farms
    ADD CONSTRAINT farms_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4895 (class 2606 OID 16460)
-- Name: fields fields_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fields
    ADD CONSTRAINT fields_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


--
-- TOC entry 4904 (class 2606 OID 16575)
-- Name: harvests harvests_crop_cycle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.harvests
    ADD CONSTRAINT harvests_crop_cycle_id_fkey FOREIGN KEY (crop_cycle_id) REFERENCES public.crop_cycles(id) ON DELETE CASCADE;


--
-- TOC entry 4902 (class 2606 OID 16547)
-- Name: inputs inputs_activity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inputs
    ADD CONSTRAINT inputs_activity_id_fkey FOREIGN KEY (activity_id) REFERENCES public.activities(id) ON DELETE CASCADE;


--
-- TOC entry 4896 (class 2606 OID 16471)
-- Name: seasons seasons_farm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_farm_id_fkey FOREIGN KEY (farm_id) REFERENCES public.farms(id) ON DELETE CASCADE;


-- Completed on 2026-09-20 13:02:23

--
-- PostgreSQL database dump complete
--

\unrestrict IyyEsKpPdIqbB4N03f62sBMnMgmcCYbHz2uZvBTtuILvLWI6P7rdeoYNqMNRm7X

