const express = require('express');
const jobsRoutes = express.Router();
const fetch = require('node-fetch');
require('dotenv').config();


const apiJobKey = process.env.JOBS_API_KEY;
const urlGnews = 'https://jobsearch.api.jobtechdev.se/search?offset=0&limit=30&q=';

jobsRoutes.route('/jobs/:country').get((request, response) => {

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
    fetch(`${urlGnews}${country}&api-key=${apiJobKey}&q=javascript`, {
      headers: {
        'api-key': `${apiJobKey}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('job DATA', data);
        
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


module.exports = jobsRoutes;
