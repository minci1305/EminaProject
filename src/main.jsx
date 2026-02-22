import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StrictMode } from 'react'
import Parse from 'parse/dist/parse.min.js';

const PARSE_APP_ID = "dSgFcimEA5ChxXibirC2y9K0IYivJDsU67dlJFcu";
const PARSE_JS_KEY = "vcvxWngpN5DAv7Xh9TSrnrMkRZinmy76lgU6OxnI";
const SERVER_URL = 'https://parseapi.back4app.com/';

const parInit = async () => {
  try {
    await Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
    Parse.serverURL = SERVER_URL;
    console.log('Parse initialized successfully');
  } catch (error) {
    console.error('Error initializing Parse:', error);
  }
};

parInit();



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
); 



