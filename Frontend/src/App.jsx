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
import Repairs from './pages/Repairs';
import UserList from './dbCalls/UserList';
import RentalForm from './components/RentalForm';

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
            <Route path="/Repairs" element={<Repairs />} />
            <Route path="/users" element={<UserList />} />

            <Route path="/rentalForm" element={<RentalForm />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
