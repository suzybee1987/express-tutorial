const express = require('express');
const sessions = require('../data/sessions.json');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');

const sessionRouter = express.Router();
sessionRouter.route('/')
    .get((req, res) => {
        const url = 'mongodb+srv://dfu05229:syM0UvKhtc5sgMMo@globomantics.2ljjl.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to the MongoDB');
                const db = client.db(dbName);
                const sessions = await db.collection('sessions').find().toArray();

                res.render('sessions', { sessions, });
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        })();
    });

sessionRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id;
        const url = 'mongodb+srv://dfu05229:syM0UvKhtc5sgMMo@globomantics.2ljjl.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'globomantics';

        (async function mongo() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connected to the MongoDB');
                const db = client.db(dbName);
                const session = await db.collection('sessions').findOne({ _id: new ObjectID(id) });

                res.render('session', { session });
            } catch (error) {
                debug(error.stack);
            }
            client.close();
        })();
    });

module.exports = sessionRouter;