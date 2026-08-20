import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client';
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';



Amplify.configure(outputs);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
