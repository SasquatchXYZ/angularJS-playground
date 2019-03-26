const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());

const router = express.Router();

const notes = [
  {id: 1, label: 'First Note', author: 'Shyam'},
  {id: 2, label: 'Second Note', author: 'Brad'},
  {id: 3, label: 'Middle Note', author: 'Dalton'},
  {id: 4, label: 'Last Note Note', author: 'Eli'},
  {id: 5, label: 'Really the Last Note', author: 'Mats'},
];

let lastId = 6;

router.get('/note', (req, res) => {
  res.send(notes)
});

router.post('/note', (req, res) => {
  const newNote = req.body;
  newNote.id = lastId;
  lastId++;
  notes.push(newNote);
  res.send(newNote)
});

router.post('/note/:id/done', (req, res) => {
  const noteId = parseInt(req.params.id);

  const selectedNote = notes.find((note) => {
    return note.id === noteId;
  });

  selectedNote.label = `Done - ${selectedNote.label}`;

  /*let selectedNote;
  notes.forEach(note => {
    if (note.id === noteId) {
      return selectedNote = note
    }
    return selectedNote
  })
  selectedNote.label = `Done - ${selectedNote.label}`;*/
  res.send(notes)
});

router.get('/note/:id', (req, res) => {
  const selectedNote = notes.find(note => {
    return note.id === req.params.id
  });

  if (!selectedNote) {
    res.send({msg: 'Note not found'}, 404)
  }

  res.send(selectedNote)
});

router.post('/note/:id', (req, res) => {

  notes.forEach(note => {
    if (note.id === req.params.id) {
      note = req.body;
      res.send(note)
    }
    res.send({msg: 'Note not found'}, 404)
  })

});

router.post('/login', (req, res) => {
  console.log(req.body);
  console.log(`API LOGIN FOR ${req.body}`);
  res.send({msg: `Login successful for ${req.body.username}`})
});

app.use('/api', router);

app.listen(PORT);
console.log(`Open http://localhost:${PORT} to access the files...`);
