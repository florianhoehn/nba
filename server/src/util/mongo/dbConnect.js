'use strict';

var config = require('../../../config');
var mongojs = require('mongojs');
var collections = ['events'];
var db = mongojs(config.mongo_url, collections);

module.exports = db;