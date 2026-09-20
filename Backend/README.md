# 🌾 KrishiGatha AI — Backend API

Node.js, Express, TypeScript, and Prisma ORM backend powering the **KrishiGatha AI** (AI-Powered Digital Farm History & Intelligence Platform).

---

## 🚀 Setup & Installation Instructions

### 1. Install Dependencies
Navigate into the `Backend` directory and install the required npm packages:
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Open `.env` and fill in your actual Supabase credentials and secret keys:
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your_super_secret_jwt_key_here
PORT=4000
CORS_ORIGIN=http://localhost:3000
```

### 3. Introspect Supabase PostgreSQL Schema
Pull the live schema from your Supabase PostgreSQL database into `prisma/schema.prisma`:
```bash
npx prisma db pull
```

### 4. Generate Prisma Client
Generate the TypeScript Prisma Client from the introspected schema:
```bash
npx prisma generate
```

### 5. Start the Development Server
Run the API development server with live reload:
```bash
npm run dev
```

The server will be available at: **`http://localhost:4000`**  
Health check endpoint: **`http://localhost:4000/api/health`**

---

## 🛠️ Build for Production

To compile TypeScript to JavaScript for production:
```bash
npm run build
npm start
```

---

## 📡 API Endpoint Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register farmer account (`name`, `email`, `password`, `phone`) | No |
| `POST` | `/api/auth/login` | Login and receive JWT access token | No |
| `GET` | `/api/auth/profile` | Get authenticated farmer profile | Yes |

### 🌾 Farm Management (`/api/farms`, `/api/fields`, `/api/crops`, `/api/seasons`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/farms` | List user's farms |
| `POST` | `/api/farms` | Create new farm |
| `PATCH` | `/api/farms/:id` | Update farm details |
| `GET` | `/api/fields` | List user's field parcels (optional `?farm_id=`) |
| `POST` | `/api/fields` | Create new field parcel |
| `PATCH` | `/api/fields/:id` | Update field parcel |
| `DELETE` | `/api/fields/:id` | Delete field parcel |
| `GET` | `/api/crops` | List crop catalog (Wheat, Rice, Sugarcane, Soybean, etc.) |
| `GET` | `/api/seasons` | List farm seasons (Rabi, Kharif, Summer) |
| `POST` | `/api/seasons` | Create new season |

### 🌱 Crop Cycles (`/api/crop-cycles`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/crop-cycles` | List crop cycles (filters: `field_id`, `crop_id`, `season_id`) |
| `POST` | `/api/crop-cycles` | Create crop cycle (`field_id`, `crop_id`, `season_id`, `variety`, etc.) |
| `PATCH` | `/api/crop-cycles/:id` | Update crop cycle |

### 📅 Activities & Timeline (`/api/activities`, `/api/activity-types`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/activity-types` | List standard agricultural activity types |
| `GET` | `/api/activities` | Query timeline activities with filters (`fieldId`, `cropId`, `seasonId`, `activityTypeId`, `searchQuery`, `startDate`, `endDate`) |
| `POST` | `/api/activities` | Log new activity. Atomically creates linked `input` and/or `expense` rows in the same transaction |
| `DELETE` | `/api/activities/:id` | Delete activity record |
| `GET` | `/api/activities/export` | Download filtered activities as a CSV file |

### 💰 Farm Inputs, Expenses & Harvests
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/inputs` | List agricultural inputs applied (seeds, fertilizers, pesticides) |
| `POST` | `/api/inputs` | Log input item |
| `GET` | `/api/expenses` | List farm operational expenses |
| `POST` | `/api/expenses` | Log expense |
| `GET` | `/api/harvests` | List crop harvest and yield sale records |
| `POST` | `/api/harvests` | Log harvest record |

### 📂 Document Vault & OCR Scanner (`/api/documents`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/documents` | List stored digital documents/receipts |
| `POST` | `/api/documents` | Upload document file with metadata (`multipart/form-data`) |
| `POST` | `/api/documents/scan` | AI Receipt OCR scanner: extracts `supplier`, `date`, `amount`, and `items` |

### 🤖 AI Farm Copilot (`/api/ai`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/query` | Ask natural language farm question (e.g. *"How much did I spend on fertilizers for Field A?"*). Returns answer, financial/yield summary metrics, and grounded evidence citations |
| `GET` | `/api/ai/history` | List historical AI queries with evidence citations |
