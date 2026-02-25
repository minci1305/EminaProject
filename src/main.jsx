import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'

function initializeApp() {
  const Parse = window.Parse;

  if (!Parse) {
    console.error("Parse SDK failed to load from CDN");
    return;
  }

  try {
    Parse.initialize(
     "dSgFcimEA5ChxXibirC2y9K0IYivJDsU67dlJFcu", 
  "vcvxWngpN5DAv7Xh9TSrnrMkRZinmy76lgU6OxnI"
    );

    Parse.serverURL = "https://parseapi.back4app.com/";

    console.log("parse initialized successfully");
  } catch (error) {
    console.error("parse error", error); 
  }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

}

initializeApp();






