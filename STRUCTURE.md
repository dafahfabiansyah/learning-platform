# Learning Platform - Best Practice Structure

## 📁 Struktur Folder

```
learning-platform/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Route group - Auth pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (dashboard)/      # Route group - Protected pages
│   │   │   ├── dashboard/
│   │   │   └── quiz/
│   │   │       ├── create/   # Buat quiz manual
│   │   │       └── generate/ # Generate dengan AI
│   │   │
│   │   └── api/              # API Routes
│   │       ├── auth/
│   │       │   ├── login/
│   │       │   └── register/
│   │       └── quiz/
│   │           └── generate/
│   │
│   ├── lib/                  # Core utilities
│   │   ├── prisma.ts        # Prisma client singleton
│   │   ├── auth/            # Authentication utilities
│   │   │   ├── jwt.ts       # JWT create & verify
│   │   │   ├── password.ts  # Password hashing
│   │   │   └── middleware.ts # Auth middleware
│   │   ├── ai/
│   │   │   └── gemini.ts    # Gemini AI integration
│   │   ├── utils/
│   │   │   └── quiz.ts      # Quiz utilities
│   │   └── validations/
│   │       └── schema.ts    # Zod validation schemas
│   │
│   ├── store/               # Zustand state management
│   │   ├── authStore.ts
│   │   └── quizStore.ts
│   │
│   └── types/               # TypeScript types
│       └── index.ts
│
├── .env                     # Environment variables
├── .env.example            # Example env file
└── package.json
```

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install zustand jose bcryptjs zod @google/generative-ai
npm install -D @types/bcryptjs
```

### 2. Setup Environment Variables

Copy `.env.example` ke `.env` dan isi dengan nilai yang sesuai:

```bash
cp .env.example .env
```

### 3. Database Setup

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

## 📦 Dependencies yang Digunakan

### Production
- **next**: Framework React
- **react** & **react-dom**: UI library
- **@prisma/client**: Database ORM
- **zustand**: State management
- **jose**: JWT handling
- **bcryptjs**: Password hashing
- **zod**: Schema validation
- **@google/generative-ai**: Gemini AI SDK

### Development
- **prisma**: Database toolkit
- **typescript**: Type safety
- **tailwindcss**: CSS framework
- **@types/**: TypeScript definitions

## 🔑 Key Features

### Authentication (JWT)
- Register & Login dengan JWT
- Password hashing dengan bcrypt
- Token validation middleware

### Quiz Management
- Create quiz manual (Essay, Multiple Choice, Mixed)
- Generate quiz dengan AI (Gemini)
- Quiz attempt & scoring

### State Management (Zustand)
- Auth state (user, token)
- Quiz builder state
- Persistent storage

## 📝 Next Steps

1. Install dependencies yang diperlukan
2. Setup database connection di `.env`
3. Buat API routes untuk auth & quiz
4. Buat UI components & pages
5. Implement middleware untuk protected routes

## 🔐 Security Notes

- Ganti `JWT_SECRET` dengan random string di production
- Jangan commit `.env` ke Git
- Validasi semua input dengan Zod
- Hash password sebelum save ke database
