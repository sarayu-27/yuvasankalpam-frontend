  import { BrowserRouter } from 'react-router-dom';
  import { createRoot } from 'react-dom/client'
  import './styles/main.scss';
  import App from './App.jsx';
  import { Provider } from 'react-redux';
  import { PersistGate } from 'redux-persist/integration/react'; // PersistGate for redux-persist
  import store, { persistor } from './store'; 

  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Provider store={store}> {/* Wrap the app with Redux Provider */}
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}> {/* Wrap with PersistGate */}
          <App />
          </PersistGate>
        </Provider>
    </BrowserRouter>
  )
