const express = require('express');
const newsRoutes = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();
//const appIdNews = '6c94c3ee727d4018aaa464174e7163d3';
const appIdNews = process.env.NEWS_API_KEY;
//const urlNews = 'https://newsapi.org/v2/top-headlines';
const urlGnews = 'https://gnews.io/api/v3/search?q=';
//const appIdGnews = 'd18f56c76e75e74afd33cec43fde21e0';
const appIdGnews = process.env.G_NEWS_API_KEY;


newsRoutes.route('/news/:country').get((request, response) => {

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
    fetch(`${urlGnews}${country}&lang=en&token=${appIdGnews}`)
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
    fetch(`${urlGnews}${country}%20Sports&lang=en&token=${appIdGnews}`)
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
    fetch(`${urlGnews}${country}%20business&lang=en&token=${appIdGnews}`)
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
    fetch(`${urlGnews}${country}%20entertainment&lang=en&token=${appIdGnews}`)
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

module.exports = newsRoutes;

