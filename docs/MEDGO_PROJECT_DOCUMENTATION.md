# MedGo – B2B Pharmaceutical Marketplace
## Comprehensive System & Technical Architecture Documentation

---

### Document Control & Metadata
- **Project Name:** MedGo (Package: `medsupply-bd`)
- **Version:** 2.0.0-PROD-RELEASE
- **Document Status:** Complete / Technical Handover Ready
- **Target Runtime:** Next.js 14.2.15 (App Router), TypeScript 5.6.3, Node.js 20+, Prisma ORM 5.21.1, Tailwind CSS 3.4.14, Capacitor 8.5.3 (Android / iOS)
- **Repository:** `https://github.com/limon4reza000/medSupportBD` (Branch: `main`)
- **Lead Full-Stack Architect:** Limon Reza (Student ID: 232-35-004)
- **AI & Systems Engineer:** Md Mehedi Hasan (Student ID: 232-35-712)
- **Institution:** Department of Computer Science and Engineering, Academic Year 2026–2027
- **Date:** November 2026

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Project Overview and Background](#2-project-overview-and-background)
3. [Problem Statement and Objectives](#3-problem-statement-and-objectives)
4. [Project Scope & AI Boundaries](#4-project-scope--ai-boundaries)
5. [System Architecture](#5-system-architecture)
6. [Technology Stack](#6-technology-stack)
7. [User Roles and Permissions (6-Role RBAC)](#7-user-roles-and-permissions-6-role-rbac)
8. [Core Features and Functional Modules](#8-core-features-and-functional-modules)
9. [Business Logic & Core Application Workflows](#9-business-logic--core-application-workflows)
10. [UI/UX Design, Ergonomics & Navigation](#10-uiux-design-ergonomics--navigation)
11. [Database Design, Schema & Entity-Relationship Model](#11-database-design-schema--entity-relationship-model)
12. [API Endpoints & Integration Reference](#12-api-endpoints--integration-reference)
13. [Authentication, Compliance & Security](#13-authentication-compliance--security)
14. [Project Directory & File Structure](#14-project-directory--file-structure)
15. [Current Development Progress & Feature Matrix](#15-current-development-progress--feature-matrix)
16. [Installation, Configuration & Setup Guide](#16-installation-configuration--setup-guide)
17. [Testing, Quality Assurance & Verification Protocols](#17-testing-quality-assurance--verification-protocols)
18. [Deployment & Infrastructure Requirements](#18-deployment--infrastructure-requirements)
19. [Known Issues, Technical Debt & Limitations](#19-known-issues-technical-debt--limitations)
20. [Future Development Roadmap](#20-future-development-roadmap)
21. [Project Team Details & Responsibilities](#21-project-team-details--responsibilities)

---

## 1. Executive Summary

**MedGo** (also established in system specifications as **MedSupply BD**) is an enterprise-grade, mobile-first B2B pharmaceutical marketplace and supply chain distribution platform specifically engineered for Bangladesh's pharmaceutical wholesale ecosystem.

The platform digitizes the multi-billion-dollar distribution pipeline connecting 45+ premier pharmaceutical manufacturers (e.g., Square Pharmaceuticals PLC, Beximco Pharmaceuticals Ltd., Incepta, Renata, Opsonin), authorized regional distribution depots, thousands of field Medical Promotion Officers (MPOs), and more than 150,000 retail community pharmacies and chemist shops across Bangladesh.

MedGo eliminates manual order transcription ("evening order cutting"), arbitrary batch selection, un-reconciled credit risk, and warehouse expiry write-offs. It enforces strict compliance with the **Directorate General of Drug Administration (DGDA)** and the **National Board of Revenue (NBR)** by introducing:
1. Dynamic packaging arithmetic ($\text{Box} \to \text{Strip} \to \text{Piece}$).
2. Automated Near-Expiry First-In, First-Out (FIFO) batch allocation.
3. Multi-company unified checkout with atomic order decomposition and company-segregated legal Delivery Challans.
4. Pre-checkout financial credit ceiling enforcement backed by an immutable double-entry ledger.
5. Automated generation of NBR Mushak-6.3 commercial tax invoices.
6. A responsive, mobile-first Progressive Web App (PWA) with native Android/iOS integration via Capacitor.

The codebase currently contains **40 Next.js REST API route handlers**, **65+ React UI components**, **5 core backend business engines**, **14 automated master integration test suites**, and **8 dedicated dashboard functional verification suites**, all passing with a 100% assertion success rate.

---

## 2. Project Overview and Background

### 2.1 Industrial Context
The pharmaceutical sector in Bangladesh is valued at over \$3.5 billion USD, satisfying approximately 98% of domestic medicinal demand while exporting to over 150 countries. Despite modern manufacturing facilities adhering to WHO-cGMP, US FDA, and UK MHRA standards, the downstream distribution network relies heavily on legacy, fragmented practices:
- **Field Sales Memos:** MPOs physically visit retail pharmacies, taking orders in carbon-copy paper notebooks or WhatsApp messages.
- **Evening Order Cutting Frenzy:** Depots experience severe order-intake bottlenecks between 6:00 PM and 9:00 PM, where billing clerks manually key in thousands of poorly written doctor memos into legacy standalone software.
- **Arbitrary Batch Picking:** Warehouse staff pick stock arbitrarily rather than tracking earliest expiring batches, causing up to 3% to 6% annual inventory write-offs.
- **Credit Default Risk:** Delayed weekly ledgers obscure outstanding credit balances, resulting in cash flow crunches and bad debts.

### 2.2 MedGo Value Proposition
MedGo provides a cloud-native, real-time operating system for pharmaceutical commerce:
- **For Retail Pharmacies:** Instant access to 41,300+ DGDA-certified SKUs, trade schemes (e.g. 10+1 free bonus boxes), guaranteed fresh batches, transparent credit ledgers, and emergency stock borrowing between neighboring pharmacies.
- **For Manufacturers & Depots:** Automated order routing, zero transcription errors, optimistic stock reservation locks, batch traceability, and instant payment settlement via digital channels (bKash, Nagad, Bank Transfer).
- **For Field MPOs:** Mobile terminal for instantaneous order cutting, territory-bound commission tracking, real-time depot stock visibility, and AI-assisted handwritten prescription memo parsing.

---

## 3. Problem Statement and Objectives

### 3.1 Problem Statement
The downstream pharmaceutical supply chain in Bangladesh is constrained by four fundamental structural failures:
1. **Manual Order Cutting Latency:** Processing paper memos creates a 24 to 48-hour fulfillment delay between prescription order collection and pharmacy delivery.
2. **Expired Warehouse Stock Losses:** Without automated batch allocation, older batches linger in depots until they reach expiry, violating DGDA Good Distribution Practices (GDP).
3. **Credit Ceiling Overrides:** Lack of real-time transactional credit limits leads to unauthorized credit extensions and uncontrollable outstanding balances.
4. **Multi-Vendor Challan Segregation Mandate:** Under Bangladesh pharmaceutical law, drugs from distinct manufacturers cannot be consolidated into a single legal challan or dispatched from the same warehouse. Multi-company purchasing requires complex, error-prone manual order splitting.

### 3.2 System Objectives
- **Operational Objective:** Eliminate manual order transcription by automating order intake via mobile catalog browsing, barcode scanning, and computer-vision prescription parsing.
- **Algorithmic Objective:** Implement automated Near-Expiry FIFO batch allocation with automated multi-batch splitting, 90-day buffer warnings, and 30-day lockout safeguards.
- **Financial Objective:** Provide atomic pre-checkout credit validation preventing order placement when $\text{Current Balance} + \text{Order Total} > \text{Credit Limit}$, recorded via an immutable double-entry ledger.
- **Regulatory Objective:** Generate separate manufacturer-specific orders, official Delivery Challans, and NBR Mushak-6.3 tax invoices automatically upon checkout.
- **Performance Objective:** Maintain sub-100ms API response times across catalog discovery, sub-1.2s atomic checkout execution, and 100% test assertion coverage.

---

## 4. Project Scope & AI Boundaries

### 4.1 In-Scope Capabilities
- **National Pharmaceutical Catalog:** Indexed catalog of 41,300+ SKUs across 45+ manufacturers.
- **Multi-Tier Packaging Arithmetic:** Deterministic conversions across $\text{Box} \to \text{Strip} \to \text{Piece}$ with trade scheme calculations (Buy X Get Y Free, percentage slab discounts).
- **Near-Expiry FIFO Batch Allocation:** Dynamic batch routing based on `expiryDate ASC`.
- **Pre-Checkout Credit Risk Gating:** Real-time credit validation and double-entry transaction ledgers (`INVOICE_DEBIT`, `PAYMENT_CREDIT`, `RETURN_CREDIT`).
- **Atomic Multi-Company Checkout:** Distributed checkout decomposing unified carts into company-specific orders.
- **Commercial Invoicing & Challan Generation:** Automated NBR Mushak-6.3 tax invoice generation and PDF exports.
- **Pharmacy Stockroom Inventory:** Local pharmacy stock management with Stock In/Out tracking and negative inventory guards.
- **DGDA Return Claims Management:** Multi-status return workflows with MPO review and automatic credit adjustments.
- **Live Courier Tracking:** GPS coordinates, speed, heading, and delivery vehicle dispatch status.
- **Emergency Stock Borrowing:** Community pharmacy peer-to-peer medicine requests.

### 4.2 Out-of-Scope Capabilities
- Direct-to-Consumer (B2C) retail medicine sales and home delivery to patients.
- Robotic automated warehouse conveyor automation.
- Primary chemical drug discovery and clinical trial management.

### 4.3 AI Boundaries
```
+--------------------------------------------------------------------------+
|                            MEDGO AI BOUNDARIES                           |
+--------------------------------------------------------------------------+
| WHAT AI DOES:                                                            |
|  - Ingests scanned handwritten doctor slips and clinic memos.             |
|  - Normalizes noisy medical abbreviations ("Tab", "Cap", "10+1", "TDS"). |
|  - Matches extracted medicine strings against 41,300+ DGDA brand names.  |
|  - Forecasts 30-day replenishment with epidemic multipliers (e.g. Dengue).|
|  - Recommends chemically identical generic alternatives for depleted SKUs.|
+--------------------------------------------------------------------------+
| WHAT AI DOES NOT DO:                                                     |
|  - Makes unilateral clinical diagnoses or medical treatment prescriptions|
|  - Alters prescribed dosages or drug formulations.                       |
|  - Overrides depot finance credit ceilings or financial limits.           |
+--------------------------------------------------------------------------+
```

---

## 5. System Architecture

MedGo follows a decoupled, multi-tier modern cloud architecture utilizing Next.js 14 App Router, TypeScript, and Prisma ORM:

```mermaid
flowchart TD
    subgraph ClientTier ["Presentation Tier (Mobile-First / PWA / Native)"]
        UI_Mobile["Mobile PWA Viewport (360px - 440px)"]
        UI_Desktop["Desktop Dashboard (1280px+)"]
        UI_Capacitor["Native Android / iOS (Capacitor Bridge)"]
    end

    subgraph ApiTier ["Application & API Tier (Next.js 14 Route Handlers)"]
        AUTH_API["/api/auth (OTP, RBAC, Sessions)"]
        CATALOG_API["/api/medicines & /api/brands"]
        ORDER_API["/api/orders & /api/orders/checkout"]
        CREDIT_API["/api/credit & /api/credit/pay"]
        INVOICE_API["/api/invoices"]
        STOCK_API["/api/stock-status & /api/pharmacy/inventory"]
        RETURNS_API["/api/returns & review"]
        AI_API["/api/ai (Slip Parser, Forecast, Alternatives)"]
    end

    subgraph EngineTier ["Domain Business Engines (services/)"]
        ENG_PKG["Packaging & Trade Bonus Engine"]
        ENG_FIFO["Near-Expiry FIFO Batch Engine"]
        ENG_LOCK["Stock Lock & Concurrency Engine (TTL 180s)"]
        ENG_CREDIT["Credit Risk & Double-Entry Ledger Engine"]
        ENG_GEO["Geo-Routing & Depot Allocation Engine"]
    end

    subgraph DataTier ["Persistence & Storage Layer"]
        PRISMA["Prisma ORM 5.21.1 (MySQL / PostgreSQL Driver)"]
        MOCK_DB["In-Memory Database Engine (MemoryDatabase Singleton)"]
        DATASET["DGDA Master Catalog (23MB JSON / 41,300+ SKUs)"]
    end

    ClientTier --> ApiTier
    ApiTier --> EngineTier
    EngineTier --> DataTier
```

### 5.1 Presentation Tier
- Built on React 18 and Next.js 14 App Router with Tailwind CSS.
- Mobile-first container ergonomics (`max-w-[440px]` mobile view with desktop frame wrapper).
- Real-time client hydration, Lucide icons, glassmorphic tooltips, and interactive SVG charts.

### 5.2 Application & API Tier
- Encapsulated within `app/api/` using Next.js Route Handlers.
- Strict input validation using Zod schemas.
- Role-Based Access Control (RBAC) middleware verifying session tokens and tenant boundaries.

### 5.3 Domain Business Engine Tier (`services/`)
- `packagingEngine.ts`: Unit conversions and trade scheme bonus calculations.
- `batchFifoEngine.ts`: Expiry date sorting and multi-batch stock allocation.
- `stockLockEngine.ts`: Optimistic concurrency control and stock reservation locks with a 180-second TTL.
- `creditLedgerEngine.ts`: Pre-checkout balance checks and double-entry ledger bookkeeping.
- `geoRoutingEngine.ts`: Haversine geographic depot coverage and delivery vehicle dispatch.

### 5.4 Data Persistence Tier
- **Prisma ORM:** Production schema mapped to relational tables with foreign keys and composite indexes.
- **In-Memory High-Velocity DB:** Singleton `MemoryDatabase` in `lib/mockDb.ts` loading the 23MB DGDA dataset (`lib/data/medicineDataset.json`) with sub-5ms indexed lookups.

---

## 6. Technology Stack

| Layer | Technology | Version | Purpose in MedGo |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js | `14.2.15` | Full-stack framework (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript | `5.6.3` | Strict static typing, interfaces, and domain entity models |
| **UI Library** | React | `18.3.1` | Component architecture, state hooks, and client hydration |
| **Styling** | Tailwind CSS | `3.4.14` | Utility-first responsive styling and healthcare color system |
| **PostCSS** | Autoprefixer / PostCSS | `8.4.47` | CSS vendor prefixing and modern syntax compilation |
| **Icons** | Lucide React | `0.453.0` | Comprehensive icon set for medical, financial, and cart UI |
| **Database ORM** | Prisma Client & CLI | `5.21.1` | Relational database modeling, migrations, and query generation |
| **Relational DB** | MySQL / PostgreSQL | `8.0+ / 15+` | Primary relational persistent database |
| **Validation** | Zod | `3.23.8` | Runtime schema validation for API payloads and OCR outputs |
| **Mapping & GIS** | Leaflet & `@types/leaflet` | `1.9.4` | Depot geolocation, delivery vehicle route simulation, and coverage maps |
| **Mobile Runtime** | Capacitor (Core/Android/iOS)| `8.5.3` | Cross-platform native bridge for compiling Android APK and iOS apps |
| **Embedded DB** | sql.js | `1.14.2` | WebAssembly-powered embedded SQLite querying for client-side search |
| **Utility** | `clsx`, `tailwind-merge` | `2.1.1` | Conditional className resolution |

---

## 7. User Roles and Permissions (6-Role RBAC)

MedGo enforces a 6-Role Role-Based Access Control (RBAC) model with strict tenant isolation:

```mermaid
classDiagram
    class UserRole {
        <<enumeration>>
        SUPER_ADMIN
        PHARMA_COMPANY_ADMIN
        DEPOT_MANAGER
        MPO_SALES_REP
        PHARMACY_OWNER
        RETAIL_PHARMACY_STAFF
    }
```

### 7.1 Role Privilege Matrix

| Permission / Capability | SUPER_ADMIN | PHARMA_COMPANY_ADMIN | DEPOT_MANAGER | MPO_SALES_REP | PHARMACY_OWNER | RETAIL_PHARMACY_STAFF |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Global System Audit & Users** | Yes | No | No | No | No | No |
| **Manage Company Catalog & Prices**| Yes | Yes | No | No | No | No |
| **View Depot Inventory & Batches** | Yes | Company Only | Assigned Depot| Regional View | No | No |
| **Dispatch Orders & Vehicles** | Yes | No | Assigned Depot| No | No | No |
| **Cut Orders for Pharmacies** | Yes | No | No | Assigned Route| Yes | Yes |
| **Approve / Reject Return Claims** | Yes | Company Only | Assigned Depot| Review Only | No | No |
| **View Financial Ledger & Credit** | Yes | Company Only | Depot Total | No | Full Account | No |
| **Make Payments / Settle Dues** | Yes | No | No | No | Yes | No |
| **Adjust Pharmacy Physical Stock** | No | No | No | No | Yes | Yes |

### 7.2 Multi-Tenant Isolation
- **Manufacturer Boundaries:** A Beximco MPO querying `/api/orders` cannot view Square or Incepta orders (enforced by HTTP 403 `TENANT_ISOLATION_VIOLATION`).
- **Pharmacy Boundaries:** Pharmacy staff accounts cannot access credit limit adjustment, payment ledgers, or pharmacy bank settlement details.

---

## 8. Core Features and Functional Modules

### Feature A: Dashboard & Real-Time Analytics
- **Live KPI Overview Cards:** Total Purchase Spend (৳), Total Orders Count, Pending Approvals, and Outstanding Credit Balance with progress bar.
- **12-Month Purchase Bar Chart:** Monthly procurement expenditure comparison with dynamic category breakdown.
- **Performance Trend Line Chart:** Dual-series comparison tracking purchase spend against retail sales velocity.
- **Multi-Dimensional Filters:** Filter statistics by period (`daily`, `weekly`, `monthly`, `quarterly`, `yearly`), pharmaceutical company, or specific therapeutic class.

### Feature B: Place Order & Multi-Company Decomposition
- **Medicine Catalog Discovery:** Virtualized infinite-scroll list indexing 41,300+ SKUs with real-time search (<50ms).
- **Packaging Hierarchy Breakdown:** Interactive selection between Box, Strip, and Piece with dynamic Chemist Margin calculator ($(\text{MRP} - \text{TP}) / \text{MRP} \times 100$).
- **Multi-Company Split Checkout:** Automatically decomposes unified carts into independent, company-specific orders with separate Delivery Challans.
- **Optimistic Stock Locking:** Secures stock for 180 seconds during checkout to eliminate double-allocation race conditions.

### Feature C: Promotional Trade Offers Hub
- **Scheme Types:** Buy X Get Y Free ($10+1$ bonus box), percentage slab discounts (e.g. 5% off on $\ge 50$ strips), and cash trade rebates.
- **Eligibility Validation:** Real-time calculation of free bonus units and net payable deductions.
- **One-Click Cart Claim:** Direct addition of qualified promotion packages to cart.

### Feature D: Company Depot Stock Status
- **Depot Inventory Transparency:** Live stock availability across Square, Beximco, Incepta, Renata, and Opsonin central warehouses.
- **Batch Expiry Visibility:** Displays batch numbers and earliest expiration dates (`YYYY-MM-DD`).
- **Health Indicators:** High Stock (>15 boxes), Low Stock (1–15 boxes), and Out of Stock (0 boxes).

### Feature E: Order Lifecycle Management
- **5-Stage Order Progression:**
  $$\text{PENDING} \longrightarrow \text{CONFIRMED} \longrightarrow \text{PROCESSING} \longrightarrow \text{DISPATCHED} \longrightarrow \text{DELIVERED}$$
- **Cancellation & Refunds:** Real-time cancellation prior to dispatch with automated credit balance restoration.
- **Delivery Intake:** Single-click receipt intake automatically restocking the pharmacy's physical stockroom.

### Feature F: B2B Price List & Export
- **Catalog Price Table:** Comprehensive listing of Trade Price (TP), Maximum Retail Price (MRP), VAT (2.4%), and chemist margins.
- **Export Options:** Printable PDF view and RFC-4180 compliant CSV export for external ERP integration.

### Feature G: Wholesale Credit Facility & Dues Settlement
- **Credit Dashboard:** Visual utilization meter showing Total Credit Limit, Used Credit, and Available Credit Headroom.
- **Company Credit Allocations:** Company-specific credit partitions and payment terms.
- **Instant Settlement:** Integrated dues clearance supporting bKash, Nagad, and Bank Cheque with ledger generation.

### Feature H: Commercial Invoices & NBR Mushak-6.3
- **Challan & Tax Invoices:** Automatic generation upon checkout complying with National Board of Revenue (NBR) Form Mushak-6.3.
- **Financial Statuses:** `UNPAID`, `PARTIALLY_PAID`, `PAID`, `OVERDUE`.
- **Downloadable Challan:** Printable tax invoice view with legal declarations and QR verification placeholders.

### Feature I: Pharmacy Physical Stockroom & Movements
- **SKU Management:** Tracks pharmacy-owned physical inventory with batch numbers, cost prices, and expiry dates.
- **Stock Movement Audit:** Audited adjustments (`MANUAL_IN`, `POS_SALE`, `RETURN_OUT`, `SPOILAGE_DISPOSAL`).
- **Safety Validations:** Hard server-side rejection of negative inventory adjustments (HTTP 422).

### Feature J: DGDA Return Claims & Review
- **Claim Submission:** Submission of returns for expired, damaged, or recalled drugs with batch selection and photo attachments.
- **MPO Approval Flow:** MPO review simulation granting instant `RETURN_CREDIT` balance deductions.

### Supplementary Modules:
- **AI Vision Prescription Parser:** Ingests clinic slips and extracts medicine names, packaging units, and quantities with confidence scoring.
- **AI Demand Forecaster:** Calculates 30-day replenishment orders incorporating monsoon Dengue outbreak surge multipliers.
- **Generic Alternatives Finder:** Retrieves bioequivalent therapeutic substitutes when a brand is out of stock.
- **Live Courier Tracking:** Simulates depot-to-pharmacy van transit with GPS latitude/longitude, speed, and heading.
- **Emergency Stock Borrowing:** Peer-to-peer stock loans between neighboring pharmacies.

---

## 9. Business Logic & Core Application Workflows

### 9.1 Multi-Company Checkout & Order Decomposition Protocol

```mermaid
sequenceDiagram
    autonumber
    actor Chemist as Pharmacy Chemist
    participant API as /api/orders/checkout
    participant Lock as StockLockEngine
    participant FIFO as BatchFifoEngine
    participant Credit as CreditLedgerEngine
    participant DB as Relational Database
    participant MPO as MPO / Depot Dispatch

    Chemist->>API: Submit Multi-Company Cart (Beximco + Square items)
    API->>API: Verify Pharmacy DGDA Drug License & Idempotency
    API->>API: Partition Cart into Company Clusters [C_Beximco, C_Square]
    
    loop For Each Company Cluster
        API->>Lock: Acquire Optimistic Stock Locks (TTL 180s)
        Lock-->>API: Lock Tokens Granted
        API->>FIFO: Allocate Batches by Earliest Expiry (expiryDate ASC)
        FIFO-->>API: Allocation Matrix (Batch IDs, loose pieces)
        API->>Credit: Validate Credit Limit (Balance + OrderTotal <= Limit)
        Credit-->>API: Credit Approved
    end

    alt Any Cluster Validation Fails
        API->>Lock: Release All Acquired Locks (Compensating Rollback)
        API-->>Chemist: HTTP 422 (Specific SKU / Insufficient Credit Error)
    else All Clusters Pass Pre-Commit Gates
        API->>DB: Begin Atomic Database Transaction
        DB->>DB: Insert Order ORD-...-BEX + ORD-...-SQU
        DB->>DB: Insert OrderItems & BatchAllocations
        DB->>DB: Insert Mushak-6.3 Invoices (INV-...-BEX, INV-...-SQU)
        DB->>DB: Deduct Depot Batch Physical Loose Units
        DB->>DB: Post INVOICE_DEBIT to Company Credit Ledgers
        DB->>DB: Clear Purchased Items from Chemist Cart
        DB-->>API: Transaction Committed
        API->>MPO: Dispatch Async SMS & Push Notifications
        API-->>Chemist: HTTP 201 Success (Split Orders & Invoice References)
    end
```

### 9.2 Packaging Arithmetic & Unit Decomposition
The packaging engine standardizes every medicine into atomic loose units (tablets, capsules, vials) before inventory deduction:
$$\text{Total Loose Pieces} = (\text{Boxes} \times \text{StripsPerBox} \times \text{PiecesPerStrip}) + (\text{Strips} \times \text{PiecesPerStrip}) + \text{Pieces}$$

### 9.3 Near-Expiry FIFO Batch Allocation
1. Batches with $\le 30$ days remaining shelf-life are locked out from normal dispatch.
2. Batches with $\le 90$ days remaining trigger `isNearExpiry: true` warnings.
3. Batches are sorted strictly by `expiryDate ASC`. If an order requires more units than the oldest batch contains, the engine automatically splits the requirement across subsequent batches.

### 9.4 Pre-Checkout Credit Risk Gating
Before any order commit:
$$\text{Projected Balance} = \text{Current Outstanding Balance} + \text{Order Net Total}$$
$$\text{If Projected Balance} > \text{Assigned Credit Limit} \implies \text{REJECT (HTTP 422)}$$

---

## 10. UI/UX Design, Ergonomics & Navigation

### 10.1 Visual Design Identity
- **Primary Color:** Medical Emerald (`#025540`, `#04624B`, `#139485`)
- **Accent Color:** High-Trust Blue (`#205493`, `#3B82F6`)
- **Backgrounds:** Clean Crisp Light Blue / Off-White (`#F8FAFC`, `#FFFFFF`)
- **Borders & Dividers:** Subtle Slate (`#E2E8F0`, `#CBD5E1`)
- **Typography:** Modern Sans-Serif (`Inter`, `Open Sans`, system-ui)

### 10.2 Navigation Architecture
MedGo preserves a strict 5-tab native mobile bottom navigation bar:
1. **Home (`DASHBOARD`):** KPI cards, procurement charts, and quick-action launcher.
2. **Explore (`MEDICINES`):** Searchable medicine catalog, brand filters, and stock status.
3. **Borrow (`BORROW`):** Elevated emerald centerpiece action button for emergency peer borrowing.
4. **Cart (`CART`):** Company-segregated cart with minimum order value indicators and checkout.
5. **Profile (`PROFILE`):** Pharmacy DGDA compliance details, credit progress meter, and session controls.

### 10.3 Mobile Drawer Menu & Quick Actions
Accessed via the hamburger icon on the top header bar:
- **Inventory Stockroom:** Direct access to pharmacy shelf stock and adjustment drawer.
- **Order Lifecycle:** Full order status tracker with active delivery filters.
- **Invoices & Dues:** NBR Mushak-6.3 tax invoice downloads and bKash dues settlement.
- **Returns Claim Manager:** Filing and tracking damaged/expired stock claims.
- **Price List:** B2B wholesale prices with PDF/CSV export.
- **Distributor Map & Live GPS:** Interactive Leaflet GIS map showing regional depot locations and courier tracking.

---

## 11. Database Design, Schema & Entity-Relationship Model

```mermaid
erDiagram
    User ||--o{ Order : places
    User ||--o{ Depot : manages
    User ||--o{ Pharmacy : assigned_mpo
    Depot ||--o{ Batch : stores
    Depot ||--o{ Order : fulfills
    Depot ||--o{ DeliveryVehicle : operates
    Pharmacy ||--o{ Order : submits
    Pharmacy ||--o{ LedgerTransaction : owes
    Pharmacy ||--o{ Invoice : billed
    Pharmacy ||--o{ PharmacyStock : holds
    Pharmacy ||--o{ ReturnRequest : claims
    Medicine ||--o{ Batch : partitioned_into
    Medicine ||--o{ TradeOffer : discounted_by
    Medicine ||--o{ OrderItem : specified_in
    Medicine ||--o{ PharmacyStock : cataloged_as
    Order ||--o{ OrderItem : contains
    Order ||--o{ OrderStatusHistory : tracks
    Order ||--o{ Invoice : generates
    Order ||--o{ ReturnRequest : returned_under
    OrderItem ||--o{ BatchAllocation : draws_from
    Batch ||--o{ BatchAllocation : supplies
    PharmacyStock ||--o{ StockMovement : audited_by
    ReturnRequest ||--o{ ReturnItem : lists
```

### 11.1 Key Database Entities & Relationships
1. **`User`:** System accounts supporting `ADMIN`, `DEPOT_MANAGER`, `SALES_REP` (MPO), and `PHARMACY_OWNER`.
2. **`Depot`:** Regional distribution centers with verified GPS coordinates, district coverage, operating hours, and minimum order values.
3. **`Pharmacy`:** Retail chemist shops with DGDA drug licenses, trade names, verified coordinates, credit limits, and balances.
4. **`Medicine`:** Master pharmaceutical items with packaging hierarchy (`piecesPerStrip`, `stripsPerBox`), MRP, Trade Price, and VAT.
5. **`Batch`:** Physical inventory lots with unique batch numbers, manufacturing dates, and expiration dates.
6. **`Order` & `OrderItem`:** Commercial wholesale orders partitioned by depot and company with gross, discount, VAT, and net amounts.
7. **`BatchAllocation`:** Exact loose-unit mapping linking order items to specific warehouse batches for FEFO tracking.
8. **`Invoice`:** Commercial tax invoices adhering to NBR Mushak-6.3 standards.
9. **`LedgerTransaction`:** Immutable double-entry financial records tracking debits, payments, and return credits.
10. **`PharmacyStock` & `StockMovement`:** Local pharmacy physical stockroom inventory and auditable movement logs.
11. **`ReturnRequest` & `ReturnItem`:** Return claims with status tracking (`SUBMITTED`, `UNDER_REVIEW`, `APPROVED`, `REJECTED`, `CREDITED`).
12. **`StockReservation`:** Optimistic concurrency locks with token, quantity, and expiration TTL.
13. **`DemandForecast`:** AI-generated 30-day consumption predictions and seasonal outbreak multipliers.

---

## 12. API Endpoints & Integration Reference

MedGo provides a comprehensive REST API suite under Next.js Route Handlers (`app/api/`):

### 12.1 Authentication & Session Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/otp` | Dispatches 6-digit verification code with rate limiting | Public |
| `POST` | `/api/auth/login` | Validates OTP / password and issues `mgtok_...` session cookie | Public |
| `GET` | `/api/auth/me` | Returns active user profile, assigned pharmacy, and role permissions | Authenticated |
| `POST` | `/api/auth/logout` | Revokes session token and clears HTTP-only authentication cookie | Authenticated |
| `GET` | `/api/auth/permissions`| Returns granular boolean permissions for active session | Authenticated |
| `POST` | `/api/auth/register` | Multi-step role registration with DGDA license and location upload | Public |

### 12.2 Catalog, Search & Brand Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/medicines` | Multi-attribute search (brand, generic, manufacturer, dosage) | Public / Chemist |
| `GET` | `/api/medicines/[medicineId]` | Enriched medicine details, packaging breakdown, and batches | Public / Chemist |
| `GET` | `/api/brands` | Directory of 45+ manufacturers and top popular brand SKUs | Public |
| `GET` | `/api/companies` | List of registered pharmaceutical companies and support contacts | Public |
| `GET` | `/api/companies/[companyId]/depots` | Regional distribution depots operated by a specific company | Public |
| `GET` | `/api/offers` | Active promotional trade schemes (10+1 bonus, slab discounts) | Chemist / MPO |
| `GET` | `/api/price-list` | Complete wholesale price list with PDF layout and CSV export | Chemist / MPO |

### 12.3 Cart, Orders & Order Cutting Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Retrieves persistent server-side cart for the active pharmacy | Pharmacy Owner |
| `POST` | `/api/cart` | Adds items to cart with packaging unit and quantity | Pharmacy Owner |
| `POST` | `/api/cart/sync` | Batch synchronizes local storage cart with server state | Pharmacy Owner |
| `POST` | `/api/orders/checkout/validate` | Dry-run validation of stock, credit, and minimum order values | Pharmacy Owner |
| `POST` | `/api/orders/checkout` | Executes atomic multi-company split checkout and invoice creation | Pharmacy Owner |
| `GET` | `/api/orders` | Retrieves order history with company and status filters | Chemist / MPO |
| `GET` | `/api/orders/[id]` | Full order detail view, batch allocations, and timeline | Chemist / MPO |
| `PATCH` | `/api/orders/[id]` | Updates status (`DELIVERED` with stock intake, or `CANCELLED`) | Chemist / Depot |

### 12.4 Stock, Inventory & Depot GIS Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/stock-status` | Manufacturer warehouse stock availability, boxes, and expiries | Chemist / MPO |
| `GET` | `/api/pharmacy/inventory` | Pharmacy-owned stockroom SKUs, quantities, and cost prices | Pharmacy Owner |
| `POST` | `/api/pharmacy/inventory/adjust` | Audited stock adjustment (`MANUAL_IN`, `SPOILAGE_DISPOSAL`) | Pharmacy Owner |
| `GET` | `/api/distributors/nearby` | Geospatial Haversine calculation of nearby regional depots | Public / Chemist |
| `GET` | `/api/distributors/live-tracking` | Real-time GPS coordinates, heading, and speed of delivery vans | Chemist / Depot |
| `GET` | `/api/distributors/route` | Simulated GIS polyline coordinates between depot and pharmacy | Chemist / Depot |
| `GET` | `/api/distributors/[id]/inventory` | Real-time batch-level inventory for a specific depot | Authenticated |

### 12.5 Financial Ledgers, Invoices & Returns Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/credit` | Credit limit utilization, balance, and company-wise allocations | Pharmacy Owner |
| `POST` | `/api/credit/pay` | Processes dues settlement via bKash/Nagad/Bank with ledger debit | Pharmacy Owner |
| `GET` | `/api/invoices` | Commercial tax invoices list with payment status filters | Pharmacy Owner |
| `GET` | `/api/invoices/[id]` | Detailed NBR Mushak-6.3 tax invoice view and PDF layout | Pharmacy Owner |
| `POST` | `/api/invoices/[id]/pay` | Settles specific invoice balance and updates status to `PAID` | Pharmacy Owner |
| `GET` | `/api/ledger` | Running audit trail of all financial debits and credits | Pharmacy Owner |
| `GET` | `/api/returns` | List of return claims filed by the pharmacy | Chemist / MPO |
| `POST` | `/api/returns` | Files a new return request with medicines, batches, and reasons | Pharmacy Owner |
| `PATCH` | `/api/returns/[id]/review` | MPO / Depot review endpoint approving/rejecting return claims | MPO / Depot |

### 12.6 Intelligence & AI Services Endpoints
| Method | Endpoint Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/ai/slip-parser` | Vision parser extracting medicine line items from doctor slips | Chemist / MPO |
| `GET` | `/api/ai/forecast` | 30-day demand predictions with Dengue seasonal multipliers | Chemist / Depot |
| `GET` | `/api/ai/alternatives` | Bioequivalent chemical substitutes for depleted SKUs | Public / Chemist |

---

## 13. Authentication, Compliance & Security

### 13.1 Authentication Architecture
- **Passwordless Mobile OTP:** Mobile-first verification tailored to Bangladeshi field realities. Dispatches a 6-digit OTP with a 60-second cooldown timer and carrier detection (Grameenphone, Banglalink, Robi, Airtel, Teletalk).
- **Session Tokens:** Issues high-entropy, encrypted session tokens prefixed with `mgtok_...`, stored in HTTP-only, SameSite cookies.
- **Brute-Force & Lockout Guardrails:** Enforces account lockouts (HTTP 429) after 5 failed verification attempts within 15 minutes.

### 13.2 Regulatory Compliance (DGDA & NBR)
1. **DGDA Drug Licensing:** Orders cannot be placed by accounts without verified DGDA Drug License numbers in sanctioned formats (`DL-DHK-2024-XXXX`, `DGDA-PH-XXXX`, or `DA-XXXX`).
2. **Statutory Chemist Margins:** Enforces official trade pricing structures where retail chemist margins are maintained at standard rates.
3. **NBR Mushak-6.3 Tax Invoicing:** Every commercial invoice includes legal company trade license numbers, BIN, depot challan numbers, itemized 2.4% pharmaceutical VAT calculations, and chemist delivery signatures.

### 13.3 Data Privacy & Edge Sanitization
- Clinic memo and prescription images processed via the AI slip parser undergo edge sanitization, scrubbing patient names and phone numbers prior to LLM entity extraction.
- Strict input sanitization via Zod prevents SQL/NoSQL injection across all search and transaction endpoints.

---

## 14. Project Directory & File Structure

```
c:\Projects\New folder\new\MedSupplyBD
├── android/                        # Capacitor Android native studio project
│   ├── app/                        # Android application source & Gradle configurations
│   ├── build.gradle                # Top-level Gradle build script
│   └── gradlew.bat                 # Windows Gradle wrapper for local APK compilation
├── app/                            # Next.js 14 App Router root
│   ├── api/                        # 40 RESTful API route handlers
│   │   ├── ai/                     # AI slip parser, forecasting, and generic alternatives
│   │   ├── auth/                   # OTP, login, session, and RBAC endpoints
│   │   ├── brands/                 # Manufacturer showcase directory
│   │   ├── cart/                   # Server-side cart management and sync
│   │   ├── companies/              # Pharmaceutical company directory & depot lookup
│   │   ├── credit/                 # Credit facility tracking and dues settlement
│   │   ├── dashboard/              # Business analytics and KPI statistics
│   │   ├── distributors/           # GIS depot locations, live courier GPS tracking
│   │   ├── invoices/               # Commercial tax invoices & Mushak-6.3 views
│   │   ├── ledger/                 # Running double-entry ledger audit records
│   │   ├── medicines/              # National catalog discovery and detail queries
│   │   ├── offers/                 # Trade schemes and promotional bonus API
│   │   ├── orders/                 # Order lifecycle, cancellation, and multi-company checkout
│   │   ├── pharmacies/             # Pharmacy profile, compliance, and geolocation
│   │   ├── pharmacy/inventory/     # Pharmacy physical stockroom & adjustments
│   │   ├── price-list/             # Wholesale price list and CSV export API
│   │   ├── returns/                # DGDA return claims and MPO review API
│   │   └── stock-status/           # Depot warehouse inventory status
│   ├── favicon.ico                 # Application favicon
│   ├── globals.css                 # Global Tailwind CSS styles and animation utilities
│   ├── layout.tsx                  # Root HTML shell & metadata
│   └── page.tsx                    # Master application viewport & screen orchestrator (3,588 lines)
├── components/                     # 65+ modular React components
│   ├── auth/                       # AuthModal with OTP verification and carrier logos
│   ├── common/                     # BrandLogo, MedSupportLogo, TakaIcon
│   ├── credit/                     # CreditLimitModal with dues settlement drawer
│   ├── dashboard/                  # OverviewCards, AnalyticsFilters, BusinessAnalyticsScreen
│   ├── dashboards/                 # Role-specific dashboard views (SuperAdmin, MPO, etc.)
│   ├── distributor/                # InvoicePdfModal, RecordCompanyPaymentModal
│   ├── distributors/               # DistributorDetailModal, LiveTrackingModal (Leaflet)
│   ├── inventory/                  # StockAdjustModal, BarcodeScannerModal, AddBatchModal
│   ├── invoices/                   # InvoicesModal with Mushak-6.3 printable layout
│   ├── layout/                     # AppNavbar, MobileBottomNav, MobileDrawer, SearchCommand
│   ├── map/                        # DistributorMap with OpenStreetMap tiles
│   ├── medicines/                  # MedicineDetailModal, VirtualizedMedicineList
│   ├── offers/                     # OffersHubModal with trade scheme claiming
│   ├── orders/                     # OrderStatusModal with 5-stage progression timeline
│   ├── pos/                        # DailyClosingModal, ThermalReceiptModal
│   ├── price-list/                 # PriceListModal with PDF and CSV export buttons
│   ├── pwa/                        # PwaRegister, OfflineIndicator, GetAppModal
│   ├── registration/               # Multi-step role registration form components
│   ├── returns/                    # ReturnsManagerModal with claim submission & approval
│   └── stock/                      # CompanyStockStatusModal with depot availability
├── docs/                           # Architecture, specifications, and handover manuals
│   ├── MEDGO_PROJECT_DOCUMENTATION.md # This master documentation file
│   └── PHASE_1_FUNCTIONAL_SPECIFICATION.md # Phase 1 comprehensive specification
├── hooks/                          # Custom React hooks (useAuth, useCart, useGeolocation)
├── ios/                            # Capacitor iOS Xcode project
├── lib/                            # Shared utilities and persistent in-memory database
│   ├── data/                       # 23MB DGDA master dataset (medicineDataset.json)
│   ├── mockDb.ts                   # MemoryDatabase singleton (41,300+ SKUs, orders, ledgers)
│   └── utils.ts                    # Utility helpers (formatting, Tailwind merge)
├── prisma/                         # Database schema and ORM configurations
│   └── schema.prisma               # Complete Prisma schema definition (666 lines)
├── proposal/                       # Capstone academic proposal, TeX source, and PDF
├── public/                         # Static assets, branding, and PWA manifest
├── scripts/                        # Automated verification, test runners, and catalog compilers
│   ├── run_all_phase1_tests.py     # Master test runner executing 14 test suites
│   ├── test_dashboard_features.py  # Automated verification of 8 dashboard modules
│   └── ...                         # Feature-specific integration test scripts
├── services/                       # Core domain business logic engines
│   ├── batchFifoEngine.ts          # Near-Expiry FIFO batch allocation algorithm
│   ├── creditLedgerEngine.ts       # Double-entry ledger and credit ceiling engine
│   ├── geoRoutingEngine.ts         # Haversine GIS routing and distance calculator
│   ├── packagingEngine.ts          # Unit conversion and trade scheme calculator
│   └── stockLockEngine.ts          # Optimistic concurrency locking (TTL 180s)
├── types/                          # Domain TypeScript type definitions
│   └── domain.ts                   # Master interfaces (IMedicine, IBatch, IOrder, etc.)
├── capacitor.config.ts             # Capacitor cross-platform mobile configuration
├── next.config.js                  # Next.js build configurations
├── package.json                    # Project dependencies and operational scripts
├── tailwind.config.js              # Tailwind theme configurations and color tokens
└── tsconfig.json                   # TypeScript compiler configurations
```

---

## 15. Current Development Progress & Feature Matrix

The following matrix provides an authoritative audit of implemented versus planned features:

| Feature / Module | Status | Verification Evidence | Notes & Implementation Details |
| :--- | :---: | :---: | :--- |
| **Authentication & OTP** | **COMPLETED** | `test_st_1_1a.py`, `test_st_1_1b.py` | 6-digit OTP, carrier detection, rate limiting, session cookies |
| **6-Role RBAC System** | **COMPLETED** | `test_st_1_2.py` | Role permissions, tenant isolation, HTTP 403 enforcement |
| **Pharmacy Compliance Profile**| **COMPLETED** | `test_st_1_3.py` | DGDA drug license validation, BD territory GPS bounds |
| **Company & Depot Directory** | **COMPLETED** | `test_st_1_4.py` | 45+ manufacturers, depot contacts, regional coverage |
| **Medicine Catalog (41,300+)**| **COMPLETED** | `test_st_1_5.py` | 23MB DGDA dataset loaded with lazy AST bypass |
| **Search & Discovery Engine** | **COMPLETED** | `test_st_1_6.py` | Sub-50ms fuzzy search, Bangla transliteration, facet filters |
| **Brands Showcase Carousel** | **COMPLETED** | `test_st_1_7.py` | Marquee ticker, brand modal, manufacturer product counts |
| **Packaging & Trade Schemes** | **COMPLETED** | `test_st_1_8.py` | Box/Strip/Piece conversion, 10+1 free, slab discounts |
| **Multi-Company Checkout** | **COMPLETED** | `test_st_1_9.py` | Cart clustering, separate company orders, atomicity |
| **Near-Expiry FIFO Batching** | **COMPLETED** | `test_st_1_10.py` | Earliest expiry sorting, multi-batch splitting, buffer locks |
| **Business Analytics & KPIs** | **COMPLETED** | `test_st_db_1.py` - `5.py` | Live KPIs, 12-month bar chart, dual-series trend line chart |
| **Offers Hub Modal** | **COMPLETED** | `test_dashboard_features.py` | Company scheme filters, one-click claim to cart |
| **Company Stock Status Modal** | **COMPLETED** | `test_dashboard_features.py` | Manufacturer depot inventory, batch numbers, expiry dates |
| **Order Status Tracker** | **COMPLETED** | `test_dashboard_features.py` | 5-stage progression, cancellation refund, stock intake |
| **Price List & CSV Export** | **COMPLETED** | `test_dashboard_features.py` | B2B wholesale table, printable view, RFC-4180 CSV |
| **Credit Facility & Settlement**| **COMPLETED** | `test_dashboard_features.py` | Utilization meter, company partitions, bKash dues clearance |
| **Invoices & Mushak-6.3** | **COMPLETED** | `test_dashboard_features.py` | Automatic generation, 2.4% VAT, printable challan layout |
| **Pharmacy Stock Adjustments** | **COMPLETED** | `test_dashboard_features.py` | Movement audit reasons, negative inventory prevention |
| **Return Claims & Review** | **COMPLETED** | `test_dashboard_features.py` | Claim filing, MPO review simulation, return ledger credits |
| **AI Vision Slip Parser** | **PARTIAL** | Working mock in UI & API | Functional mock endpoint returning structured JSON; full production requires fine-tuned ViT weights deployment |
| **AI Demand Forecasting** | **PARTIAL** | Working heuristic model | Implements 30-day velocity with monsoon Dengue multipliers; full LSTM/ARIMA neural pipeline is planned |
| **Generic Alternatives Finder**| **COMPLETED** | `GenericAlternativesFinder.tsx`| Chemical molecule matching across active stock with price comparison |
| **Live Courier GPS Tracking** | **COMPLETED** | `LiveTrackingModal.tsx` | Simulated real-time coordinates, speed, and Leaflet polyline |
| **Mobile Native APK (Android)**| **COMPLETED** | `android/` Gradle project | Capacitor Android bridge configured, tested with debug builds |

---

## 16. Installation, Configuration & Setup Guide

### 16.1 Prerequisites
- **Node.js:** Version `20.x` or higher (LTS recommended)
- **Package Manager:** `npm` (version 10+)
- **Python:** Version `3.10+` (required for automated test runners)
- **Java Development Kit (JDK):** JDK 17+ (required for Android APK builds)
- **Android Studio:** Required for mobile device debugging and APK signing

### 16.2 Step-by-Step Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/limon4reza000/medSupportBD.git
   cd medSupportBD
   ```

2. **Install Node Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the project root:
   ```env
   # Database Connection (MySQL or PostgreSQL)
   DATABASE_URL="mysql://root:password@localhost:3306/medgo"

   # Server Environment
   NODE_ENV="development"
   PORT=3000

   # Session Security
   JWT_SECRET="medgo_enterprise_secret_key_bangladesh_2026"

   # AI Pipeline Gateway (Optional for production inference)
   OPENAI_API_KEY=""
   ```

4. **Generate Prisma Client:**
   ```bash
   npx prisma generate
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

6. **Compile Native Android Debug APK (Optional):**
   ```bash
   npm run build
   npx cap sync android
   cd android && .\gradlew.bat assembleDebug
   ```
   The compiled APK will be located at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 17. Testing, Quality Assurance & Verification Protocols

MedGo includes a rigorous, automated testing framework divided into two comprehensive verification suites:

### 17.1 Phase 1 Master Integration Test Suite
Executed via `python scripts/run_all_phase1_tests.py`, this suite evaluates 14 sub-task suites verifying all foundation systems:
- `test_st_1_1a.py`: OTP authentication, session cookies, rate limiting, lockout guards.
- `test_st_1_1b.py`: Auth modal UI, carrier detection, auto-advance inputs.
- `test_st_1_2.py`: 6-role RBAC permissions and tenant isolation.
- `test_st_1_3.py`: Pharmacy compliance, DGDA drug licenses, Bangladesh GPS coordinates.
- `test_st_1_4.py`: Company directory and regional depot lookups.
- `test_st_1_5.py`: Medicine catalog taxonomy, packaging math, chemist margins.
- `test_st_1_6.py`: Search engine performance (<50ms) and Bangla transliteration.
- `test_st_1_7.py`: Brand directory, manufacturer product counts, marquee ticker.
- `test_st_1_8.py`: Multi-tier packaging arithmetic and trade scheme bonus calculations.
- `test_st_1_9.py`: Multi-company cart segregation and checkout dry-run.
- `test_st_1_10.py`: Atomic order decomposition, FEFO batch allocation, credit validation.
- `test_st_db_1.py` - `test_st_db_5.py`: Real-time KPI cards, analytics filters, dynamic bar chart, and trend line chart.

### 17.2 Dashboard Functional Modules Verification Suite
Executed via `python scripts/test_dashboard_features.py`, verifying all 8 interactive dashboard modules:
- **Test 1 (Offers):** Validates `/api/offers` returns active trade schemes.
- **Test 2 (Stock Status):** Verifies `/api/stock-status` returns available depot boxes and batch expiries.
- **Test 3 (Orders):** Verifies `/api/orders` retrieves pharmacy order history.
- **Test 4 (Price List):** Verifies `/api/price-list` and validates RFC-4180 CSV export.
- **Test 5 (Credit Facility):** Validates `/api/credit` utilization and executes a ৳5,000 settlement payment.
- **Test 6 (Invoices):** Verifies `/api/invoices` retrieves commercial Mushak-6.3 tax invoices.
- **Test 7 (Inventory):** Verifies `/api/pharmacy/inventory` and confirms negative stock prevention (HTTP 422).
- **Test 8 (Returns):** Verifies `/api/returns` and tests MPO approval with automated return credit adjustment.

### 17.3 Verification Command Summary
```bash
# 1. Full TypeScript Typecheck
npx tsc --noEmit

# 2. Phase 1 Master Integration Suite (14 Tests)
python scripts/run_all_phase1_tests.py

# 3. Dashboard Functional Modules Suite (8 Tests)
python scripts/test_dashboard_features.py
```
> [!NOTE]
> All automated tests pass with a 100% assertion success rate against the running local server.

---

## 18. Deployment & Infrastructure Requirements

### 18.1 Web & API Tier Deployment
- **Platform:** Vercel, AWS ECS, or DigitalOcean App Platform.
- **Build Command:** `npm run build`
- **Output:** Next.js Standalone build (`.next/standalone`).
- **Resource Sizing:** Minimum 2 vCPU, 4GB RAM (to handle high-velocity in-memory search and JSON dataset caching).

### 18.2 Database Tier Deployment
- **Relational Storage:** Managed MySQL 8.0+ or PostgreSQL 15+ (AWS RDS, PlanetScale, Supabase).
- **Connection Pooling:** Prisma Data Proxy or PgBouncer recommended for high concurrency.
- **Migrations:** Execute `npx prisma migrate deploy` on production CI/CD pipelines.

### 18.3 Distributed Concurrency & Cache Tier
- **Redis Instance:** In production, replace `StockLockEngine` in-memory maps with a managed Redis cluster (AWS ElastiCache, Upstash) using Redlock algorithms for multi-instance deployments.

### 18.4 Mobile Distribution
- **Android:** Distributed as an `.apk` or signed Google Play `.aab` package via Android Studio.
- **iOS:** Distributed via Apple TestFlight / App Store via Xcode build workspace.

---

## 19. Known Issues, Technical Debt & Limitations

1. **In-Memory vs. Relational Dual Architecture:**
   - *Current State:* The application currently utilizes the singleton `MemoryDatabase` (`lib/mockDb.ts`) backed by the 23MB `medicineDataset.json` file for zero-latency local development.
   - *Limitation:* State changes (orders placed, invoices settled) reset if the Node.js process is restarted without an active external database connection.
   - *Resolution:* Connect `DATABASE_URL` to a persistent MySQL/PostgreSQL instance and run `npx prisma db push`.

2. **AI Computer Vision Model Deployment:**
   - *Current State:* `/api/ai/slip-parser` utilizes a mock structured inference engine for UI integration testing.
   - *Limitation:* Real-world handwritten doctor prescription slips exhibit extreme variability in handwriting.
   - *Resolution:* Deploy a dedicated Python microservice running fine-tuned TrOCR or Vision Transformer (ViT) models trained on Bengali clinical prescriptions.

3. **Simulated Courier GPS Telemetry:**
   - *Current State:* Delivery van coordinates in `/api/distributors/live-tracking` use calculated waypoints along road coordinates.
   - *Limitation:* Real-world vehicles require physical GPS OBD-II tracker or mobile driver app telemetry integration.

---

## 20. Future Development Roadmap

### Phase 2: Enterprise Logistics & Advanced AI (Q1–Q2 2027)
- [ ] **Physical IoT Cold-Chain Monitoring:** Integration of Bluetooth Low Energy (BLE) temperature and humidity data loggers inside distribution vans for insulin and vaccines.
- [ ] **Fine-Tuned Bengali Prescription Vision OCR:** Production deployment of the Vision Transformer model trained on 10,000+ local doctor prescriptions.
- [ ] **MPO Mobile Geo-Fencing:** Automatic order cutting check-in verified by GPS proximity to the pharmacy's physical storefront.
- [ ] **Payment Gateway Integration:** Native bKash, Nagad, and SSLCommerz API webhooks for automated instant payment verification.

### Phase 3: National Scale & Ecosystem Integrations (Q3–Q4 2027)
- [ ] **NBR API e-Invoicing Direct Gateway:** Direct transmission of commercial invoices to the National Board of Revenue electronic tax register.
- [ ] **Voice-Activated Dialect Ordering:** Regional Bengali speech-to-text models allowing pharmacy owners to dictate daily replenishment orders verbally.
- [ ] **Inter-Depot Automated Rebalancing:** Machine-learning-driven stock transfers between depots based on regional disease outbreak forecasts.

---

## 21. Project Team Details & Responsibilities

| Team Member | Academic ID | Core Responsibilities & Deliverables |
| :--- | :--- | :--- |
| **Limon Reza** | **232-35-004** | **Lead Full-Stack Architect & Frontend Engineer**<br>• End-to-end system architecture & Next.js 14 App Router design.<br>• Responsive mobile-first UI/UX system (`360px` - `440px`) & Tailwind CSS styling.<br>• Multi-tier packaging arithmetic ($\text{Box} \to \text{Strip} \to \text{Piece}$) & dynamic trade schemes.<br>• Interactive POS terminal, modal architecture, and master integration test suite.<br>• Capacitor cross-platform mobile bridge & Android APK compilation. |
| **Md Mehedi Hasan** | **232-35-712** | **AI/ML Pipeline & Systems Logistics Engineer**<br>• Vision slip parser architecture & fuzzy catalog reconciliation.<br>• Seasonal demand forecasting incorporating monsoon Dengue outbreak surge multipliers.<br>• Near-Expiry FIFO batch allocation algorithm & multi-batch splitting logic.<br>• Pharmacy credit risk gating engine, double-entry financial ledger auditing, & Prisma schema design. |

*Additional Project Context:*
- **Academic Context:** Capstone Senior Design Project, Department of Computer Science and Engineering.
- **Supervisory Details:** *Not explicitly stated in repository source files (marked as Academic Design Project).*
- **External Dependencies:** Directorate General of Drug Administration (DGDA) Registered Medicine List dataset.

