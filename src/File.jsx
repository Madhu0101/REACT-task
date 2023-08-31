// import { useState } from 'react';
// export function File() {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [errorUploadMessage, setErrorUploadMessage] = useState('');

//   const allowedFormats = ['.jpeg', '.png', '.jpg', '.bmp', '.webp'];

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     const invalidFiles = [];

//     const filteredFiles = files.filter((file) => {
//       const extension = file.name.split('.').pop().toLowerCase();
//       const validFormat = allowedFormats.includes('.' + extension);
//       const validSize = file.size <= 5 * 1024 * 1024;

//       if (!validSize) {
//         invalidFiles.push(file.name + ' (exceeds 5MB)');
//       }

//       if (!validFormat) {
//         invalidFiles.push(file.name + ' (unsupported format)');
//       }

//       return validFormat && validSize;
//     });

//     setSelectedFiles(filteredFiles);

//     if (invalidFiles.length > 0) {
//       setErrorUploadMessage(`The following file(s) have issues:\n${invalidFiles.join('\n')}`);
//     } else {
//       setErrorUploadMessage('');
//     }
//   };

//   const handleUpload = async () => {
//     try {
//       setUploading(true);
//       setProgress(0);

//       const invalidFiles = [];

//       for (let i = 0; i < selectedFiles.length; i++) {
//         const file = selectedFiles[i];

//         const extension = file.name.split('.').pop().toLowerCase();
//         const validFormat = allowedFormats.includes('.' + extension);
//         const validSize = file.size <= 5 * 1024 * 1024;

//         if (!validSize) {
//           invalidFiles.push(file.name + ' (exceeds 5MB)');
//         }

//         if (!validFormat) {
//           invalidFiles.push(file.name + ' (unsupported format)');
//         }

//         if (validFormat && validSize) {
//           await new Promise((resolve) => setTimeout(resolve, 1000));

//           setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);

//           setProgress(((i + 1) / selectedFiles.length) * 100);
//         }
//       }

//       if (invalidFiles.length > 0) {
//         setErrorUploadMessage(`The following file(s) cannot be uploaded:\n${invalidFiles.join('\n')}`);
//       } else {
//         setErrorUploadMessage('');
//       }

//       setSelectedFiles([]);
//       setUploading(false);
//       setProgress(0);
//     } catch (error) {
//       console.error('Error during upload:', error);
//       setUploading(false);
//       setProgress(0);
//     }
//   };

//   const handleDeleteFile = (index) => {
//     const updatedUploadedFiles = [...uploadedFiles];
//     updatedUploadedFiles.splice(index, 1);
//     setUploadedFiles(updatedUploadedFiles);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;

//     handleFileChange({ target: { files } });
//   };

//   const handleOpenFile = (file) => {
//     window.open(URL.createObjectURL(file), '_blank');
//   };

//   const handleDeleteSelectedFile = (index) => {
//     const updatedSelectedFiles = [...selectedFiles];
//     updatedSelectedFiles.splice(index, 1);
//     setSelectedFiles(updatedSelectedFiles);
//   };
//   const isUploadDisabled = uploading || selectedFiles.length === 0;
//   return (
//     <div className="choose-file">
//       <h2>Choose A File </h2>
//       <div className="innerchoose-file"
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <label className="custom-file-upload">
//           <input
//             type="file"
//             multiple onChange={handleFileChange} accept=".jpeg, .png, .jpg, .bmp, .webp" />
//           Browser!
//         </label>

//         <div className="selected-files">
//           {selectedFiles.map((file, index) => (
//             <div key={index} className="selected-file">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt={file.name}
//                 className="thumbnail" />
//               <button onClick={() => handleDeleteSelectedFile(index)}>
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="upload-progress">
//           <div
//             className="progress-bar"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         <button onClick={handleUpload} disabled={isUploadDisabled}
//           className={isUploadDisabled ? "disabled" : ""}
//         > 
//           Upload!!
//         </button>
//         {isUploadDisabled && (
//           <p className="error-message">Please select valid files to upload</p>
//         )}
//         {errorUploadMessage && <p style={{ color: 'red' }}>{errorUploadMessage}</p>}
//         {uploading && (
//           <div className="progress">
//             <div
//               className="progress-bar progress-bar-striped progress-bar-animated"
//               role="progressbar"
//               aria-valuenow={progress}
//               aria-valuemin="0"
//               aria-valuemax="100"
//               style={{ width: `${progress}%` }}
//             >
//               {progress}%
//             </div>
//           </div>
//         )}
//         {uploadedFiles.length > 0 && (
//           <div>
//             <h3>Uploaded Files:</h3>
//             <ul>
//               {uploadedFiles.map((file, index) => (
//                 <li key={index}>
//                   <a href={URL.createObjectURL(file)} download={file.name}>
//                     {file.name}
//                   </a>
//                   <button onClick={() => handleDeleteFile(index)}>Delete</button>
//                   <button onClick={() => handleOpenFile(file)}>Open</button>
//                   <img src={URL.createObjectURL(file)} alt={file.name} className="thumbnail" />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import './App.css';

