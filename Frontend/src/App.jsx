import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage';
import LoginPage from './pages/LoginPage';
import CarsForSaleOrRent from './pages/CarsForSaleOrRent';
import EmployeeProfile from './pages/EmployeeProfile';
import Parts from './pages/Parts';
import CustomerProfile from './pages/CustomerProfile';
import Market from './pages/Market';
import RecoverAccount from './pages/RecoverAccount';
import RentalForm from './components/RentalForm';
import AdminPannel from './pages/AdminPannel';
import RequestedPart from './pages/RequestedPart';
import Checkout from './pages/CheckoutMenu';
import CarSimulation from './pages/CarSimulation';
import ChatBot from './components/ChatBot';


// const apiUrl = process.env.REACT_APP_API_URL;

function App(){

    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/Signin_Page" element={<SigninPage />} />
            <Route path="/Login_Page" element={<LoginPage />} />
            <Route path="/Cars_For_Sale_Or_Rent" element={<CarsForSaleOrRent />} />
            <Route path="/Employee_Profile" element={<EmployeeProfile />} />
            <Route path="/Parts" element={<Parts />} />
            <Route path="/Customer_Profile" element={<CustomerProfile />} />
            <Route path="/Market" element={<Market />} />
            <Route path="/Recover_Account" element={<RecoverAccount />} />
            <Route path="/Admin_Pannel" element={<AdminPannel />} />
            <Route path="/Rental_Form" element={<RentalForm />}></Route>
            <Route path="/Requested_Part" element={<RequestedPart />}></Route>
            <Route path="/Checkout" element={<Checkout />}></Route>
            <Route path="/Simulation" element={<CarSimulation />}></Route>
            <Route path="/ChatBot" element={<ChatBot />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
