const express = require("express");
const {createClient} = require("redis");

const app = express();
port = 3000; 

const client = createClient({
    url: 'redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}'
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();

    app.get("/", async (req, res) => {
        let visits = await client.get("visits");
        if (!visits) {
            visits = 0;
        }
        await client.set("visits", parseInt(visits) + 1);
        res.send("Number of visits is: " + visits);
    });

    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
})();   
