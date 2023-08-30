
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import { File } from "./File";

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
      <img src="https://www.weavy.com/hs-fs/hubfs/File%20uploaders.png?width=1200&name=File%20uploaders.png" alt="file" />
    </div>
  );
}


