import { useNavigate } from "react-router-dom";

const Home = ({ setGameType }: 
{ 
    setGameType: (type: number) => void
}) => {
    const navigate = useNavigate();
    console.log("Home");

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-bg-image bg-cover bg-center">
            <div className="w-[40%] mx-auto flex flex-col gap-5 text-slate-800">
                <button 
                className="w-full h-[6rem] rounded-lg bg-blue-400 text-[2rem] font-bold hover:scale-105 transition-all duration-200"
                onClick={() => {
                    setGameType(1);
                    navigate("/onlinegame");
                }}>
                    Online Two Players
                </button>

                <button 
                className="w-full h-[6rem] rounded-lg bg-green-400 text-[2rem] font-bold hover:scale-105 transition-all duration-200"
                onClick={() => {
                    setGameType(2);
                    navigate("/game");
                }}>
                    Offline Two Players
                </button>
            </div>
        </div>
    )
}

export default Home