# 🌾 KrishiGatha AI — AI-Powered Digital Farm History & Intelligence Platform

> **Hackathon Submission**: AI-Powered Digital Farm History  
> **Database Engine**: PostgreSQL Schema (`digital_farm_history.sql`)  
> **Frontend Stack**: Vite, React 18, TypeScript, Tailwind CSS, Lucide Icons

---

## 🌟 Executive Summary

Farmers generate vast amounts of valuable agronomic records across every farming cycle—field preparation, sowing, irrigation, fertilizer dosages, pesticide applications, operational expenses, harvest quantities, and soil tests. Historically, these records were scattered across paper notebooks, paper bills, and WhatsApp chats.

**KrishiGatha AI** converts scattered farm logs into a **chronologically structured timeline** and provides a **natural-language AI Copilot** with **verifiable evidence traceability** directly grounded in underlying relational database records.

---

## 🚀 Key Features & Capabilities

### 1. 📅 Chronological Farm History & Interactive Timeline
- **Multi-View System**: Toggle between a visual chronological stream with category badges and a sortable data grid table.
- **Multi-Dimensional Filters**: Filter records by Field (Field A, Field B, Field C), Crop Cycle (Wheat, Soybean, Sugarcane), Season (Rabi 2025-26, Kharif 2025), and Activity Type.
- **CSV Data Export**: One-click download of all filtered farm logs for spreadsheets and agronomist reporting.

### 2. 🤖 AI Farm Copilot with Grounded Evidence Traceability
- **Natural Language Search**: Ask questions in plain English or Indian regional languages (e.g. *"How much did I spend on fertilizers for Field A in Rabi 2025-26?"*, *"What was our wheat yield and net profit?"*).
- **Zero-Hallucination Evidence Citations**: Every answer provides clickable citation cards citing exact activity IDs, dates, quantities, and scanned invoice proofs with confidence scores (e.g., `98% Match`).
- **Voice Query Simulation**: Built-in microphone support for farmer-friendly voice input.

### 3. 📂 Document Vault & Smart AI OCR Scanner
- **Digital Vault**: Stores paper receipts, fertilizer purchase bills, soil health cards, APMC mandi sale slips, and seed tags.
- **AI Bill OCR Scanner**: Upload or choose a sample bill -> the OCR engine extracts supplier, date, amount, items, and quantities -> 1-click import into activities, expenses, inputs, and documents.

### 4. 🗺️ Interactive Field Parcels & Visualizer
- Visual map cards for Field A (4.0 acres, Drip), Field B (3.5 acres, Canal), and Field C (3.0 acres, Sprinkler).
- Real-time crop stage, soil type metadata, and quick click-to-filter timeline drill-down.

### 5. 📊 Farm Financials & Yield Analytics
- Return on Investment (ROI) and Profit & Loss (P&L) per field and per crop cycle.
- Category-wise expense distribution (Machinery, Seeds, Fertilizer, Pesticide, Labour, Harvesting).
- Profit per Acre benchmarks.

### 6. 📜 Official Digital Farm Passport (PMFBY / Bank KCC Ready)
- Generates an official, printable **Digital Farm Passport & Compliance Dossier** complete with verification QR code, land parcel specs, crop ledger, and farmer certification.

### 7. 🌐 Multilingual Accessibility
- Instant localization across 6 languages: English, Hindi (हिंदी), Marathi (मराठी), Telugu (తెలుగు), Punjabi (ਪੰਜਾਬੀ), and Gujarati (ગુજરાતી).

---

## 🗄️ Database & Schema Alignment

The frontend is seeded from and aligned with [`Database/digital_farm_history.sql`](Database/digital_farm_history.sql):
- `users`: Farmer account & profile
- `farms`: Farm property & acreage
- `fields`: Field parcel coordinates, soil types & irrigation methods
- `crops`: Crop catalog (Wheat, Rice, Sugarcane, Soybean, Cotton)
- `seasons`: Rabi, Kharif, and Summer cycles
- `crop_cycles`: Variety, sowing dates, status
- `activity_types`: Ploughing, Sowing, Irrigation, Fertilization, Pesticide, Weeding, Harvesting
- `activities`: Timestamped operational field logs
- `inputs`: Commercial materials applied (seeds, NPK fertilizers, chemicals)
- `expenses`: Category-coded farm costs & payment modes
- `harvests`: Quantities, quality grades, buyer, and total revenue
- `documents`: Digitized bills, soil cards, mandi slips, OCR text
- `ai_queries` & `ai_evidence`: Logged farmer questions, generated answers, and relevance scores

---

## 🛠️ Running Locally

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```