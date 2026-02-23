import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
//import Parse from 'parse';
import { initParse } from './parseClient.js';


initParse();
//Parse.initialize("dSgFcimEA5ChxXibirC2y9K0IYivJDsU67dlJFcu", "vcvxWngpN5DAv7Xh9TSrnrMkRZinmy76lgU6OxnI");
//Parse.serverURL="https://parseapi.back4app.com";

//console.log("Parse loaded:", typeof Parse.initialize());

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);





