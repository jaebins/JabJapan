import React from 'react';
import ReactDOM from 'react-dom/client';
import TranslateApp from './TranslateApp';
import PracticeApp from './PracticeApp';
import SaveWordMap from "./components/translate/saveWordMap/saveWordMap"
import Dictionary_Word from "./components/practice/sources/dictionary_Word"
import "./components/index.css"
import Suhyeon from "./suhyeon"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<TranslateApp/>} path="/"></Route>
        <Route element={<PracticeApp/>} path="/practice"></Route>
        <Route element={<Dictionary_Word/>} path="/dictionary_Word"></Route>
        <Route element={<SaveWordMap/>} path="/saveWordMap"></Route>
        <Route element={<Suhyeon/>} path="/suhyeon"></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
