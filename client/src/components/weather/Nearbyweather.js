import React, {Component} from 'react';
const { useState, useEffect} = React;

const Nearbyweather = () => {
    
    const [temp, setTemp] = useState('');

    useEffect(() => {
        fetchData1()
    })

    const fetchData1 = async () => {
        
        let latitudeD;
        let longitudeD;

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getNearbyData);
        } else {
          console.log('Geolocation is not supported by this browser.');
        }

        async function getNearbyData(position) {

          latitudeD = position.coords.latitude;
          longitudeD = position.coords.longitude;
          console.log('nearby latitude', latitudeD);
          
          
          const url = `http://localhost:5000/weather/nearby?lat=${latitudeD}&lon=${longitudeD}`
          await fetch(url, {
            method: 'GET',
          })
          .then(res => res.json())
          .then(tempp => {
             console.log('after nearby FETCHHHHH', tempp);
            setTemp(tempp.main.temp)
        })
          .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
          //await fetchNearbyData(latitudeD, longitudeD);
        }
        
    }
        
        return (
            <div>
                {/* <button onClick={this.incrementScore}>+</button>
                <span className="score-decrement"> { this.state.score } </span>
                <button onClick={this.decrementScore}>-</button> */}
                <button onClick={fetchData1}>City</button>
                <span>{temp}</span>
                <span>  </span>
            </div>
            
        );
}
// function Geolocation() {
//   return ({
//     let currentDate = new Date();
//     document.querySelector('#current-date').innerHTML = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
//     let x = document.querySelector("#display-data");
//     let latitudeD = null;
//     let longitudeD = null;

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(getNearbyData);
//     } else {
//       x.innerHTML = "Geolocation is not supported by this browser.";
//     }
//   });
// }

// const helper = {
//     helper1: function Footer () {
//     return (
//         <div className="Footer-tag">
//             <footer className="Dom-footer">
//                 <span>This is the footer!</span>
//             </footer>
//         </div>
//     );
//     },
//     helper2: function Greeting() {
//       return ( 
//       <div className = "Footer-tag" >
//         <section className = "Dom-footer" >
//             <span > This is the Section! </span> 
//         </section> 
//         </div>
//       );
//     }
// }

export default Nearbyweather;