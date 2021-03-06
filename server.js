// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    console.log('GET request detected');
    console.log('Fetch request data', json);
  })
  .post(async (req, res) => {
    console.log('POST request detected');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    const json = await data.json();
    res.json(json);

    const categoryCount = new Map();
    let i;
    
    for(i = 0; i < json.length; i++) {
      if(categoryCount.has(json[i].category)) {
        categoryCount.set(categoryCount.get(json[i].category), categoryCount.get(json[i].category)+1);
      } else {
        categoryCount.set(json[i].category, 1);
      }
    }
    console.log('OOGA');
    console.log(categoryCount);

  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});