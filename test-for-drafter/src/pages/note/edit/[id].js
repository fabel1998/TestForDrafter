import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from '../../../slices/notesSlice';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const EditNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const note = useSelector(state => state.notes.notes.find(note => note.id === id));

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedNote = { id, title, content };
    const response = await axios.put(`/api/notes/${id}`, updatedNote);
    dispatch(updateNote(response.data));
    router.push('/');
  };

  return (
    <div className="container">
      <h1>Edit Note</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Заголовок</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Содержание</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Обновить</button>
        <Link href="/" passHref>
          <button className="btn btn-secondary ms-1">На главную</button>
        </Link>
      </form>
    </div>
  );
};

export default EditNote;