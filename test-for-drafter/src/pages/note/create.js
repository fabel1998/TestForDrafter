import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../slices/notesSlice';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    const response = await axios.post('/api/notes', newNote);
    dispatch(addNote(response.data));
    router.push('/');
  };

  return (
    <div className="container">
      <h1>Создать заметку</h1>
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
        <button type="submit" className="btn btn-primary">Создать заметку</button>
        <Link href="/" passHref>
          <button className="btn btn-secondary ms-1">На главную</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateNote;