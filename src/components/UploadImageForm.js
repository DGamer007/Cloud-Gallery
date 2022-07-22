import { useDispatch } from 'react-redux';
import { uploadImages } from '../store/imagesSlice';
import classes from '../styles/UploadImageForm.module.css';

const UploadImageForm = () => {

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const images = e.target.elements.images.files;

        if (images.length < 1) {
            alert('Please select at least one image.');
            return;
        }
        if (images.length > 5) {
            alert('You cannot upload more than 5 Images at a time.');
            return;
        }

        dispatch(uploadImages(images));
    };

    return (
        <div>
            <form className={classes.form} onSubmit={handleSubmit}>
                <input type="file" name="images" className={classes.fileinput} multiple />
                <button type="submit" className={classes.submitbutton}>Upload</button>
            </form>
        </div>
    );
};

export default UploadImageForm;