const request = require('request');

var getAddress = (address)=>{
    return new Promise((resolve, reject)=>{
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyB7b56t3nf1khPW6YFPSIXZHY55-c7g5Pk`,
            json: true
        }, (error,response,body)=>{
            //console.log(body);
            if (error){
                reject('Cannot connect to Google Maps');
            }else if(body.status == "ZERO_RESULTS"){
                reject('Cannot find requested address');
            }else if (body.status == 'OK'){
                resolve({
                    //body
                    lag: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng,
                    country_code: body.results[0].address_components[3].short_name
                })
            }
        });
    });
};



module.exports = {
    getAddress
};

// getAddress('metrotown').then((result)=>{
//     console.log(result);
// });