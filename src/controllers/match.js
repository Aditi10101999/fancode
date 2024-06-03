const Match = require('../models/match');

const getAllMatches = async () => {
    return await Match.getAllMatches();
}

const getTourIdAndSportIdByMatchId = async (id) => {
    if (!id) {
        throw new Error('Missing required parameter: id');
    }

    return await Match.getTourIdAndSportIdByMatchId(id);
}

module.exports = {
    getAllMatches: getAllMatches,
    getTourIdAndSportIdByMatchId:getTourIdAndSportIdByMatchId
}