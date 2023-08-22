// import {useEffect, useState} from 'react';
// import axios from "axios";
//
// export default function Wetter() {
//     const [weatherData, setWeatherData] = useState<any|null >(null);
//     const API_KEY = "195e28abe1b97f37b87bf2d037c0b180";
//     const city = "Essen";
//
//
//     useEffect(() => {
//
//         const fetchWeatherData = async () => {
//             try {
//                 const response = await axios.get(
//                     `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=10&appid=${API_KEY}`
//                 );
//                 setWeatherData(response.data);
//             } catch (error) {
//                 console.error("Fehler beim Abrufen der Wetterdaten:", error);
//                 setWeatherData(null);
//             }
//         };
//
//         fetchWeatherData();
//     }, [city, API_KEY]);
//
//     if (weatherData===null) {
//         return <div>Loading...</div>;
//     }
//     return (
//         <div className={"wetter"}>
//             <h2>Wettervorhersage für {city}</h2>
//             <ul>
//                 {weatherData.list.map((item: any, index: number) => (
//                     <li key={index}>
//                         Datum: {new Date(item.dt * 1000).toLocaleDateString()}
//                         <br />
//                         Temperatur: {item.temp.day} °C
//                         <br />
//                         Wetter: {item.weather[0].description}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
//
