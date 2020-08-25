const request = require('request')

const geoCode = (place,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(place)+ '.json?access_token=pk.eyJ1Ijoic2F2ZWV0aGEiLCJhIjoiY2tkMzA0cTJ3MTl6azM0cXZpMDN5Z25odiJ9.OROcj25liKrJ2mx1arF3VQ&limit=1'
    request({url,json:true},(error, {body})=>{
        if(error){
            callback('Check your internet connectivity', undefined)
        }else if(body.features.length === 0){
            callback('Not able to find the location, Try another!', undefined)
        }else{
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode