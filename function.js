const axios = require('axios');

var getImages = async(keyword)=>{
    try{
        let pictures = [];
        let res = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(keyword)}`);

        if (res.data.collection.items.length == 0) throw 'Cannot find request images';

        for (var i =0; i<res.data.collection.items.length; i++){
            let img = (res.data.collection.items[i].links[0].href).replace(/ /g,'%20');
            let desp = res.data.collection.items[i].data[0].title;
            let obj = {img: img, desp: desp};
            pictures.push(obj);
        }

        return pictures
    }catch(error){
        throw new Error(error)
    }
};

var getDeck_id = async ()=>{
    try{
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
        return res.data.deck_id
    }catch(error){
        throw new Error(error)
    }
};

var getCards = async(deckid, num)=>{
    try{
        let cards =[];
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${num}`);

        if (num > 52) throw 'Exceeds card numbers limit';
        if (isNaN(num)) throw 'The number must be integer';
        if(res.data.error) throw res.data.error;

        for (var i=0; i<res.data.cards.length; i++){
            let img = res.data.cards[i].image;
            let obj = {img: img};
            cards.push(obj);
        }

        return cards
    }catch(error){
        throw new Error('Your input is invalid')
    }
};

module.exports = {
    getImages, getDeck_id, getCards
};

// getImages('mars').then((result)=>{
//     console.log(result);
// }).catch((e)=>{
//     console.log(e);
// });

// getDeck_id().then((result)=>{
//     console.log(result)
// });

// getCards('ouotzkssn2ch', '5').then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e);
// });