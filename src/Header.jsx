import img from './assets/imgae/cutimg.png';
import moon from './assets/imgae/darkmode.png';
import light from './assets/imgae/lightmode.png';

const Header = ({ darkMode, setDarkMode }) => {

    const handleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <header className={`flex justify-between items-center 
                            md:py-5 sm:py-4 py-3 md:px-20 px-5  
                            ${darkMode ? "bg-gray-900" : "bg-blue-200"}`}>
            <nav>
                <a href="#">
                    <img src={img} alt="logo" className={`md:w-30 w-15`} />
                </a>
            </nav>
            <nav className={`flex justify-between items-center md:gap-10 gap-2`}>
                <div>
                    <h1 className={`font-bold lg:text-3xl md:text-2xl sm:text-lg text-base
                                    ${darkMode ? "text-blue-200" : "text-white"}`}>My Weather Update</h1>
                </div>
                <nav>
                    <button className={`cursor-pointer `}
                            onClick={handleDarkMode}
                            >                        
                        <img src={darkMode ? light : moon} alt="half moon" />
                    </button>
                </nav>
            </nav>
      </header>
    )
}
export default Header