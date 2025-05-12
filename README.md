# StarWars API

StarWars Characters is a web application that fetches and displays detailed information about Star Wars characters using an external API. The app provides users with a smooth and engaging experience to browse, explore, and learn more about iconic characters from the Star Wars universe. The project pulls data from a Star Wars API on the backend and delivers it through a sleek, interactive frontend.

## Key features

 - 🌠 Automatically fetches character data from the Star Wars API

 - 🧑‍🚀 Displays detailed character profiles including name, height, gender, and more

 - 🔍 Easy-to-use interface with responsive layout and modern design

 - 💡 Dynamic content rendering using React

 - ⚙️ Backend server handles API calls and routes the data to the frontend



## Tech Stack

 - Frontend: React.js, Tailwind CSS

 - Backend: Node.js, Express.js

 - API: External SWAPI Wars API 

## 🚀 Getting Started

Follow these steps to set up and run the **StarWars Characters** app locally.

---

### 🔧 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v16 or higher)
- **npm** (Node package manager, comes with Node.js)
- A stable internet connection (to fetch data from the Star Wars API)

---

### 📁 Project Structure

```
star-wars-browser/
├── client/ # React frontend
├── server/ # Node.js + Express backend
├── package.json # Root file with start script using concurrently

```


---

### 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/farzana-bit/star-wars-api
cd star-wars-browser
```

1. **Install all dependencies**
If your root package.json manages both client and server, simply run:

```
npm install
```
Otherwise, install dependencies manually:

```
cd client && npm install
cd ../server && npm install
cd ..

```

### ▶️ Running the App

To start both the frontend and backend at once, use:

```
npm start
```

This will be used concurrently to run:

 - The backend server on http://localhost:5000

 - The React frontend on http://localhost:3000

### Sample output:

```
🚀 Server starting...
✅ Server listening at http://localhost:5000
Compiled successfully!
You can now view the app in the browser at http://localhost:3000
```

Make sure the backend is running before trying to fetch any character data on the frontend.

### 🔐 Environment Variables

Create a .env file inside the server/ directory with the following contents:

```
PORT=5000
STARWARS_API=https://swapi.dev/api/people/
```
These variables configure your backend server to call the external Star Wars API.



## 🧪 Test Plan

This section outlines the test plan to ensure the **StarWars Characters** app functions as expected.

---

### ✅ Objectives

- Verify that the app fetches and displays character data correctly.
- Ensure frontend and backend integration works smoothly.
- Confirm responsiveness and usability across devices.
- Validate error handling when API requests fail.

---

### 🔍 What to Test

#### 1. **API Integration**
- [ ] Backend successfully calls the external Star Wars API.
- [ ] API response is returned to the frontend correctly.
- [ ] Handles failed API calls gracefully (e.g., network errors or 404s).

#### 2. **Character Display**
- [ ] All characters are rendered with correct information (name, height, etc.).
- [ ] Layout adapts across screen sizes (mobile, tablet, desktop).
- [ ] Clicking/interacting with a character (if applicable) shows more details or interaction works.

#### 3. **Frontend Functionality**
- [ ] App starts without errors on `npm start`.
- [ ] Loading states and error messages are shown properly.
- [ ] No broken UI components or unexpected behavior.

#### 4. **Backend Server**
- [ ] Server runs correctly on `localhost:5000`.
- [ ] Returns JSON data in the expected format.
- [ ] Handles missing or invalid endpoints with appropriate messages.

---

### 🔧 How to Test

#### Manual Testing
Run the application locally:

```bash
npm install
npm start
```
 ### Navigate to http://localhost:3000 and manually verify:

   - Page loads and displays character data.

   - Inspect DevTools → Network tab to verify API calls.

   - Simulate a slow network or a disconnect to check error handling.

### Automated Testing

Currently not implemented, but future enhancements may include:

  - Unit tests using Jest

  - Component tests using React Testing Library

  - API route tests with Supertest


## 📦 7. Deployment

This section explains how to deploy the **StarWars Characters** project to a live environment.

---

### 🚀 Hosting Platforms

- **Frontend**: Deployed with [Vercel](https://vercel.com)
- **Backend**: Deployed with [Render](https://render.com) *(alternatively, Railway or Heroku can be used)*

---

### 📜 Deployment Steps

#### ✅ Frontend (React)

1. Push your `client/` folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and import your repository.
3. Set the build settings:
   - **Framework Preset**: React
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Click **Deploy**.

#### ✅ Backend (Node.js)

1. Push your `server/` folder to a separate GitHub repository (or subfolder repo).
2. Go to [render.com](https://render.com) and create a new **Web Service**.
3. Connect your repository and choose:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` or `node index.js`
   - **Environment**: Add `.env` variables like:
     ```env
     PORT=5000
     STARWARS_API=https://swapi.dev/api/people/
     ```
4. Click **Deploy**.


## 📄 9. License & Contribution

This is a personal project and not currently open for external contributions.  
Feel free to fork or explore the code for learning purposes. 🚀


