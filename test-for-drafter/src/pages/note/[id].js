import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const NoteDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const note = useSelector(state => state.notes.notes.find(note => note.id === id));

  if (!note) {
    return <div>Страница не найдена</div>;
  }

  return (
    <div className="container">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <Link href={`/note/edit/${note.id}`}>
        <button  className="btn btn-primary">Редактирование</button >
      </Link>
      <Link href="/" passHref>
          <button className="btn btn-secondary ms-1">На главную</button>
        </Link>
    </div>
  );
};

export default NoteDetail;