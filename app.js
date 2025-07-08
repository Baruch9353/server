import express from 'express';

const app = express();

function logger(req,res,next){
    console.log("--------------");
    console.log(req.url);
    console.log(req.method);
    console.log(new Date().toLocaleString());
    next()
}

app.use(express.json())

app.use(logger)

app.get('/', (req, res) => {
    res.send('Welcome to home')
});
app.get('/about', (req, res) => {
    res.send('About us')
});

app.get('/users', (req, res) => {
    res.json(users)
});

// Part 1: Basic Setup & First Endpoint
app.get('/greet', (req, res) => {
  const time = new Date().toISOString();
  res.json({ msg: `hi from get endpoint ${time}` });
});

// Part 2: Route Params & Internal Requests
app.get('/greet/:name', (req, res) => {
    console.log(`msg: I got name: ${req.params.name}`);
    res.json({ msg: `got name: ${req.params.name}` });
});

app.get("/test", async (req, res) => {
    const response = await fetch(`http://localhost:3005/greet/Baruch`);
    const data = await response.json();
    if (data.msg && data.msg.includes('Baruch')) {
        res.json({ result: "ok" });
    } else {
        res.json({ result: "fail" });
    }
});


// Part 3: Action-Based POST Endpoint
app.post('/action', async(req,res) => {
    const {key} = req.body

 if (!key || (key !== "joke" && key !== "cat fact")) {
        return res.status(400).json({ msg: "body is malformed" });
    }

    try {
        if (key === "joke") {
            const response = await fetch("https://official-joke-api.appspot.com/random_joke");
            const data = await response.json();
            const joke = `${data.setup.toUpperCase()} ${data.punchline.toUpperCase()}`;
            return res.json({ joke });
        }

        if (key === "cat fact") {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            const data = await response.json()
            res.json({"length" : data.length})
        }

    } catch (err) {
        console.error("Error fetching external API:", err.message);
        return res.status(500).json({ msg: "error fetching data" });
    }
});








// req.params    / arg   
app.get('/users/:userName', (req, res) => {
  const { userName } = req.params; 
  res.send(userName);
});

//  req.query    ? arg = arg
app.get('/search', (req, res) => {
  res.send(req.query);
});





app.listen(3005, () => {
    console.log(`Express server running on port 3005`);
});


