const News = require('../models/news');
const Match = require('../controllers/match');
const Tour = require('../controllers/tour');

const createNews = async data => {

    if (!data) {
        throw new Error('Data object is undefined');
    }

    const { title, description, isForMatch , matchId, tourId} = data;

    if (!title || !description) {
        throw new Error('Title and description are required');
    }

    if( isForMatch == null){
        throw new Error('isForMatch is required. If news is craeted for match then put true');
    }

    if(isForMatch && !matchId){
        throw new Error('match id is required.');
    }

    if(!isForMatch && !tourId){
        throw new Error('tour id is required.');
    }

    if(isForMatch){
        try{
           const { tourId, sportId} = await Match.getTourIdAndSportIdByMatchId(matchId);
           console.log("tourId "+tourId);
           console.log("sportId "+sportId);
           return await News.createNews(title, description, matchId, tourId, sportId);
        }catch(error){
            console.log(error);
            throw new Error ('Match not found');
        }
    }else{

        try{
            const { sportId} = await Tour.getSportIdByTourId(tourId);
            console.log("sportId "+sportId);
           return await News.createNews(title, description, null, tourId, sportId);
        }catch(error){
            console.log(error);
            throw new Error ('Tour not found');
        }

    }

};


const getAllNews = async () => {
    return await News.getAllNews();
}


const getNewsByMatchId = async (matchId) => {
    
    if (!matchId) {
        throw new Error('Missing required parameter: matchId');
    }

    return await News.getNewsByMatchId(matchId);
};

const getNewsByTourId = async (tourId) => {

    if (!tourId) {
        throw new Error('Missing required parameter: tourId');
    }

    return await News.getNewsByTourId(tourId);
};

const getNewsBySportId = async (sportId) => {

    if (!sportId) {
        throw new Error('Missing required parameter: sportId');
    }

    return await News.getNewsBySportId(sportId);
};

module.exports = {
    getAllNews: getAllNews,
    createNews:createNews,
    getNewsByMatchId:getNewsByMatchId,
    getNewsByTourId:getNewsByTourId,
    getNewsBySportId:getNewsBySportId
};

