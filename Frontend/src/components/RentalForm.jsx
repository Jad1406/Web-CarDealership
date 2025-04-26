import React, { useState, useEffect } from "react";

const RentalForm = (props) => {
    // Create the states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [allUsers, setAllUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const user_id = localStorage.getItem('user_id');

    // Form data state
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

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://localhost:9000/api/users`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const usersData = await response.json();
                setAllUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Find the current user
    useEffect(() => {
        if (allUsers.length > 0) {
            const user = allUsers.find((user) => user.user_id == user_id);
            if (user) {
                setFirstName(user.first_name);
                setLastName(user.last_name);
                setEmail(user.user_email);
                setUsername(user.username);
            }
        }
    }, [allUsers, user_id]);

    // Fetch employees
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/employees");
                const result = await response.json();
                setEmployees(result);
            } catch (error) {
                console.log(error, "get method error");
            }
        };
        fetchEmployees();
    }, []);

    // Fetch appointment length
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/appointments");
                const result = await response.json();
                appointment_id = result.length + 1;
            } catch (error) {
                console.log(error, "get method error");
            }
        };
        fetchAppointments();
    }, []);

    // Log formData when due date is selected
    useEffect(() => {
        if (formData.appointment_due_date !== "") {
            console.log("Form Data:", formData);
        }
    }, [formData]);

    // Post the appointment
    useEffect(() => {
        const postAppointment = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/appointments", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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

    function handleClose() {
        document.body.style.overflow = 'auto';
        props.closeForm();
    }

    function handleSubmit(e) {
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
    }

    // Prevent background scroll
    document.body.style.overflow = 'hidden';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
            <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                {/* Form Title */}
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {props.formTitle} Form for {username}
                </h2>

                {/* Appointment ID */}
                <p className="text-center text-gray-500 mb-4">Appointment ID: {appointment_id}</p>

                {/* Form */}
                <form className="flex flex-col gap-4">
                    {/* User Name */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            id="userFirstName"
                            value={firstName}
                            readOnly
                            className="w-1/2 p-3 border rounded-md bg-gray-100 text-gray-700"
                        />
                        <input
                            type="text"
                            id="userLastName"
                            value={lastName}
                            readOnly
                            className="w-1/2 p-3 border rounded-md bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* User Email */}
                    <input
                        type="text"
                        id="userEmail"
                        value={email}
                        readOnly
                        className="w-full p-3 border rounded-md bg-gray-100 text-gray-700"
                    />

                    {/* Appointment Type & Date */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            id="selectAppointmentType"
                            value={props.actionType}
                            readOnly
                            className="w-1/2 p-3 border rounded-md bg-gray-100 text-gray-700"
                        />
                        <input
                            type="date"
                            id="appointmentDate"
                            min={new Date().toISOString().split("T")[0]}
                            className="w-1/2 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Car Info */}
                    <div className="flex gap-3">
                        <input
                            type="text"
                            id="carType"
                            value={props.carProductionCompany}
                            className="w-2/3 p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <select
                            id="selectCarModelYear"
                            className="w-1/3 p-3 border rounded-md bg-white"
                        >
                            <option value={props.carYear}>{props.carYear}</option>
                        </select>
                    </div>

                    {/* Car Model */}
                    <input
                        type="text"
                        id="userCarModel"
                        value={props.carModel}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Employee Selection */}
                    <select
                        id="selectAnEmployee"
                        className="w-full p-3 border rounded-md bg-white"
                    >
                        {employees.map((employee) => (
                            <option key={employee.employee_id} value={employee.employee_id}>
                                {employee.employee_first_name} {employee.employee_last_name}
                            </option>
                        ))}
                    </select>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RentalForm;
