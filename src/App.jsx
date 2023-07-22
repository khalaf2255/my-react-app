import { useEffect, useState } from "react";
import { useLocalStorageState } from "./useLocalStorageState";

import "./index.css";

export default function App() {
   
  const myDate = new Date();
  const [hour, setHour] = useState("");
  const [mints, setMints] = useState("");
  const [secondes, setSecondes] = useState("");

  
  const [noteValue, setNoteValue] = useState("");
  const [notes, setNotes] = useLocalStorageState([], "note");
  const [toggleEdit, setToggleEdit] = useState(false);
  const [selectedIdEdit, setSelectedIdEdit] = useState(false);
  let [editNote, setEditNote] = useState("");

  const TIME = `${hour === 12 ? 24 : 12}:${mints}:${secondes}${
    hour > 12 ? " PM" : " AM"
  } `;

  useEffect(() => {
    function getTime() {
      setTimeout(() => {
        setHour((hour) => myDate.getHours());
        setMints((mints) => myDate.getMinutes());
        setSecondes((secondes) => myDate.getSeconds());
      }, 1000);
    }
    getTime();
  }, [myDate, hour, secondes, mints]);
  function setNotesFunc(newNote) {
    if (!noteValue) return;
    setNotes((notes) => [...notes, newNote]);
    setNoteValue("");
  }
  function deleteNote(id) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }

  function editNoteFunc(id) {
    setToggleEdit((toggleEdit) => (toggleEdit = !toggleEdit));
    setEditNote(
      notes.map((note) => (note.id === id ? (editNote = note.title) : ""))
    );
    setSelectedIdEdit(id);
  }
  function hideEditHorm() {
    setToggleEdit((toggleEdit) => (toggleEdit = !toggleEdit));
  }
  function saveEdit(id) {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, title: editNote } : note
      )
    );
    hideEditHorm();
  }
  function checkNote(item) {
    setNotes((notes) =>
      notes.map((note) =>
        note.id === item.id ? { ...note, done: !note.done } : note
      )
    );
  }

  return (
    <div className="items">
      <h1>Write dayily note</h1>
      <div className="body__notes">
        <Note
          notes={notes}
          setNoteValue={setNoteValue}
          noteValue={noteValue}
          TIME={TIME}
          setNotesFunc={setNotesFunc}
          deleteNote={deleteNote}
          editNote={editNote}
          editNoteFunc={editNoteFunc}
          checkNote={checkNote}
        />
        {toggleEdit && (
          <div className="edit__copm">
            <Edit
              editNoteFunc={editNoteFunc}
              setEditNote={setEditNote}
              editNote={editNote}
              setToggleEdit={setToggleEdit}
              hideEditHorm={hideEditHorm}
              saveEdit={saveEdit}
              selectedIdEdit={selectedIdEdit}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Note({
  notes,
  setNoteValue,
  noteValue,
  TIME,
  setNotesFunc,
  editNoteFunc,
  editNote,
  setEditNote,
  deleteNote,
  checkNote,
}) {
  return (
    <div className="all__notes">
      {notes.map((note) => (
        <div className={note.done ? "done note" : "note"} key={note.id}>
          <p className={note.done ? "lineThorow" : ""}>{note.title}</p>
          <div className="controls">
            <p className={note.done ? "lineThorow" : ""}>{note.time}</p>
            <span className="edit" onClick={() => editNoteFunc(note.id)}>
              ✏
            </span>
            <span className="check" onClick={() => checkNote(note)}>
              {!note.done ? "✔" : "✖"}
            </span>
            <span className="delete" onClick={() => deleteNote(note.id)}>
              🗑
            </span>
          </div>
        </div>
      ))}

      <Form
        setNoteValue={setNoteValue}
        noteValue={noteValue}
        TIME={TIME}
        setNotesFunc={setNotesFunc}
      />
    </div>
  );
}

function Form({ noteValue, setNoteValue, TIME, setNotesFunc }) {
  const newNote = {
    id: Date.now(),
    title: noteValue,
    time: TIME,
    done: false,
  };
  return (
    <div className="form__note">
      <div className="form">
        <textarea
          type="text"
          placeholder="Write dayily note..."
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
        />
        <button onClick={() => setNotesFunc(newNote)}>Add note</button>
      </div>
    </div>
  );
}

function Edit({
  editNote,
  setEditNote,
  hideEditHorm,
  saveEdit,
  selectedIdEdit,
}) {
  return (
    <div className="edit__form">
      <span onClick={hideEditHorm} className="close">
        ✖
      </span>
      <textarea
        type="text"
        value={editNote}
        onChange={(e) => setEditNote(e.target.value)}
      />
      <div className="parent__save">
        <button onClick={() => saveEdit(selectedIdEdit)} className="save">
          Save Changes
        </button>
      </div>
    </div>
  );
}
