const News = require('../controllers/news');

module.exports = function (app) {

    // Route to get all news
    app.route('/news').get(async (req, res, next) => {
        try {
            return res.json(await News.getAllNews());
        } catch (err) {
            return next(err);
        }
    });

    // Route to create news
    app.route('/news').post(async (req, res, next) => {
        try {
            const newsId = await News.createNews(req.body);
            return res.status(201).json({ message: "News created successfully", id: newsId });
        } catch (err) {
            return next(err);
        }
    });

    // Route to get news by match ID
    app.route('/news/match/:matchId').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByMatchId(req.params.matchId));
        } catch (err) {
            return next(err);
        }
    });

    // Route to get news by tour ID
    app.route('/news/tour/:tourId').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsByTourId(req.params.tourId));
        } catch (err) {
            return next(err);
        }
    });

    // Route to get news by sport ID
    app.route('/news/sport/:sportId').get(async (req, res, next) => {
        try {
            return res.json(await News.getNewsBySportId(req.params.sportId));
        } catch (err) {
            return next(err);
        }
    });
}