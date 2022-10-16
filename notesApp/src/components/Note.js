import './Note.css'


const Note = ({ note, toggleImportanceOf }) => {
  const label = note.important
    ? 'make not important' : 'make important'
  return (
    <li className='note'>
      {note.content} created at {note.date.split('T')[0]}
      <button onClick={toggleImportanceOf}>{label}</button>
    </li>
  )
}

export default Note