const express = require('express');
const weatherRoutes = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
const appId = process.env.OPEN_WEATHER_API_KEY;
const url = 'http://api.openweathermap.org/data/2.5/';


const isReqQuery = (req, res) => {
  if (!req.query) {
    res.status(404).json({
      message: 'Provide lat and lon'
    }).end();
  }
};

/**
 * Endpoint to Fetch data for nearby location
 */
weatherRoutes.route('/nearby').get((req, res) => {

  isReqQuery(req, res);

  const latitude = req.query.lat;
  const longitude = req.query.lon;

  console.log('server latitude', latitude);
  
  if (latitude == undefined || longitude == undefined) {
    res.status(401).json({
      message: 'both latitude and longitude required'
    });
  } else {
    fetch(`${url}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${appId}`)
      .then(response => response.json())
      .then(data => {
        if (data.cod == '404') {
          res.status(400).json({
              message: 'City not found'
            })
            .end();
        }
        res
          .status(200)
          .json(data);
      });
  }
});

/**
 * Endpoint to Fetch data for given City
 */
weatherRoutes.route('/search/:city').get((request, response) => {

  if (!request.params) {
    response.status(404).json({
      message: 'Provide city name'
    }).end();
  }
  const city = request.params.city;
  //let city = request.body.city;
  console.log('city for weather',request.params.city);

  if (city == undefined) {
    response.status(404).json({
      message: 'city not defined'
    }).end();
  } else {
    fetch(`${url}weather?q=${city}&units=metric&APPID=${appId}`)
      .then(res => res.json())
      .then(data => {

        if (data.cod == '404') {
          response.status(400).json({
              message: 'City not found'
            })
            .end();
        }
        response.status(200)
          .json(data);
      })
      .catch(err => response.json(err))
  }
});

/**
 * Endpoint to Fetch hourly data from API
 */
weatherRoutes.get('/search/city/hourly', (request, response) => {

  isReqQuery(request, response);

  const city = request.query.city;
  console.log('hourly CITY', city);
  

  if (city == undefined) {
    response.status(404).json({
      message: 'city not defined'
    }).end();
  } else {
    fetch(`${url}forecast?q=${city}&units=metric&APPID=${appId}`)
      .then(res => res.json())
      .then(data => {
        if (data.cod == '404') {
          response.status(400).json({
              message: 'City not found'
            })
            .end();
        }
        response
          .json(data);
      });
  }
});

const ifLatLon = (latitude, longitude, res) => {
  if (latitude == undefined || longitude == undefined) {
    res.status(401).json({
      message: 'both latitude and longitude required'
    });
  }
};

const isCode404 = (data, response) => {
  if (data.cod == '404') {
    response.status(400).json({
        message: 'City not found'
      })
      .end();
  }
};


/**
 * search by lat and lon
 */
 weatherRoutes.route('/coordinates').get((req, res) => {

   isReqQuery(req, res);

   const latitude = req.query.lat;
   const longitude = req.query.lon;

   ifLatLon(latitude, longitude, res);

   fetch(`${url}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${appId}`)
     .then(response => response.json())
     .then(data => {

       isCode404(data, res);

       res
         .status(200)
         .json(data);
     });
 });

module.exports = weatherRoutes;