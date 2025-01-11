import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL; // Use the same environment variable


  //Fetch all users from the database on page load, and on change in the API
  // useEffect(() => {

  //   //Create the fetch users function
  //   const fetchUsers = async () => {

  //     try {
  //       console.log(apiUrl)
  //       const response = await fetch(`${apiUrl}/api/users`);

  //       //Throw an error if no response was caught
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       //Otherwise, get the data into an array name usersData, then set the users array to have the data fetched from the api.
  //       const usersData = await response.json();
  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, [apiUrl]);

  return (
    <div>
      <h2 className='text-black text-4xl'>Users List</h2>

      <ul className="text-black text-2xl">

        {/* Mapping function */}
        {users.map((user) => (
          <li key={user.user_id}>
            {user.name} - {user.email}
          </li>
        ))}


      </ul>
    </div>
  );
}

export default UserList;
