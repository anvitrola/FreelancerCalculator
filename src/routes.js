const express = require('express');
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController.js");
const JobController = require("./controllers/JobController.js");


routes.get('/', JobController.index);

routes.get('/job', JobController.create);
routes.post('/job', JobController.save);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/index', (req, res) => res.redirect('/'));


module.exports = routes;
