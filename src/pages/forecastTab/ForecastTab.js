import React, {useEffect, useState} from 'react';
import './ForecastTab.css';
import axios from "axios";

function createDateString(timestamp) {
    const day = new Date(timestamp * 1000);
    return day.toLocaleDateString('nl-NL', { weekday: 'long'});
}

function ForecastTab({coordinates}) {
    const [foreCast, setForecasts] = useState([]);
    useEffect(() => {
    async function fetchForecasts() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_API_KEY}&lang=nl`);
            console.log(response.data);

            const fiveDayForecast = response.data.list.filter((singleForecast) => {
                return singleForecast.dt_txt.includes("12:00:00");
            })
            setForecasts(fiveDayForecast);
        } catch(e) {
            console.error(e);
        }
    }
    if (coordinates) {
        fetchForecasts();
    }
}, [coordinates]);

  return (
    <div className="tab-wrapper">
        {foreCast.map((singleForeCast) => {
            return (<article className="forecast-day" key={singleForeCast.dt}>
            <p className="day-description">
                {createDateString(singleForeCast.dt)}
            </p>

            <section className="forecast-weather">
            <span>
            {singleForeCast.main.temp}&deg; C
            </span>
            <span className="weather-description">
            {singleForeCast.weather[0].description}
            </span>
            </section>
            </article>)
        })}
    </div>
  );
}

export default ForecastTab;
