import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerForm from './Components/Customer/CustomerForm/CustomerForm';
import Signin from './Components/Signin/Signin';
import Signup from './Components/SignUp/Signup';

import Customer from './Page/Customer/Customer';
import SecuredRoutes from './Components/SecuredRoutes/SecuredRoutes';
import User from './Components/User/User';
import Userfrom from './Components/User/Userform';
import TicketList from './Components/TicketList/TicketList';
import TicketForm from './Components/TicketList/TicketForm';



function App() {
  return (
    <div>

      <Router>
        <Routes>

          {/* <Route path="/signup" element={<Signup />}></Route> */}
          <Route path='/' element={
            <SecuredRoutes>
              <Customer /> </SecuredRoutes>}></Route>
          <Route path='/ticketForm' element={
            <SecuredRoutes>
              <TicketForm /> </SecuredRoutes>}></Route>
          <Route path='/ticketForm/:name' element={
            <SecuredRoutes>
              <TicketForm /> </SecuredRoutes>}></Route>
          <Route path='/ticket' element={
            <SecuredRoutes> <TicketList />
            </SecuredRoutes>}></Route>

          <Route path='/form' element={<SecuredRoutes> <CustomerForm /></SecuredRoutes>}></Route>
          <Route path='/form/:name' element={<CustomerForm />}></Route>
          <Route path='/signin' element={<Signin />}></Route>
          <Route path='/user' element={<SecuredRoutes> <User /></SecuredRoutes>}></Route>
          <Route path='/userForm' element={<SecuredRoutes> <Userfrom /></SecuredRoutes>}></Route>
          <Route path="/userForm/:username" element={<SecuredRoutes> <Userfrom /></SecuredRoutes>}></Route>
        </Routes>
      </Router>
    </div >
  )
}




export default App;
