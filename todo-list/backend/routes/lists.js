const router = require('express').Router();
let List = require('../models/list.model');

router.route('/').get((req, res) => {
    List.find()
    .then(lists => res.json(lists))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const newList = new List({description, date});
    newList.save()
    .then(() => res.json('List added!'))
    .catch(err => res.status(400).json('Error: '+err));
})

router.route('/:id').delete((req, res) => {
    List.findByIdAndDelete(req.params.id)
    .then(() => res.json('List deleted.'))
    .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;