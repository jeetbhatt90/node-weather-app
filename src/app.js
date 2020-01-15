const express = require('express')
const path = require('path')  //we dont need to install path as it is a inbuilt node 
const hbs = require('hbs')

const geocode = require('./utils/geocode_export')
const forecast = require('./utils/forecast_export')

const app = express()
const port = process.env.PORT || 3000 // this is needed to deploy in heroku , the 3000 is for local

// console.log(__dirname)  //gives the directory path
// console.log(__filename) //gives the file path

//define path for express config
const punlicDirectoryPath = path.join(__dirname, '../public') // this "../public" is used to navigate to the public path where html file were located
const viewPath = path.join(__dirname, '../templates/views') // setting up template location so that it can be used in place of views folder which we deleted
const partialsPath = path.join(__dirname, '../templates/partials') // setting up partial path

//setup handlebar engine and views location
app.set('view engine', 'hbs') // used for hbs installed via npm i hbs
app.set('views', viewPath)  // We are setting view location.By default it expects hbs files from "views" folder.Here we use "templates" folder
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(punlicDirectoryPath)) 

// app.get('', (req, res)=>{                     // this wont be required as the page is coming from index.htm 
//     res.send('<h1>Hello Express !!</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Jit'
//     }, {
//         name: 'Anurag'
        
//     }])
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About Page</h1>')
// })

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jit Bhattacharjee'
    })  //name should match as per index.hbs filename>nO need of extension like .hbs. We then delete index.html
})

app.get('/about', (req, res)=>{
    res.render('about', {     //again same name that of views folder i.e is about..next weare sending argument which we use in {{}} in about.hbs file 
        title: 'About Me',
        name: 'Jit Bhattacharjee'
    })  //name should match as per index.hbs filename>nO need of extension like .hbs. We then delete index.html
})

app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'What help do you need..!!',
        title: 'Help Page',
        name: 'Jit Bhattacharjee'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address){  //http://localhost:3000/weather?address=chennai we have to give address like this in url in key value pair format. The req.query will capture it as shown 
       return res.send({
            error: 'You Must provide an Address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {})=>{ //object destruction used with default {} assignment in case no location or incorrect location is provided

        if (error){
            return res.send({
                error:error
            })
        }
        forecast(latitude, longitude, (error, foecastdata)=>{   //copy the forcast inside geocode so that it takes latitude nad longitude as input
            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                forecast: foecastdata,
                location: location,
                address: req.query.address
            })
         })
    
     })

    // res.send({
    //     Forecast: 'Its snowing here',
    //     Location: 'Kolkata',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Jit Bhattacharjee',
        errorMessage: 'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Jit Bhattacharjee',
        errorMessage: 'Page Not Found'
    })
})

//only for local
// app.listen(3000, ()=>{
//     console.log('Server is up on Port 3000')
// })

 //changing 3000 to port so that it can be used by heroku and local both
app.listen(port, ()=>{
    console.log('Server is up on Port '+port)
})