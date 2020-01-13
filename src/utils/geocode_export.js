const request = require("request")


const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiamVldGJoYXR0OTAiLCJhIjoiY2s0MzNwb2c0MDNpODNlcWNzbXZtaDYwbSJ9.PBpezUbQTeBZDOuNRtUCjw&limit=1'
    request({url:url, json:true}, (error, response)=>{
        if (error){
            callback('Internet Not connected', undefined)
        } else if (response.body.features.length===0){

            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
 }

 module.exports = geocode