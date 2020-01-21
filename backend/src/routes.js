const { Router } = require('express');
const routes = Router();

const devController = require('./controller/devController');
const searchController = require('./controller/searchController');

routes.get('/devs', devController.index);
routes.post('/devs', devController.store);
routes.put('/devs/:github_username', devController.update);
routes.delete('/devs/:github_username', devController.destroy);

routes.get('/search', searchController.index);

module.exports = routes;
