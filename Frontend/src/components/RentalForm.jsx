import React from "react";
import { use } from "react";
import { useState, useEffect } from "react";

const RentalForm = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const user_id = localStorage.getItem('user_id');
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        appointment_type: "",
        appointment_description: "",
        appointment_status: "",
        appointment_due_date: "",
        car_manufacturer: "",
        car_model: "",
        car_year: "",
        employee_id: "",
        user_id: user_id,
    });
    let appointment_id;


    // Fetch all users from the database on page load, and on change in the API
    useEffect(() => {

        //Create the fetch users function
        const fetchUsers = async () => {

            try {
                const response = await fetch(`http://localhost:9000/api/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                //Throw an error if no response was caught
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                //Otherwise, get the data into an array name usersData, then set the users array to have the data fetched from the api.
                const usersData = await response.json();
                setAllUsers(usersData);


            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Find user after allUsers is updated
    useEffect(() => {
        if (allUsers.length > 0) {
            const user = allUsers.find((user) => user.user_id == user_id);

            if (user) {
                console.log("User found:", user);
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setEmail(user.user_email);
                setUsername(user.username);
            } else {
                console.log("User not found.");
            }
        }
    }, [allUsers, user_id]);

    //Fetch all the employees on page load
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/employees", {
                    method: 'GET',
                });
                const result = await response.json();
                console.log("Employees:", result);
                setEmployees(result);
            } catch (error) {
                console.log(error, "get method error");
            }
        };

        fetchEmployees();
    }, []);

    //Fetch the appointments length
    useEffect(() => {

        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/appointments", {
                    method: 'GET',
                });
                const result = await response.json();
                console.log("Appointments:", result);
                appointment_id = result.length + 1;
            } catch (error) {
                console.log(error, "get method error");
            }
        };

        fetchAppointments();

    }, []);

    return (
        <div className="container mx-auto flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            {/* Form Title */}
            <div className="text-gray-900 text-3xl font-bold mb-6">
                Form for {username}
            </div>

            {/* Appointment ID Display */}
            <div className="mt-6 text-gray-700 font-semibold mb-2">Appointment ID: {appointment_id}</div>

            {/* Form Container */}
            <form className="flex flex-col gap-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                
                {/* User's First & Last Name */}
                <div className="flex gap-4">
                    <input type="text" id="userFirstName" value={firstName} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />
                    <input type="text" id="userLastName" value={lastName} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />
                </div>

                {/* User's Email */}
                <input type="text" id="userEmail" value={email} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />

                {/* Appointment Type & Date */}
                <div className="flex gap-4">
                    <input type="text" id="selectAppointmentType" value={props.Type} readOnly className="w-1/2 p-3 border rounded-lg bg-gray-200 text-gray-700" />
                    <input type="date" id="appointmentDate" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                {/* Car Manufacturer & Model Year */}
                <div className="flex gap-4">
                    <input type="text" id="carType" placeholder="Enter your car manufacturer" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    <select id="selectCarModelYear" className="w-1/2 p-3 border rounded-lg bg-white">
                        {Array.from({ length: 2025 - 1980 }, (_, index) => (
                            <option key={index} value={1980 + index}>
                                {1980 + index}
                            </option>
                        ))}
                    </select>
                </div>

                {/* User's Car Model */}
                <input type="text" id="userCarModel" placeholder="Enter your car model here" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                {/* Employee Selection */}
                <select id="selectAnEmployee" className="w-full p-3 border rounded-lg bg-white">
                    {employees.map((employee) => (
                        <option key={employee.employee_id} value={employee.employee_id}>
                            {employee.employee_first_name} {employee.employee_last_name}
                        </option>
                    ))}
                </select>

                {/* Submit Button */}
                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
                    Submit
                </button>
            </form>

            
        </div>

    )
}

export default RentalForm
