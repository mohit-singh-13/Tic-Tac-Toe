import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Offline from "./pages/Offline";
import Online from "./pages/Online";

function App() {
  return (
    <div className="min-h-screen w-full bg-[#EEEEEE]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offline" element={<Offline />} />
        <Route path="/online" element={<Online />} />
      </Routes>
    </div>
  );
}

export default App;
