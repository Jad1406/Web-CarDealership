import React from 'react'
import Header from '../components/Header'

const EmployeeProfile = () => {
  return (
    <div>
      <Header title="Employee Profile"/>
      <div id="EmployeeInfo">
        <p>Employee Name: </p>
        <p>Employee ID: </p>
        <p>Employee Email: </p>
        <p>Employee Phone: </p>
        <p>Employee Position: </p>
      </div>
      <div id="EmployeeOptions">
        <button id="EmployeeEdit">Edit Profile</button>
        <button id="EmployeeDelete">Delete Profile</button>
      </div>
      <div id="PendingAppointments">
        <div id="SaleAppointments">
          <p>Upcomming Sales</p>
        </div>

        <div id="RentalAppointments">
          <p>Upcomming Rentals</p>
        </div>
        <div id="RepairAppointments">
          <p>Upcomming Repairs</p>
        </div>
        <div id="PartSaleAppointments">
          <p>Upcomming Part Sales</p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeProfile
