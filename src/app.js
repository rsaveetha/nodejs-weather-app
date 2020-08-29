const path = require('path') //core module first
const express = require('express') // next npm module
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express() //Creates express app
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirPath))


app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Saveetha'

    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About the Author',
        name: 'Saveetha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Some help text',
        name: 'Saveetha'
    })
})    


// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'weather app',
//         version: 1.0,
//         info:'This app will give weather forcast for the give location',
//         input:'Please provide the address of the place'
//     })
// })


app.get('/weather', (req,res)=>{

    if(!req.query.address){
        res.send({
            error: 'Please provide the location to get weather in address'
        })
    }
    geoCode(req.query.address,(error, {latitude, longitude, location} = {})=>{

        if(error){
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                address:req.query.address,
                forecast:forecastData,
            })
        })
    

    })
    

})

app.get('/help/*', (req, res)=> {

   res.render('error',{   //rendering file name without extension
        title : 404,
        errorMessage:'Help article not found',
        name: 'Saveetha'
   })
})

app.get('*', (req, res) => {
    //res.send('My 404 Page')
    res.render('error', {
        title : 404,
        errorMessage : '404-Page not found',
        name: 'Saveetha'
    })
})

app.listen(port,()=>{
    console.log('server is up and running at the port', port)
})

