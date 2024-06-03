const Match = require('../controllers/match');

module.exports = function (app) {
    app.route('/matches').get(async (req, res, next) => {
        try {
            return res.json(await Match.getAllMatches());
        } catch (err) {
            return next(err);
        }
    });

    // Route to get news by tour ID
    app.route('/matches/:matchId').get(async (req, res, next) => {
        try {
            return res.json(await Match.getTourIdAndSportIdByMatchId(req.params.matchId));
        } catch (err) {
            return next(err);
        }
    });
}