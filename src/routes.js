const express = require('express');
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController.js");
const JobController = require("./controllers/JobController.js");
const DashboardController = require("./controllers/DashboardController.js")


routes.get('/', DashboardController.index);

routes.get('/job', JobController.create);
routes.post('/job', JobController.save);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/index', (req, res) => res.redirect('/'));


module.exports = routes;
