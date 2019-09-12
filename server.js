const express = require('express');
const path = require('path');
const app = express();
const db= require('./db');

const dataLayer = db('./products.json');

app.use(express.json());

app.get('/', (req, res, next)=> {
  const it = path.join(__dirname, 'index.html');

  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async(req, res, next)=>{
  try {
  res.send(await dataLayer.findAll());
}
catch (ex){
  next(ex);
}
});

app.post('/api/products', async(req, res, next)=>{
  console.log(req.body);
  try {
  res.send(await dataLayer.create(req.body));
}
catch (ex){
  next(ex);
}
});

app.listen(7555, ()=> console.log('listening on port 7555'));
