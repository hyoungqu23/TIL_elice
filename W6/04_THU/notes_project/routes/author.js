const { Router } = require('express');
const Note = require('../models/note');

const router = Router();

router.get('/', (req, res, next) => {
    let authorArray = Note.authorList();
    res.json(authorArray);
})

router.get('/:author/notes', (req, res, next) => {
    const author = req.params.author;
    try {
        let notesByAuthor = Note.findByAuthor(author);
        res.json(notesByAuthor);    
    } catch (e) {
        next(e);
    }
})

module.exports = router;