export function File() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorUploadMessage, setErrorUploadMessage] = useState('');
  const isUploadDisabled = uploading || selectedFiles.length === 0;
  const allowedFormats = ['.jpeg', '.png', '.jpg', '.bmp', '.webp'];
  useEffect(() => {
    if (!uploading) {
      setProgress(0);
    }
  }, [uploading]);
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const invalidFiles = [];

    const filteredFiles = files.filter((file) => {
      const extension = file.name.split('.').pop().toLowerCase();
      const validFormat = allowedFormats.includes('.' + extension);
      const validSize = file.size <= 5 * 1024 * 1024;

      if (!validSize) {
        invalidFiles.push(file.name + ' (exceeds 5MB)');
      }

      if (!validFormat) {
        invalidFiles.push(file.name + ' (unsupported format)');
      }

      return validFormat && validSize;
    });

    setSelectedFiles(filteredFiles);

    if (invalidFiles.length > 0) {
      setErrorUploadMessage(`The following file(s) have issues:\n${invalidFiles.join('\n')}`);
    } else {
      setErrorUploadMessage('');
    }
  };

  const handleUpload = async () => {
    try {
      setUploading(true);
      setProgress(0);
  
      const invalidFiles = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
  
        const extension = file.name.split('.').pop().toLowerCase();
        const validFormat = allowedFormats.includes('.' + extension);
        const validSize = file.size <= 5 * 1024 * 1024;
  
        if (!validSize) {
          invalidFiles.push(file.name + ' (exceeds 5MB)');
        }
  
        if (!validFormat) {
          invalidFiles.push(file.name + ' (unsupported format)');
        }
  
        if (validFormat && validSize) {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          setUploadedFiles((prevUploadedFiles) => [...prevUploadedFiles, file]);

          setProgress(((i + 1) / selectedFiles.length) * 100);
        }
      }
      if (invalidFiles.length > 0) {
        setErrorUploadMessage(`The following file(s) cannot be uploaded:\n${invalidFiles.join('\n')}`);
      } else {
        setErrorUploadMessage('');
      }
  
      setSelectedFiles([]);
      setUploading(false);
      setProgress(0);
    } catch (error) {
      console.error('Error during upload:', error);
      setUploading(false);
      setProgress(0);
    }
  };

  const handleDeleteFile = (index) => {
    const updatedUploadedFiles = [...uploadedFiles];
    updatedUploadedFiles.splice(index, 1);
    setUploadedFiles(updatedUploadedFiles);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileChange({ target: { files } });
  };

  const handleOpenFile = (file) => {
    window.open(URL.createObjectURL(file), '_blank');
  };

  const handleDeleteSelectedFile = (index) => {
    const updatedSelectedFiles = [...selectedFiles];
    updatedSelectedFiles.splice(index, 1);
    setSelectedFiles(updatedSelectedFiles);
  };

  return (
    <div className="choose-file">
      <h2>Choose A File</h2>
      <div
        className="innerchoose-file"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label className="custom-file-upload">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".jpeg, .png, .jpg, .bmp, .webp"
          />
          Browser!
        </label>

        <div className="selected-files">
          {selectedFiles.map((file, index) => (
            <div key={index} className="selected-file">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="thumbnail"
              />
              <button onClick={() => handleDeleteSelectedFile(index)}>
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="upload-progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploadDisabled}
          className={`upload-button ${isUploadDisabled ? 'disabled' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Upload!!'}
        </button>

        {(selectedFiles.length === 0 && !uploading) && (
          <p className="error-message" style={{ color: 'red' }}>Please select files to upload </p>
         



        )}
        {errorUploadMessage && <p style={{ color: 'red' }}>{errorUploadMessage}</p>}
        {uploading && (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        )}
        {uploadedFiles.length > 0 && (
          <div>
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>
                  <a href={URL.createObjectURL(file)} download={file.name}>
                    {file.name}
                  </a>
                  <button onClick={() => handleDeleteFile(index)}>Delete</button>
                  <button onClick={() => handleOpenFile(file)}>Open</button>
                  <img src={URL.createObjectURL(file)} alt={file.name} className="thumbnail" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
