import express from 'express';
import requestIp from 'request-ip'
import fetch from 'node-fetch'


const app = express();

app.get('/api/hello', async(req, res)=>{
    const name = req.query.visitor_name;
    try{
        const ipAddress = requestIp.getClientIp(req); 
        const locationResponse = await fetch(`https://ipinfo.io/102.89.42.53?token=073c5708f2dd0c`)
        const data = await locationResponse.json()

        const city = data.city;

        const weatherResponse = await fetch(`http://api.weatherapi.com/v1/current.json?key=912f26c77fc341ffb92140735240107&q=${city}`);
        const weatherT = await weatherResponse.json()
        const temperature = weatherT.current.temp_c;
        
        res.json({
            "client_ip": ipAddress,
            "location": city,
            "greeting": `Hello, ${name}!, the temperature is ${temperature} degrees Celcius in ${city}`
        })


    }catch(err){
        console.log(err)
    }
})

app.listen(3000, ()=>{
    console.log('app is listening on port 3000')
})

