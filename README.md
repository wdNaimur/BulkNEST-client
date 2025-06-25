# BulkNest

BulkNest is a B2B wholesale marketplace designed to simplify and streamline bulk purchasing. It provides authenticated user access, product management features, and dynamic views for an optimal user experience.

**Live Site :** [BulkNEST](https://bulknest.web.app/)

## Tech Stack & Tools

**Framework & Build Tool**

- React
- Vite

**Styling**

- Tailwind CSS
- DaisyUI

**Backend & Authentication**

- Firebase (Authentication & Admin SDK)
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- dotenv
- CORS
- Cookie-Parser

## Key Features

- **User Authentication:** Login and Signup using Firebase with JWT authentication
- **Product Management:** Add, edit, delete, and order products
- **Protected Routes:** Only authenticated users can access secure pages
- **Toggle View:** Switch between Card View and Table View on the products page
- **Filter & Sort:** Refine product listings by availability
- **Empty State Messages:** Friendly UI when no products are found or invalid ID is searched
- **Responsive Design:** Fully functional on desktop and mobile devices
- **Animations:** Smooth UI transitions using Framer Motion

## NPM Packages Used

**Frontend:**  
`react`, `vite`, `firebase`, `react-router`, `tailwindcss`, `daisyui`, `framer-motion`, `swiper`, `axios`, `react-hot-toast`, `react-icons`, `react-tooltip`, `sweetalert2`, `react-simple-star-rating`, `react-fast-marquee`

**Backend:**  
`express`, `mongodb`, `firebase-admin`, `jsonwebtoken`, `cors`, `cookie-parser`, `dotenv`

## 🛠️ BulkNest Client – Local Setup Instructions

- **Clone the repository and install dependencies:**

  ```bash
  git clone https://github.com/wdNaimur/bulknest-client.git
  cd bulknest-client
  npm install
  ```

- **Create a `.env.local` file** in the project root and add the following environment variables:

  ```
  VITE_apiKey=your_firebase_apiKey
  VITE_authDomain=your_firebase_authDomain
  VITE_projectId=your_firebase_projectId
  VITE_storageBucket=your_firebase_storageBucket
  VITE_messagingSenderId=your_firebase_messagingSenderId
  VITE_appId=your_firebase_appId

  VITE_API_URL=your_backend_api_url
  ```

- **Run the development server:**

  ```bash
  npm run dev
  ```

## Server Repository

Explore the backend code here 👉 [BulkNEST Server](https://github.com/wdNaimur/bulknest-server)


<p align="center"><sub><strong>Designed & Developed by Md. Naimur Rahman</strong></sub></p>
