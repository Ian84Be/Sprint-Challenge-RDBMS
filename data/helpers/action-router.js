
const db = require('../dbConfig.js');

const router = require('express').Router();

router.post('/', async (req,res) => {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json({error:'missing name/description'});
    } else {
        try {
            const result = await db('actions').insert(req.body);
            res.status(201).json(result);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
});
