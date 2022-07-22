import { useDispatch } from 'react-redux';
import { deleteImage } from '../store/imagesSlice';
import classes from '../styles/ImageListItem.module.css';

const ImageListItem = ({ id }) => {
    const dispatch = useDispatch();

    return (
        <div className={classes.container} >
            <a href={`/api/get/image/${id}`} rel="noreferrer" target='_blank'>
                <img alt={id} src={`/api/get/image/${id}`} />
            </a>
            <button onClick={() => { dispatch(deleteImage(id)); }} >Delete Image</button>
        </div>
    );
};

export default ImageListItem;