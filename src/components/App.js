import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ImageList from './ImageList';
import UploadImageForm from './UploadImageForm';
import classes from '../styles/App.module.css';
import { fetchAllImages } from '../store/imagesSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllImages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <h1>Cloud Gallery</h1>
      </header>
      <section className={classes.section}>
        <UploadImageForm />
        <ImageList />
      </section>
    </div>
  );
}

export default App;
