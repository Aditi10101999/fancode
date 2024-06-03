const Tour = require('../models/tour');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    return await Tour.getMatchesByTourName(params);
}

const getSportIdByTourId = async (id) => {

    if (!id) {
        throw new Error('Missing required parameter: id');
    }

    return await Tour.getSportIdByTourId(id);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getSportIdByTourId: getSportIdByTourId
}