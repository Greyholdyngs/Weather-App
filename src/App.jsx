import { useEffect, useState } from 'react';
import Header from './Header';
import celcious from './assets/imgae/celcious.png';
import darkWave from "./assets/imgae/wavedark.png";
import lightWave from "./assets/imgae/wavelight.png";
import darkpressure from "./assets/imgae/pressuredark.png";
import lightpressure from "./assets/imgae/pressurelight.png";
import darkhumidity from "./assets/imgae/humiditydark.png";
import lighthumidity from "./assets/imgae/humiditywhite.png";

const App = () => {
  
  const [search, setSearch] = useState('');

  const [error, setError] = useState('');
  
  const [result, setResult] = useState();

  const [load, setLoad] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const [typeCity, setTypeCity] = useState('');

  const apiKey = import.meta.env.VITE_APP_MY_KEY

  const fetchWeather = async (cityParam) => {
    const city = (cityParam ?? search ?? "").trim()

    if (!city) {
      setTypeCity("Please input a city")
      return;
    }
    setLoad(true)
    setError("")

    try {

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric)`
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "City Not Found")
      } else {
        setResult(data);
        console.log(data);
      }
    }
     catch (e) {
      setError(e.message || "Something went wrong")
      setResult(null)
    } finally {
      setLoad(false)
    }
  };

  useEffect(
    () => {
      fetchWeather(search)
    }, []
  )

  const handleChange = (e) => {
    setSearch(e.target.value)
    setError('')
  }

  const handleSearch = () => {
    if (!search.trim()) {
        setError('Please Inpute a country');
        setTypeCity('')
        return;
    }
    fetchWeather(search)
    setError('')
    setSearch('')
    setLoad(true)
  }

  const safe = (value) => (value !== undefined && value !== null && value !== "" ? value : "__");

  const cityName = safe(result?.name);
  const pressure = safe(result?.main?.pressure);
  const clouds = safe(result?.clouds?.all);
  const humidity = safe(result?.main?.humidity);
  const wind = safe(result?.wind?.speed);

  return (
    <div className={`bg-blue-50 h-screen
                    ${darkMode ? "bg-gray-700 text-gray-700" : "bg-blue-50 text-black"}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode}  />
      <section className={`text-center py-5`}>
        <label htmlFor="" className={`flex justify-center items-center md:px-0 px-5`}>
          <input type="text" value={search}
              onChange={handleChange}
              placeholder='Type your country to get weather'
              className={`focus:outline-none ring-2 focus:ring-blue-200 ring-blue-200 rounded-l-xl py-2 w-70
                          pl-3 
                          ${error ? "text-red-500 ring-2 focus:ring-red-500 bg-red-200 ring-red-500" : ""}
                          ${darkMode ? "text-blue-200" : "text-black"}`}
        />
          <button type='submit'
                onClick={handleSearch}
                className={`text-xl rounded-r-xl px-5 h-11 font-bold
                            hover:bg-blue-400 transporm ease-in-out duration-500 cursor-pointer
                            ${error ? "bg-red-200 border-2 border-red-500 hover:bg-red-700" : ""}
                            ${darkMode ? "text-blue-200 bg-gray-600" : "text-white bg-blue-100"}`}
                >Search </button>
        </label>
        {
          error && (
            <div className={``}>
              <small className={`text-red-500 font-semibold text-base absolute lg:left-125 md:left-52 left-7 my-3`}>{error}</small>
            </div>
          )
        }
        {
          typeCity && (
            <small className={`font-semibold text-base absolute lg:left-125 md:left-52 left-7 my-3
                              ${darkMode ? "text-blue-200" : "text-black"}`}>{typeCity}</small>
          )
        }
      </section>
      <main className={` m-auto rounded-lg lg:w-150 md:w-110 w-80 md:px-10 px-5 py-10 my-20
                        ${darkMode ? "bg-gray-300" : "bg-white"}`}>
            <div>
              <div className={`text-center `}>
                <h3 className={`text-2xl font-semibold`}>{cityName}</h3>
                <div className={`flex items-center justify-center gap-2 my-10`}>
                  <h1 className={`text-6xl font-semibold`}>
                    {clouds} &deg;C
                  </h1>
                  <img className={`w-12`} src={celcious} alt="" />
                </div>
                <p>{}</p>
              </div>
              <section className={`flex justify-center items-center lg:space-x-25 md:space-x-15 space-x-7`}>
                <div>
                  <img src={darkMode ? lighthumidity : darkhumidity} alt="" />
                  <p className='lg:text-xl text-base my-1 lg:font-base font-semibold'>
                      <strong>Humidity</strong>
                  </p>
                  <small className='text-lg'>{humidity}%</small>
                </div>
                <div>
                  <img src={darkMode ? lightWave: darkWave} alt="" />
                  <p className='lg:text-xl text-base my-1 lg:font-base font-semibold'>
                    <strong>Wind Speed</strong>
                  </p>
                  <small className='text-lg'>{wind}</small>
                </div>
                <div>
                  <img src={darkMode ? lighthumidity : darkhumidity} alt="" />
                  <p className='lg:text-xl text-base my-1 lg:font-base font-semibold'>
                    <strong>Pressure</strong>
                  </p>
                  <small className='text-lg'>{pressure}</small>
                </div>
              </section>
            </div>
      </main>
    </div>
  )
}

export default App
