import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import cuid from 'cuid';

function Dropzone({ accept, open, setImage, image }) {

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file) => {
            const reader = new FileReader();
            
            reader.onload = function (e) {
                setImage(
                    { id: cuid(), src: e.target.result },
                );
            };
            
            reader.readAsDataURL(file);
            return file;
        });
    }, []);
    
    const { getRootProps, getInputProps, isDragActive } = useDropzone({accept, onDrop});

    return (
        <div className="border-dashed border-2 border-sky-500 rounded-md py-4 px-4 mt-2">
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                    <p className="dropzone-content">
                        Release to drop the file here
                    </p>
                    ) : (
                    <p className="dropzone-content">
                        Drag and drop an image here, or 
                    </p>
                    )}
                    <button type="button" onClick={open} className="btn">
                    click to select a file
                    </button>
                </div>
            </div>
            <div className="form-container">
                <img className="w-80 object-center" src={image.src} alt=""/>
            </div>
        </div>
    );
}

export default Dropzone;