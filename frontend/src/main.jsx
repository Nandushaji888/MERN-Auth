import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import {PrivateRouter,adminPrivateRouter} from './Private/PrivateRoute.jsx';
import FormContainer from './components/FormContainer';
import store from './store.js'
import { Provider } from 'react-redux';
import Registration from './components/Registration.jsx';
import UserProfile from './components/UserProfile.jsx';
import UserTable from './components/admin/UserTable.jsx'; 
import AdminLogin from './components/admin/AdminLogin.jsx';
import EditUser from './components/admin/EditUser.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route Component={App} path='/' />
          <Route Component={FormContainer} path='/login' />
          <Route Component={Registration} path='/register' />
          <Route Component={PrivateRouter} path=''>
            <Route Component={UserProfile} path='/profile' />
          </Route>
          <Route Component={adminPrivateRouter} path=''>
            <Route Component={UserTable} path='/userList' />
          </Route>
          <Route Component={adminPrivateRouter} path=''>
            <Route Component={EditUser} path='/manageUser' />
          </Route>
          <Route Component={AdminLogin} path='/admin/login' />
        </Routes>
      </Provider>
    </Router>
  </React.StrictMode>,
)
