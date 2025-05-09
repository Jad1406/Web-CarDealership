# 🚗 Car Dealership Website

This project is a **full-stack car dealership management system** where users can browse, view details, and interact with available vehicles.  
Admins can manage car listings, and customers can book appointments, make inquiries, and place orders.

---

## 🚀 Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Password Security**: bcrypt
- **Environment Variables Management**: dotenv

---

## 📁 Project Structure

```
/Car-Dealership
├── /Backend
│   ├── /src
│   │   ├── /models
│   │   │   └── db.js
│   │   ├── /routes
│   │   │   ├── appointments.js
│   │   │   ├── carPartsRoute.js
│   │   │   ├── employee.js
│   │   │   ├── marketInfo.js
│   │   │   ├── orderRoute.js
│   │   │   └── userRoutes.js
│   │   ├── /utils
│   │   └── server.js
│   └── package.json
├── /Frontend
│   ├── /public
│   ├── /src
│   │   ├── /components
│   │   │   ├── Cart.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── PartCard.jsx
│   │   │   ├── RentalForm.jsx
│   │   │   ├── RequestedPartCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SideBar.jsx
│   │   ├── /css
│   │   │   ├── carGallery.css
│   │   │   ├── CarSimulation.css
│   │   │   ├── header.css
│   │   │   ├── homePage.css
│   │   │   ├── loginPage.css
│   │   │   ├── market.css
│   │   │   └── SigninPage.css
│   │   ├── /pages
│   │   │   ├── CarsForSaleOrRent.jsx
│   │   │   ├── CarSimulation.jsx
│   │   │   ├── CheckoutMenu.jsx
│   │   │   ├── CustomerProfile.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── Market.jsx
│   │   │   ├── Parts.jsx
│   │   │   ├── RequestedPart.jsx
│   │   │   └── SigninPage.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   └── App.jsx
|   ├── package.json
│   └── tailwind.config.js
└── README.md

```

---

## ⚙️ Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/car-dealership.git
```

### 2. Set Up Backend

```bash
cd Car-Dealership/Backend
npm install
```

Create a `.env` file inside `/Backend`:

```
PORT=anything_other_than_3000
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=dealership
```

Run backend server:
```bash
npm start
```
> Server will run at `http://localhost:9000`

---

### 3. Set Up Frontend

```bash
cd Car-Dealership/Frontend
npm install
npm start
```
> Frontend will run at `http://localhost:3000` 

---

## 📜 Core Features

| Feature | Description |
|:-------:|:------------|
| 🛒 Car Listings | View all available vehicles |
| 🛒 Car Parts Listings | View all available repair parts |
| 🧰 Car Details | View detailed information about a selected car |
| 🧰 AI Assistant | Ask any car related question |
| 🛕️ Place Orders | Customers can submit orders for car parts |
| 🗓️ Appointments | Customers can schedule appointments to purchase/rent out cars |
| 🔐 Authentication | Secure login and registration for users |
| 🌃 Dark/Light Mode | UI supports theme switching (frontend) |

---

## 🔒 Security

- **Passwords** are securely hashed with **bcrypt**.
- **Input Validation** is done on both frontend and backend.
- **Protected Routes** prevent unauthorized access.

---

## 🚣️ API Overview

| Method | Endpoint                 | Purpose                     | Access |
|:------:|:-------------------------:|:----------------------------|:------:|
| GET    | /api/users                 | Retreive all users          | Protected |
| POST   | /api/users                 | User Registration           | Public |
| POST   | /api/users/Login           | User Login                  | Public |
| GET    | /api/users/:user_id        | Get User by ID              | Protected |
| PUT    | /api/users/:user_id        | Update username and email   | Protected |
| DELETE | /api/users/:user_id        | Delete user                 | Protected |
| GET    | /api/appointments          | Get all apointments         | Protected |
| POST   | /api/appointments          | Schedule an appointment     | Protected |
| POST   | /api/appointments/user     | Get appointments for a user | Protected |
| GET    | /api/carParts              | Get all car parts           | Public |
| GET    | /api/employees             | Get all employees           | Public |
| GET    | /api/market/sale           | Get all cars listed for sale| Public |
| GET    | /api/market/sale/alphabet  | Get sorted list of cars     | Public |
| GET    | /api/market/rent           | Get all cars listed for rent| Public |
| GET    | /api/market/parts          | Get all parts for sale      | Public |
| GET    | /api/market                | Get all cars                | Public |
| GET    | /api/orders                | Get all orders              | Protected |
| GET    | /api/orders/user           | Get all orders by a user    | Protected |
| POST   | /api/orders                | Create an order             | Protected |


---

## 💡 Future Enhancements

- 📊 Dashboard analytics for Admin
- 💬 Customer inquiry messaging
- 📩 Email notifications for bookings
- 🖼️ Better photo galleries for car images
- 🖼️ Enhaced 3D view of all cars available

---

## 🧑‍💻 Author

- **Name**: Jad Darwish
- **Email**: [Jaddarwish1406@hotmail.com]
- **GitHub**: [your-github-profile]

---