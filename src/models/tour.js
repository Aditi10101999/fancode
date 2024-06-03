const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {

    const { name, page: pageNum, pageSize: size } = params;

    const page = parseInt(pageNum) || 1;
    const pageSize = parseInt(size) || 10;
    const offset = (page - 1) * pageSize;
    
    const statement = 'select matches.* from matches left join tours on matches.tourId = tours.id where tours.name = ? LIMIT ? OFFSET ?';
    const parameters = [name,pageSize,offset];
    return await mysql.query(statement, parameters);
}

const getSportIdByTourId = async (tourId) => {
    try {
        const statement = 'select t.sportId from tours t where t.id = ?';
        const [rows] = await mysql.query(statement, [tourId]);
        return rows;
    } catch (error) {
        console.log("error occureed in tour : ", error);
    }
}


module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getSportIdByTourId: getSportIdByTourId
}