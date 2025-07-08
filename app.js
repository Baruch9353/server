import express from 'express';

const app = express();

const users = [
    { userName: 'Baruch', id: "1" },
    { userName: 'David', id: "2" }
];

app.get('/', (req, res) => {
    res.send('Welcome to home')
});
app.get('/about', (req, res) => {
    res.send('About us')
});



app.get('/users', (req, res) => {
    res.json(users)
});


// req.params    /    
app.get('/users/:userName', (req, res) => {
  const { userName } = req.params; 
  res.send(userName);
});

//  req.query    ? = 
app.get('/search', (req, res) => {
  res.send(req.query);
});





app.listen(3005, () => {
    console.log(`Express server running on 3005`);
});