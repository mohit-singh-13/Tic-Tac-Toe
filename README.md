# 🎮 Tic-Tac-Toe (Real-Time Multiplayer)

A minimalist and engaging **Tic-Tac-Toe** game that allows players to compete **online** in real-time using **WebSockets** or play **offline** with a friend. Built with a modern tech stack for a seamless gaming experience.

---

## ✨ Features

- **Real-Time Online Play**: Players are matched randomly with others across the globe.
- **Offline Mode**: Play locally with a friend on the same device.
- **Turn Indicator**: Clearly shows which player's turn it is.
- **Win/Tie Detection**: The game announces the winner or detects a draw.
- **Minimalist UI**: Simple, clean, and responsive design for a smooth user experience.

---

## 🛠️ Technologies Used

- **Frontend**: React, Tailwind CSS, TypeScript
- **Backend**: Node.js, `ws` library (WebSocket)
- **Hosting**:
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Render](https://render.com/)

---

## 🚀 How It Works

1. **Online Mode**:
   - Connects you to a random player worldwide.
   - The game updates in real-time using WebSockets.
2. **Offline Mode**:
   - Allows two players to play on the same screen.
   - No internet connection required.

---

## ⚠️ Important Note

The backend is hosted on a **free Render instance**, which **spins down** after **15 minutes** of inactivity.  
As a result, the first online match **may take 40-50 seconds** to connect while the server restarts. Please be patient. 🚀

---

## 🎮 Play Now!

🔗 **[Live Demo](https://ms-tic-tac-toe.vercel.app/)**

---

Enjoy playing Tic-Tac-Toe! 🏆🔥
