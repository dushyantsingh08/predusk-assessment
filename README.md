# Me-API: Full Stack Developer Portfolio

A dynamic, full-stack portfolio application built with Next.js, serving as both a personal website and a showcase of technical skills.

## 🏗 Architecture

*   **Frontend**: Next.js 14+ (App Router), React, Tailwind CSS.
*   **Backend**: Next.js API Routes (Serverless functions).
*   **Database**: MongoDB (via Mongoose ODM).
*   **Language**: TypeScript (Strict typing).
*   **Deployment**: Vercel (Recommended).

## 🚀 Setup Instructions

### Prerequisites
*   Node.js 18+
*   MongoDB Instance (Local or Atlas)

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd me-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory:
    ```env
    MONGODB_URI=mongodb://localhost:27017/me-portfolio
    # Add other keys if necessary
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:3000`.

### Production Build

1.  **Build the application:**
    ```bash
    npm run build
    ```

2.  **Start the production server:**
    ```bash
    npm start
    ```

## 🗄 Database Schema

### Profile (`profiles`)
Stores the main user information. Designed for a single-user portfolio.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Full name |
| `email` | String | Contact email (Unique) |
| `bio` | String | Short biography |
| `socialLinks` | Object | GitHub, LinkedIn, Portfolio URLs |
| `education` | Array | List of degrees/schools |
| `experience` | Array | Professional history |

### Project (`projects`)
Showcase of work.

| Field | Type | Description |
| :--- | :--- | :--- |
| `title` | String | Project Name |
| `description` | String | Detailed description |
| `liveUrl` | String | URL to live demo |
| `repoUrl` | String | URL to source code |
| `skills` | Array | References to `Skill` IDs |

### Skill (`skills`)
Technical skills and proficiency.

| Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Skill name (e.g., "React") |
| `level` | Enum | "Beginner", "Intermediate", "Expert" |

## 📡 API Endpoints & Usage

### 1. Get Profile
Fetch the user's profile data.

**Curl:**
```bash
curl -X GET http://localhost:3000/api/profile
```

### 2. Create Profile (Setup)
Initialize the portfolio with your data.

**Curl:**
```bash
curl -X POST http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "bio": "Full Stack Dev",
    "socialLinks": { "github": "https://github.com/janedoe" },
    "education": [],
    "experience": []
  }'
```

### 3. Search Projects
Filter projects by keyword.

**Curl:**
```bash
curl -X GET "http://localhost:3000/api/search?q=dashboard"
```

### 4. Filter by Skill
Get all projects using a specific technology.

**Curl:**
```bash
curl -X GET http://localhost:3000/api/projects/skill/React
```

## 📄 Resume
[Download My Resume](#) *(https://drive.google.com/file/d/1AdfRbvQIhiuv_f62WdQL4FKHH3DDVoFO/view?usp=sharing)*

## ⚠️ Known Limitations
*   **Single User**: The current architecture is designed for a single owner/profile.
*   **Auth**: There is no authentication protection on `POST`/`PATCH` endpoints (Open API). 
*   **Search**: Basic regex-based search; not optimized for large datasets.

---
*Built with ❤️ using Next.js & MongoDB.*
