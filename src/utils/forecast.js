const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=c32d4c3cf4b54ea06028b060ef7a1ffa&query='+latitude+','+longitude+'&units=f'
    console.log(url)

request({url,json:true},(error,{body})=>{
    if(error){
        callback('Check your internet connetivity', undefined)
    }else if(body.error){
        callback('Check the input params, it seem to be wrong!')
    }else{
        callback(undefined,"Hello "+body.location.name+"!.It is currently " +body.current.temperature+" F out. The weather is  "+body.current.weather_descriptions[0]+"!. The Humidity is "+body.current.humidity+" percent .")
    }
})
}


module.exports = forecast