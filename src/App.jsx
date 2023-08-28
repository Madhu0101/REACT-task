
import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import './App.css';

export default function App() {
  
return (
  
  <div className="app-detail">
  <h1>FILE UPLOADING FUNCTIONALITY</h1>
  <Link to="/">Home</Link>
  <Link to="/choosefile">File</Link>

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/choosefile" element={<File />} />
 
  </Routes>
  </div>
);
}

function Home() {
  return (
    <div className="title_text">
      <h3>WELCOME TO THE UPLOAD FUNCTIONALITY!!</h3>
      <img src="https://t4.ftcdn.net/jpg/04/12/33/73/360_F_412337340_OLZtKnEC0eiwqR6eDD8Jl3PRypKWp1s4.jpg" alt="file" />
    
    </div>
  );
  }

export function File() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [errorUploadMessage, setErrorUploadMessage] = useState('');

  const allowedFormats = ['.jpeg', '.png', '.jpg', '.bmp', '.webp'];

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

  return (
    <div className="choose-file">
      <h2>Choose A File </h2>
      <div className="innerchoose-file"
           onDragOver={handleDragOver}
           onDrop={handleDrop}
      >
        <label className="custom-file-upload">
          <input type="file" multiple onChange={handleFileChange} accept=".jpeg, .png, .jpg, .bmp, .webp" />
          Add Files
        </label>
        <button onClick={handleUpload} disabled={uploading || selectedFiles.length === 0}>
          Upload!!
        </button>
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
            <h2>Uploaded Files:</h2>
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

//   return (
//     <div className="choose-file">
//       <h2>Choose A File </h2>
//       <div
//         className="innerchoose-file"
//         onDragOver={handleDragOver}
//         onDrop={handleDrop}
//       >
//         <label className="custom-file-upload">
//           <input
//             type="file"
//             multiple
//             onChange={handleFileChange}
//             accept=".jpeg, .png, .jpg, .bmp, .webp"
//           />
//           Add Files
//         </label>
//         <button onClick={handleUpload} disabled={uploading || selectedFiles.length === 0}>
//           Upload!!
//         </button>
//         {errorUploadMessage && <p style={{ color: 'red' }}>{errorUploadMessage}</p>}
//         {uploading && <p>Uploading...</p>}
//         {progress > 0 && <p>Progress: {progress}%</p>}

//         {uploadedFiles.length > 0 && (
//           <div>
//             <h2>Uploaded Files:</h2>
//             <ul>
//               {uploadedFiles.map((file, index) => (
//                 <li key={index}>
//                   {file.name}
//                   <button onClick={() => handleDeleteFile(index)}>Delete</button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }