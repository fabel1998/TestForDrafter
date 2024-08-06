import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setNotes } from '../slices/notesSlice';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    axios.get('/api/notes').then(response => {
      dispatch(setNotes(response.data));
    });
  }, [dispatch]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(filter.toLowerCase()) || 
    note.content.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedNotes = filteredNotes.sort((a, b) => 
    sort === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  );

  return (
    // Пример использование css modules
    <div className={styles.container}> 
      <h1>Заметки для Drafter</h1>
      <div className="mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Фильтровать заметки..." 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
        />
        <select 
          className="form-select mt-2" 
          value={sort} 
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="asc">Сортировка по заголовку (Ascending)</option>
          <option value="desc">Сортировка по заголовку (Descending)</option>
        </select>
      </div>
      <Link href="/note/create" passHref>
        <button className="btn btn-primary mb-3">Создать заметку</button>
      </Link>
      <div className="list-group">
        {sortedNotes.map(note => (
          <Link href={`/note/${note.id}`} passHref key={note.id}>
            <button className="list-group-item list-group-item-action">
              <h5>{note.title}</h5>
              <p>{note.content}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;