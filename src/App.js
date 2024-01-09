import React, {useEffect, useState} from 'react';
import './App.css';
import SearchBar from './components/searchBar/SearchBar';
import TabBarMenu from './components/tabBarMenu/TabBarMenu';
import MetricSlider from './components/metricSlider/MetricSlider';
import axios from "axios";
import ForecastTab from "./pages/forecastTab/ForecastTab";
function App() {
    const [weatherData, setWeather] = useState({});
    const [location, setLocation] = useState('')
        async function getData() {
            try {
                const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location},nl&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
                setWeather(result.data);
                console.log(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        useEffect(() => {
            if(location) {
                getData();
            }
        }, [location]);

    return (
        <>
            <div className="weather-container">

                {/*HEADER -------------------- */}
                <div className="weather-header">
                    <SearchBar setLocationHandler={setLocation} />

                    <span className="location-details">
            {Object.keys(weatherData).length > 0 &&
                <>
                    <h2>{weatherData.weather[0].description}</h2>
                    <h3> {weatherData.name}</h3>
                    <h1>{weatherData.main.temp} &deg;</h1>
                </>
            }
                        <button type="button" onClick={getData}>
                        Haal data op!
                    </button>
                </span>
                </div>

                {/*CONTENT ------------------ */}
                <div className="weather-content">
                    <TabBarMenu/>

                    <div className="tab-wrapper">
                        <ForecastTab coordinates={weatherData.coord} />
                        Alle inhoud van de tabbladen komt hier!
                    </div>
                </div>

                <MetricSlider/>
            </div>
        </>
    );
}

export default App;
