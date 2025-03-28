import React from "react";
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
        appointment_status: "incomplete",
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

    //To make sure the correct data is sent, and not empty data (since in a handleSubmit function, refresh happened before updating the form data, so a wrong payload had been sent).
    useEffect(() => {
        if (formData.appointment_due_date !== "") {
            console.log("Form Data:", formData);
        }
    }, [formData]);
    
    //Post the data to the appointments table
    useEffect(() => {
        const postAppointment = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/appointments", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const result = await response.json();
                console.log("Appointment created:", result);
            } catch (error) {
                console.log(error, "post method error");
            }
        };

        if (formData.appointment_due_date !== "") {
            postAppointment();
            
        }
    }, [formData]);

    function handleClose(){
        document.body.style.overflow = 'auto';
        props.closeForm();
    }

    function handleSubmit(e){
        // e.preventDefault();
        setFormData({
            ...formData,
            appointment_type: props.actionType,
            appointment_description: props.actionType,
            appointment_due_date: document.getElementById("appointmentDate").value,
            car_manufacturer: document.getElementById("carType").value,
            car_model: document.getElementById("userCarModel").value,
            car_year: document.getElementById("selectCarModelYear").value,
            employee_id: document.getElementById("selectAnEmployee").value,
        });    
        // props.closeForm();
    }

    //To prevent background scrolling
    document.body.style.overflow = 'hidden'; 
    return (
        <div className="container mx-auto flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <button type="submit" onClick={(e)=>handleClose(e)}>X</button>
            {/* Form Title */}
            <div className="text-gray-900 text-2xl font-bold mb-4">
               {props.formTitle} Form for {username}
            </div>

            {/* Appointment ID Display */}
            <div className="text-gray-700 font-semibold mb-1">Appointment ID: {appointment_id}</div>

            {/* Form Container */}
            <form className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
                
                {/* User's First & Last Name */}
                <div className="flex gap-2">
                    <input type="text" id="userFirstName" value={firstName} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />
                    <input type="text" id="userLastName" value={lastName} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />
                </div>

                {/* User's Email */}
                <input type="text" id="userEmail" value={email} readOnly className="w-full p-3 border rounded-lg bg-gray-200 text-gray-700" />

                {/* Appointment Type & Date */}
                <div className="flex gap-2">
                    <input type="text" id="selectAppointmentType" value={props.actionType} readOnly className="w-1/2 p-3 border rounded-lg bg-gray-200 text-gray-700" />
                    <input type="date" id="appointmentDate" className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required min={new Date().toISOString().split("T")[0]}/>
                </div>

                {/* Car Manufacturer & Model Year */}
                <div className="flex gap-2">
                    <input type="text" id="carType" value={props.carProductionCompany} className="w-2/3 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    <select id="selectCarModelYear" className="w-1/3 p-3 border rounded-lg bg-white">
                        <option value={props.carYear}>{props.carYear}</option>
                    </select>
                </div>

                {/* User's Car Model */}
                <input type="text" id="userCarModel" value={props.carModel} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />

                {/* Employee Selection */}
                <select id="selectAnEmployee" className="w-full p-2 border rounded-lg bg-white">
                    {employees.map((employee) => (
                        <option key={employee.employee_id} value={employee.employee_id}>
                            {employee.employee_first_name} {employee.employee_last_name}
                        </option>
                    ))}
                </select>

                {/* Submit Button */}
                <button type="submit" className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all" onClick={(e)=>handleSubmit(e)}>
                    Submit
                </button>
            </form>

            
        </div>

    )
}

export default RentalForm
