import React from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import * as d3 from 'd3';
import Nearbyweather from '../weather/Nearbyweather'
import News1 from './News1';
import axios from 'axios';
import { TwitterTimelineEmbed, TwitterDMButton } from 'react-twitter-embed';
import {Button} from 'reactstrap';

import { log } from 'util';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import Profile from '../registration/Profile';
import WeatherHourly from '../weather/Weatherhourly';

const { useState, useEffect, useMemo, useCallback, useRef } = React;
  
const World2 = () => {
    
    
    const [countries, setCountries] = useState({ features: []});
    const [hoverD, setHoverD] = useState();
    const [selectCountry, setSelectCountry] = useState();
    const [places, setPlaces] = useState([]);
    const [showCard, setShowCard] = useState(false);
    const [newsArticles, setNewsArticles] = useState([]);
    const [popup, setPopup] = useState(false);
    const [articleUrl, setArticleUrl] = useState();
    const [isArticle, setIsArticle] = useState(false);
    const [renderCard, setRenderCard] = useState(false);
    const [cityTemp, setCityTemp] = useState([]);
    const [showTwitter, setTwitter] = useState(false);
    const [latCountry, setLatCountry] = useState();
    const [lonCountry, setLonCountry] = useState();
    const [showStory, setStory] = useState(false);

    // const [currentUser, setCurrentUser] = useState(props.location.state.userName);
    const globeEl = useRef();
    
    // const animate = time => {

    //   // The 'state' will always be the initial value here
    //   globeEl.current = requestAnimationFrame(animate);
    // }

    // useEffect(() => {
    //   globeEl.current = requestAnimationFrame(animate);
    //   return () => cancelAnimationFrame(requestRef.current);
    // }, []); // Make sure the effect runs only once

    /**
     * Toggle iframe div
     */
    const toggleIframe = useCallback(
      event => {
        setStory(!showStory);
        // event.preventDefault();
        //setPopup(!popup);
      },
      [showStory]
    );

    const toggleCard = useCallback(
      event => {
        setShowCard(!showCard);
      }, [showCard]
    )

    const toggleTwitter = () => {
       setTwitter(true);
    }

    /**
     * Get url of article
     */
    const getUrl = useCallback(event => {
        // event.preventDefault();
        console.log('geturl event', event);
        
        setIsArticle(true);
        setArticleUrl(event.selectedUrl);
    },
    []
    );

    /**
     * Have a default point of view of globe on start
     */
    useEffect(() => {
      globeEl.current.pointOfView({
        altitude: 1.5,
        lat:-41.8,
        lng: 171.5
      });
    }, []);

    // useEffect(() => {
    //   (function moveSpheres() {
    //     data.forEach(d => d.lat += 0.2);
    //     setData(data.slice());
    //     requestAnimationFrame(moveSpheres);
    //   })();
    // }, []);

    /**
     * FETCH DATA THAT MAKES THE POLYGONS
     */
    useEffect(() => {
      // load data
      fetch('./dataset/ne_110m_admin_0_countries.geojson')
        .then(res => res.json())
        .then(data => setCountries(data))
        .catch((error)=> console.log('The error is ', error))
    }, []);
    
    /**
     * FETCH DATA THAT PUTS LABELS ON POLYGONS
     */
    useEffect(() => {
      // load data
      fetch('./dataset/ne_110m_populated_places_simple.geojson')
        .then(res => res.json())
        .then(({ features }) => {
            console.log('dumdum',features);   
            setPlaces(features)
    })
    .catch((err)=> console.log('Cant access url, Error is ',err));
    }, []);

    // const colorScale = d3.scaleSequentialSqrt(d3.interpolateYlOrRd);
    // // GDP per capita (avoiding countries with small pop)
    // const getVal = feat => feat.properties.GDP_MD_EST / Math.max(1e5, feat.properties.POP_EST);
    // const maxVal = useMemo(
    //   () => Math.max(...countries.features.map(getVal)),
    //   [countries]
    // );

    // colorScale.domain([0, maxVal]);



    /**
     * Fetch country data when polygon clicked
     */
    const handleClick = async () => {
      console.log('polygon is clicked', selectCountry);
      
      // FETCH CALL TO ENDPOINT IN SERVER
      const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);

      setNewsArticles(news.data);
      console.log('SECOND FETCH news', news)
      //setRenderCard(true);
      setShowCard(toggleCard);
      setTwitter(toggleTwitter);

      const url = `http://localhost:5000/weather/search/`
      
      let matchfound = places.find(match => match.properties.name.toLowerCase() == selectCountry.toLowerCase())
      console.log('match found', matchfound);
      console.log('country for weather', selectCountry);
      //console.log('our regex', matchfound.properties.nameascii.replace(/\s/g, '').toLowerCase());
      let cityRegex = matchfound.properties.iso_a2.replace(/\s/g, '%20').toLowerCase();
      console.log('temperatureeee', cityRegex);
      
      // Go to new coordinates
      if(matchfound) {

        globeEl.current.pointOfView({
          lat: matchfound.geometry.coordinates[1],
          lng: matchfound.geometry.coordinates[0],
          altitude: 1.3,
        }     
        )
      
    }
      
      if(matchfound) {
      fetch(`${url}${cityRegex}`, {
            method: 'GET',
          })
          .then(res => res.json())
          .then(temp => {
            setCityTemp([{name:temp.main.temp.toString(),
                        lat: temp.coord.lat,
                        lon: temp.coord.lon,
                        radius: 4,
                        color:'yellow',
                      alt: 0.4}])
            // setLatCountry(temp.coord.lat)
            // setLonCountry(temp.coord.lon)
            console.log('new temp fetched', temp.main.temp);
            
          })
          .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"));
        }
          
    };

    /**
     * Fetch country data when polygon clicked
     */
    const handleSportsClick = async () => {
      console.log('polygon is clicked');

      // const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);

      const news = await axios(`http://localhost:5000/news/sports/${selectCountry.toLowerCase()}`);
      setNewsArticles(news.data);
      console.log('SECOND FETCH news', news)
      //setRenderCard(true);
      setShowCard(true);
    };

    /**
     * Fetch country data when polygon clicked
     */
    const handleBusinessClick = async () => {
      console.log('polygon is clicked');

      // const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);

      const news = await axios(`http://localhost:5000/news/business/${selectCountry.toLowerCase()}`);
      setNewsArticles(news.data);
      console.log('SECOND FETCH news', news)
      //setRenderCard(true);
      setShowCard(true);
    };

    /**
     * Fetch Main news when button clicked
     */
    const handleMainClick = async () => {
      console.log('polygon is clicked');

      // const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);

      const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);
      setNewsArticles(news.data);
      console.log('SECOND FETCH news', news)
      //setRenderCard(true);
      setShowCard(true);
    };

    /**
     * Fetch country data when polygon clicked
     */
    const handleEntertainmentClick = async () => {
      console.log('polygon is clicked');

      // const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);

      const news = await axios(`http://localhost:5000/news/entertainment/${selectCountry.toLowerCase()}`);
      setNewsArticles(news.data);
      console.log('SECOND FETCH news', news)
      //setRenderCard(true);
      setShowCard(true);
    };

    /**
     * Fetch JOBS when BUTTON clicked
     */
    const handleJobsClick = async () => {
      console.log('polygon is clicked');

      // const news = await axios(`http://localhost:5000/news/news/${selectCountry.toLowerCase()}`);
      let newValue = 'url'
      const news = await axios(`http://localhost:5000/jobs/jobs/${selectCountry.toLowerCase()}`);
      
      const articles = {articles: [news.data.hits]}
      
      const articles2 = articles.articles[0].map(el => {
        //el.newValue = el.webpage_url
        let o = Object.assign({}, el);
        o.url = el.webpage_url;
        o.title = el.occupation.label;
        o.description = el.description.text;
        o.source = {name: 'Arbetsformedlingen'}
        return o;
      })

      const articlesUrlAdded = {articles: articles2}

      console.log('JOB ARTICLES', articles);
      console.log('JOB ARTICLES 2', articles2);
      console.log('JOB ARTICLES 2', articlesUrlAdded);

      setNewsArticles(articlesUrlAdded);
      console.log('SECOND JOBS news', news)
      //setRenderCard(true);
      setShowCard(true);
    };

    // const toggleCardRendering = () => {
    //   setRenderCard(false);
    // }

    // const fetchWeatherData = async (cityname) => {
    //   console.log('latitude', cityname);
    //   cityname.places.map(city => {
    //   const url = `http://localhost:5000/weather/search/${city.properties.name}`
    //   fetch(url, {
    //       method: 'GET',
    //     })
    //     .then(res => res.json())
    //     .then(temp => {
    //       this.setState({
    //         temp: temp.main.temp,
    //         show: true
    //       })
    //     })
    //     .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    // })
    // }

    let weatherData;
    return (
      // <BrowserRouter>
      // <div>
      //   <ul> 
      //     <li>
      //       <Link to="/profile">Profile</Link>
      //     </li>
      //   </ul>
      //   <hr/>
      //   <Route path="/profile" component={Profile}></Route>
      // </div>
    
      
      <div>
        <div>
          <div >
            <Globe
            ref={globeEl}
            backgroundColor={'#000015'}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            polygonsData={countries.features}
            polygonAltitude={d => d === hoverD ? 0.07 : 0.06}
            polygonCapColor={h => h === hoverD ? '#c2b280':'#0F5257'}
            polygonSideColor={() => 'rgba(200, 200, 200, 0.5)'}
            polygonStrokeColor={() => '#111'}
            polygonLabel= {({properties: d}) => setSelectCountry(d.ADMIN)}                                     
            // polygonLabel={({ properties: d }) => 
            //   `<b>${d.ADMIN} (${d.ISO_A2}):</b>`
            // }
            onPolygonHover={setHoverD}
            //onLabelHover = {setHoverD}
            onPolygonClick= { handleClick}
            polygonsTransitionDuration={300}

            // label data
            labelsData={places}
            labelLat={d => d.properties.Latitude}
            labelLng={d => d.properties.Longitude}
            labelText={d => d.properties.name}
            labelSize={d => Math.sqrt(d.properties.pop_est) * 2e-4}
            //{...console.log('label latitude', labelLat)}
            labelColor={() => 'orange'}
            labelResolution={1}
            labelAltitude={0.072}
            // {...weatherData = fetchWeatherData({places})}
            
            
            // //   ({ properties: d }) => 
            // // handleClick(d.ADM0_A3)
            // // <News1 name = {d.ADMIN}/>
            // }
            //showAtmosphere = {true}
            // customLayerData={cityTemp}
            // customThreeObject={d => new THREE.Mesh(
            //     new THREE.SphereBufferGeometry(d.radius),
            //     new THREE.MeshLambertMaterial({ color: d.color })
            //   )}
            //   customThreeObjectUpdate={(obj, d) => {
            //     Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
            //   }}
          />
        </div>
        {/* <div>{currentUser}</div> */}
        
        <div className={showTwitter ? "twitter-div" : "hidden"}>
          <TwitterTimelineEmbed
          sourceType="timeline"
          id="539487832448843776"
          theme="light"
          noHeader
          noFooter
          options={{height: 800}}
          />
        </div>

        <div className={showCard ? "card-div" : "hidden"} >
          <div style = {{marginLeft: '20px'}}>

            <Button onClick={handleMainClick}>News</Button>
            <Button onClick={handleSportsClick}>Sports</Button>
            <Button onClick={handleBusinessClick}>Business</Button>
            <Button onClick={handleEntertainmentClick}>Entertainment</Button>
            <Button onClick={handleJobsClick}>Jobs</Button>

          </div>
        
          <News1  name = {selectCountry} articles={newsArticles} toggleIframe= {toggleIframe} getUrl={getUrl}/>   
        
        
        </div>
        
        <div className={showStory ? "iframe-div" : "hidden"}>
        
           
          <iframe name="iframea" height="100%" width="100%"></iframe> 
          
        
          
        </div>
        
      </div>
    </div>
    )
  };

export default World2;