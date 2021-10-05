const store = require('../db/store');
const router = require('express').Router()





router.get("/notes",(req, res) => {
 store
 .getNotes()
 .then((notes)=>{
     return res.json(notes)
 })
 .catch((error)=> res.status(500).json(error))
});

router.post("/notes",(req, res) => {
store
.addNote(req.body)
.then((note)=>res.json(note))
.catch((error)=> res.status(500).json(error))
});

router.delete("/notes/:id", (req, res) => {
    store
      .deletNote(req.params.id)
      .then(() => res.json({ ok: true }))
      .catch((err) => res.status(500).json(err));
  });


module.exports = router