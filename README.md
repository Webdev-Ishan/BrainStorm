# 🧠 BrainStorm — Your Second Brain App

# **BrainStorm** is a personal knowledge management app designed to help you capture, organize, and revisit your ideas — turning your digital brain into a reliable partner for learning and creativity.

## 🚀 Live Demo & Screenshots

[Brainstorm](https://www.brainstormideas.xyz/Profile)

## 🎯 Key Features

- **Note capture**

  - Create, edit, delete quick notes

- **Tagging & Organization**

  - Add tags or categories for easy retrieval

- **Search & Filter**

  - Instantly find notes by keyword or tag

- **Responsive UI**
  - Clean, mobile-friendly design using [Tailwind CSS ]

---

## 🧩 Tech Stack

- **Frontend**: React or Next.js, Tailwind CSS
- **Backend**: Node.js + Express or Next.js API Routes
- **Database**: MongoDB via Mongoose
- **Authentication**: JWT
- **State Management**: Redux

## 📦 Installation & Local Setup

```bash
 git clone https://github.com/Webdev-Ishan/BrainStorm.git
 cd BrainStorm

```

## Install dependencies

```bash
 npm install
```

## Environment Variables

```bash
 DATABASE_URL=<your_db_connection_string>
JWT_SECRET=<random-secret>
PORT=3000
```

## Run locally

```bash
npm run dev
```

Creating a Note

    Fill out the form (title, content, tags)

    Submit → The note saves to the database and instantly appears in your dashboard

Searching/Filtering

    Type in search field or select a tag → Note list updates in real-time

Editing / Deleting

    Use the action icons (✏️ edit, 🗑️ delete) on your saved notes
