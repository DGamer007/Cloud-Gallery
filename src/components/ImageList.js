import { useSelector } from 'react-redux';
import ImageListItem from './ImageListItem';
import classes from '../styles/ImageList.module.css';

const ImageList = () => {
    const { images } = useSelector(state => state.images);

    return (
        <div className={classes.container}>
            <h1>Gallery</h1>
            {
                (images?.length > 0) ?
                    images.map(image => <ImageListItem key={image} id={image} />)
                    : <p>No Images</p>
            }
        </div>
    );
};

export default ImageList;