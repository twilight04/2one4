````markdown
# 214Hz — Unspoken Frequency

A quiet space for the frequencies we carry but rarely broadcast. This is a minimal web application where users can "broadcast" their unspoken thoughts into the collective hum.[cite: 2]

**Features:**

- **Minimalist UI:** Hand-written aesthetic with paper-texture overlays.[cite: 2]

- **Intercepted Routing:** Seamless transitions between the feed and the letter composition.[cite: 2]

- **No Accounts:** Pure, anonymous transmissions.[cite: 2]

---

## 🏗️ Getting Started

### 1. Clone & Install

```bash

git clone <your-repo-url>

cd 214hz

npm install
```
````

### 2. Environment Setup

Copy the example environment file and fill in your local database credentials:[cite: 2]

```bash

cp .env.example .env

```

**Required Variables:**

- `DATABASE_URL`: Your PostgreSQL (or chosen DB) connection string.[cite: 2]

### 3. Database Initialization

Ensure your database is in sync with the Prisma schema:[cite: 2]

```bash

npx prisma db push

```

### 4. Run the Broadcast

```bash

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) to view the frequency.[cite: 2]

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)[cite: 2]

- **Styling:** [Tailwind CSS](https://tailwindcss.com/)[cite: 2]

- **Animations:** [Framer Motion](https://www.framer.com/motion/)[cite: 2]

- **Database:** [Prisma ORM](https://www.prisma.io/)[cite: 2]

- **Icons:** `react-icons`[cite: 2]

---

## 📡 Deployment

The easiest way to deploy is via the [Vercel Platform](https://vercel.com/new). Make sure to add your `DATABASE_URL` to the Vercel Project Settings under Environment Variables.[cite: 2]

---

> _"Tune into the unspoken, seal your thoughts in a letter, and let them drift into the collective hum."_[cite: 2]

```

```
