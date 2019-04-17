const request = require('request');

var getImages = (keyword)=>{
    return new Promise((resolve, reject)=>{
        request({
            url:`https://images-api.nasa.gov/search?q=${encodeURIComponent(keyword)}`,
            json: true
        }, (error,response,body)=>{
            //console.log(body.collection.items[0]);
            // console.log(body.collection.items[1].links[0].href);
            // console.log(body.collection.items[1].data[0].title);
            if (error){
                reject('Cannot connect to NASA');
            }else if((body.collection.items).length==0){
                reject('Cannot find request images');
            }else if ((body.collection.items).length>0){
                resolve([{
                    img: body.collection.items[0].links[0].href,
                    title: body.collection.items[0].data[0].title
                    },{
                    img: body.collection.items[1].links[0].href,
                    title: body.collection.items[1].data[0].title
                    }]
                )
            }
        });
    });
};


var getDeck_id = ()=>{
    return new Promise((resolve, reject)=>{
        request({
            url:`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`,
            json: true
        }, (error,response,body)=>{
            //console.log(body.deck_id);
            if (error){
                reject('Cannot connect to Deck for Card');
            }else {
                resolve({
                    deckid: body.deck_id
                    }
                )
            }
        });
    });
};


var getCards = (deckid, num)=>{
    return new Promise((resolve, reject)=>{
            request({
                url:`https://deckofcardsapi.com/api/deck/${deckid}/draw/?count=${num}`,
                json: true
            }, (error,response,body)=>{
                //console.log(body.collection.items[0]);
                // console.log(body.collection.items[1].links[0].href);
                // console.log(body.collection.items[1].data[0].title);
                if (error){
                    reject('Cannot connect to Deck for card');
                }else if(body.error){
                    reject(body.error);
                }else if (body.deck_id){
                    resolve([{
                            deckid: deckid,
                            card: body.cards[0].images.png
                            },{
                            deckid: deckid,
                            card: body.cards[1].images.png
                            },{
                            deckid: deckid,
                            card: body.cards[2].images.png
                        },{
                            deckid: deckid,
                            card: body.cards[3].images.png
                        },{
                            deckid: deckid,
                            card: body.cards[4].images.png
                        },]


                    )
                }
            });
        });
};

module.exports = {
    getImages, getDeck_id, getCards
};
//
// getImages("apollo").then((result)=>{
//     console.log(result)
// });

// getDeck_id().then((result)=>{
//     console.log(result)
// });

// getCards('awyen3dg3mjr', 5).then((result)=>{
//     console.log(result)
// });