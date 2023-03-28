import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { initialize } from './keycloak';

const root = ReactDOM.createRoot(document.getElementById('root'));
<<<<<<< Updated upstream
root.render(<p>Connecting to Keycloak...</p>)
initialize()
.then(()=> {
  root.render(
    
    <Provider store={store}>
    <App />
  </Provider>,
  
  )
})
.catch(()=> {
  root.render(
    <h1>Could not connect to Keyclaok server.</h1>
  )
})
=======

root.render(<h1>connecting</h1>)


initialize()
	.then(()=>{ 
		root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)})
  .catch(()=> {
  root.render(<h1>can't connect</h1>)
})

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
>>>>>>> Stashed changes

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
