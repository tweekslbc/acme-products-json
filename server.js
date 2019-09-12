const express = require('express');
const path = require('path');
const app = express();
const db= require('./db');

app.use(express.json());

app.get('/', (req, res, next)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/users', async(req, res, next)=>{
  try {
  res.send(await db.getUsers());
}
catch (ex){
  next(ex);
}
});

app.post('/api/users', async(req, res, next)=>{
  try {
  res.send(await db.createUser(req.body));
}
catch (ex){
  next(ex);
}
});

app.listen(7555, ()=> console.log('listening on port 7555'));
