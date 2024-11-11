import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ThemeContext from "./context/ThemeContext";
import { RegistrationProvider } from './context/RegistrationContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='/'>
        <ThemeContext>
          <RegistrationProvider>
          <App />
          </RegistrationProvider>
        </ThemeContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
