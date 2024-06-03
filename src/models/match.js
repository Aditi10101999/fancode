const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getTourIdAndSportIdByMatchId = async (matchId) => {
    const statement = 'select m.tourId,t.sportId from matches m left join tours t on m.tourId = t.id where m.id = ?';
    const [rows] = await mysql.query(statement, [matchId]);
    return rows;
}

module.exports = {
    getAllMatches:getAllMatches,
    getTourIdAndSportIdByMatchId: getTourIdAndSportIdByMatchId
}