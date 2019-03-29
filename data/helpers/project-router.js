
const db = require('../dbConfig.js');

const router = require('express').Router();

router.post('/', async (req,res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({error:'missing name/description'});
    } else {
        try {
            const result = await db('projects').insert(req.body);
            res.status(201).json(result);
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
});

router.get('/', async (req,res) => {
    try {
        const result = await db('projects');
        res.status(200).json(result);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const project = await db('projects').where({id}).first();
        const actions = await db('actions').where({'project_id':id});
        const result = {
            ...project,
            actions: [...actions]
        };
        res.status(200).json(result);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    if (!req.body) {
        res.status(400).json({error:'Please provide a description / name'});
    }
    else {
        try {
            const changes = await db('projects').where({id}).update(req.body);
            if (changes) {
                const result = await db('projects').where({id}).first();
                res.status(200).json(result);
            } else {
                res.status(404).json({error:"id not found"});
            }
        }
        catch(err) {
            res.status(500).json({error:"Failed to update resource."});
        }
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const removed = await db('projects').where({id}).del();
        if (removed) {
            res.status(200).json({message:"Resource deleted."});
        }
        else {
            res.status(404).json({error:"Cannot find action with that ID."});
        }
    }
    catch(err) {
        res.status(500).json({error:"Failed to delete resource."});
    }
});

module.exports = router;
