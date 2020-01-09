import React, {Component} from 'react';
import LineChart from '../../LineChart';
import { Button } from 'reactstrap';
const { useState, useEffect} = React;

// Arrays for storing data
let arrayForTemp = [];
let arrayForWind = [];
let arrayForLabels = [];
let arrayForHumidity = [];
let arrayForPressure = [];

const WeatherHourly = (props) => {
    console.log('HOURLY CITY',props.name);
    
    
    const [finalData, setData] = useState([]);
    const [finalLabels, setLabels] = useState([]);

    useEffect(() => {
        fetchData1()
    },[])

    const tempOnClick = () =>{
        setData(arrayForTemp)
        setLabels(arrayForLabels)
    }
    const windOnClick = () =>{
        setData(arrayForWind)
        setLabels(arrayForLabels)
    }

    const pressureOnClick = () =>{
        setData(arrayForPressure)
        setLabels(arrayForLabels)
    }

    const humidityOnClick = () =>{
        setData(arrayForHumidity)
        setLabels(arrayForLabels)
    }
    const fetchData1 = async () => {
          
          const url = `http://localhost:5000/weather/search/city/hourly?city=wellington`
          await fetch(url, {
            method: 'GET',
          })
          .then(res => res.json())
          .then(data => {
             console.log('after HOURLY FETCHHHHH', data);
             data.list.map(timeStamp => {
                        //         `<tr> <td>${timeStamp.dt_txt}</td>
                        //         <td>${Math.floor(timeStamp.main.temp)}</td>
                        //         <td>${timeStamp.weather[0].main}</td>
                        //         <td>${timeStamp.wind.speed}</td>
                        //   </tr>`;
              arrayForTemp.push(timeStamp.main.temp);
              arrayForWind.push(timeStamp.wind.speed);
              arrayForHumidity.push(timeStamp.main.humidity);
              arrayForPressure.push(timeStamp.main.pressure);
              arrayForLabels.push(timeStamp.dt_txt.slice(11));
            });
        })
          .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
          //await fetchNearbyData(latitudeD, longitudeD);
        
    }
        
        return (
            <div>
            <h1>Weather updates</h1>
               <div className="btn-weather-hourly"> 
                <Button onClick= {tempOnClick}>Temperature</Button>
                <Button onClick= {windOnClick} >Wind</Button>
                <Button onClick= {pressureOnClick} >Humidity</Button>
                <Button onClick= {humidityOnClick} >Pressure</Button>
                </div>
            <div className="containers chart-wrapper ">
                <LineChart
                    data={finalData}
                    title={finalLabels}
                    color="#3E517A"
                />
            </div>
            </div>
            
        );
}


export default WeatherHourly;