const express = require('express');
const stockRoutes = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
//const appIdNews = '6c94c3ee727d4018aaa464174e7163d3';
//const urlNews = 'https://newsapi.org/v2/top-headlines';
const urlGnews = 'https://api.worldtradingdata.com/api/v1/stock?symbol=SNAP,TWTR,VOD.L&api_token=';
const appIdStock = process.env.G_STOCK_API_KEY;


stockRoutes.route('/news/:country').get((request, response) => {

  if (!request.params) {
    response.status(404).json({
      message: 'no params provided'
    }).end();
  }
  const country = request.params.country;
  //let city = request.body.city;
  console.log('country is ', country);

  if (country == undefined) {
    response.status(404).json({
      message: 'provide country as param'
    }).end();
  } else {
    //fetch(`${urlNews}?country=${country}&apiKey=${appIdNews}`)
    fetch(`${urlGnews}${country}&lang=en&token=${appIdStock}`)
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
      });
  }
});

newsRoutes.route('/sports/:country').get((request, response) => {

  if (!request.params) {
    response.status(404).json({
      message: 'no params provided'
    }).end();
  }
  const country = request.params.country;
  //let city = request.body.city;
  console.log('country is ', country);

  if (country == undefined) {
    response.status(404).json({
      message: 'provide country as param'
    }).end();
  } else {
    //fetch(`${urlNews}?country=${country}&apiKey=${appIdNews}`)
    fetch(`${urlGnews}${country}%20Sports&lang=en&token=${appIdStock}`)
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
      });
  }
});

newsRoutes.route('/business/:country').get((request, response) => {

  if (!request.params) {
    response.status(404).json({
      message: 'no params provided'
    }).end();
  }
  const country = request.params.country;
  //let city = request.body.city;
  console.log('country is ', country);

  if (country == undefined) {
    response.status(404).json({
      message: 'provide country as param'
    }).end();
  } else {
    //fetch(`${urlNews}?country=${country}&apiKey=${appIdNews}`)
    fetch(`${urlGnews}${country}%20business&lang=en&token=${appIdStock}`)
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
      });
  }
});

newsRoutes.route('/entertainment/:country').get((request, response) => {

  if (!request.params) {
    response.status(404).json({
      message: 'no params provided'
    }).end();
  }
  const country = request.params.country;
  //let city = request.body.city;
  console.log('country is ', country);

  if (country == undefined) {
    response.status(404).json({
      message: 'provide country as param'
    }).end();
  } else {
    //fetch(`${urlNews}?country=${country}&apiKey=${appIdNews}`)
    fetch(`${urlGnews}${country}%20entertainment&lang=en&token=${appIdStock}`)
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
      });
  }
});

module.exports = stockRoutes;
