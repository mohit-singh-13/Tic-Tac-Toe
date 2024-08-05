import { useNavigate } from "react-router-dom";

const Home = ({ setGameType }: 
{ 
    setGameType: (type: number) => void
}) => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-bg-image bg-cover bg-center">
            <div className=" max-xs:w-[80%] sm:w-[60%] md:w-[50%] max-w-[30rem] mx-auto flex flex-col gap-5 text-white">
                <button 
                className="px-4 w-full py-5 rounded-lg font-serif bg-bg-glass shadow-2xl text-[2rem] font-bold hover:scale-105 transition-all duration-200"
                onClick={() => {
                    setGameType(1);
                    navigate("/onlinegame");
                }}>
                    Online Two Players
                </button>

                <button 
                className="px-4 w-full py-5 rounded-lg font-serif bg-bg-glass shadow-2xl text-[2rem] font-bold hover:scale-105 transition-all duration-200"
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