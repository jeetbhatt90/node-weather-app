const request = require("request")

const forecast =(latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/53a6600afdfcb6b134a5bc4c543b4fe0/'+ latitude  + ','+ longitude +'?units=si'
    request({url:url, json:true},(error, response)=>{
        if (error){
            callback('Internet Not connected', undefined)
        }else if (response.body.error){
           callback('Unable to find location', undefined)
        }else{
            callback(undefined,response.body.daily.data[0].summary+ 'It is currently '+response.body.currently.temperature +'.Chances of rain is '+response.body.currently.precipProbability+ '%')
        }

    })
}
module.exports = forecast