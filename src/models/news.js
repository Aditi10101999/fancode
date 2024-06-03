const mysql = require('../lib/mysql');

const createNews = async (title = null, description = null, matchId = null, tourId = null, sportId = null) => {
    
    const newsResult = await mysql.query(
        '    INSERT INTO news (title, description)' +
        '    VALUES (?, ?)'
        , [title, description]);

    const newsId = newsResult.insertId;

    await mysql.query(
        '    INSERT INTO news_relations (newsId, matchId, tourId, sportId)' +
        '    VALUES (?, ?, ?, ?)'
        , [newsId, matchId, tourId, sportId]);

    return newsId;
}

const getNewsByMatchId = async (matchId) => {
    const statement =
        '    SELECT n.id, n.title, n.description ' +
        '    FROM news n ' +
        '    INNER JOIN news_relations nr ON n.id = nr.newsId ' +
        '    WHERE nr.matchId = ?'
        ;
    const [rows] = await mysql.query(statement, [matchId]);
    return rows;
}

const getNewsByTourId = async (tourId) => {
    const statement =
        '    SELECT n.id, n.title, n.description ' +
        '    FROM news n' +
        '    INNER JOIN news_relations nr ON n.id = nr.newsId' +
        '    WHERE nr.tourId = ?'
        ;
    const [rows] = await mysql.query(statement, [tourId]);
    return rows;
}

const getNewsBySportId = async (sportId) => {
    const statement =
        '    SELECT n.id, n.title, n.description ' +
        '    FROM news n ' +
        '    INNER JOIN news_relations nr ON n.id = nr.newsId ' +
        '    WHERE nr.sportId = ?'
        ;
    const [rows] = await mysql.query(statement, [sportId]);
    return rows;
}

const getAllNews = async () => {
    const statement = 'select * from news;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllNews: getAllNews,
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsByTourId: getNewsByTourId,
    getNewsBySportId: getNewsBySportId
}