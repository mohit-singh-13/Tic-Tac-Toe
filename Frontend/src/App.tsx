import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import { useState } from "react";
import OnlineGame from "./pages/OnlineGame";

function App() {
    const [gameType, setGameType] = useState<number | null>(null);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Home setGameType={setGameType} />} />

                <Route path="/game" element={<Game gameType={gameType} />} />
                <Route path="/onlinegame" element={<OnlineGame gameType={gameType} />} />
            </Routes>
        </div>
    )
}

export default App
