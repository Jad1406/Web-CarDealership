//Importing the Components and hooks required
import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar'
import RentalForm from '../components/RentalForm'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Notification from '../components/Notification'


const CarsForSaleOrRent = () => {

  //Store the user_id in a variable 
  let user_id = localStorage.getItem('user_id')
  let desc = 0;
  
    //Create the states
    const [carInventoryData, setCarInventoryData] = useState([])
    const [carRentalData, setCarRentalData] = useState([])
    const [actionType,setActionType] = useState('')
    const [formTitle,setFormTitle] = useState('')
    const [userData, setUserData] = useState('')
    const [appointmentRequested, setAppointmentRequested] = useState(false)
    const [carProductionCompany, setCarProductionCompany] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carYear, setCarYear] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [Notif, setNotif] = useState(false)
    
    
    //Fetching the data from the database on page load (Once per instance of the website)
    useEffect(()=>{

      //Fetching the cars that are for sale
      const fetchSaleData = async()=>{
        try {

          //Fetch from the alphabetically sorted cars for sale
          const response = await fetch("http://localhost:9000/api/market/sale/alphabet",{
            method: 'GET',
          });
          const result = await response.json();
          setCarInventoryData(result)
          
          //Checking whether the data has been read correctly or not
          console.log(JSON.stringify(carInventoryData));
        } catch (error) {
          console.log(error,"GET method error");
        }
      }
      
      //Fetching the cars that are for rent
      const fetchRentalsData = async()=>{
        try {

          //Fetch the API for the rental cars (unsorted)
          const response = await fetch("http://localhost:9000/api/market/rent",{
            method: 'GET',
          });
          const result = await response.json();
          setCarRentalData(result)
          
          //Checking whether the data has been read correctly or not
          console.log(JSON.stringify(carRentalData));
        } catch (error) {
          console.log(error,"get method error");
        }
      }

      //Fetching the user data
      const fetchUserData = async()=>{
        try {
          //Log for debugging
          // console.log("fetch user data is running");
          
          //Retrieve the user_id into a constant variable in order to avoid any overwritting errors
          const user_id = localStorage.getItem('user_id')

          //Log the ID for debugging
          // console.log("user_id is: "+user_id);
          
          //Get the user data per id
          let result = await fetch(`http://localhost:9000/api/user/${user_id}`,{
            method: 'GET',
            headers: {
              'Content-type' : 'application/json'
            }
          });

          //Log for debugging
          // console.log("fetch completed");
        
          result = await result.json();

          //Log for debugging
          // console.log("result is: "+JSON.stringify(result));
          
          //Store the user data in a state
          setUserData(result)

          //Checking whether the data has been read correctly or not
          // console.log("user Data is: "+JSON.stringify(userData));
          
        } catch (error) {
          console.log(error,"Get method error");
        }
      }
    
      //Call the methods once
      fetchSaleData()
      fetchRentalsData()
      fetchUserData()
    },[])
    
    //Function to open the purchase appointment form
    function openPurchaseAppoitnmentForm() {
      if (!user_id) {
        desc = 7
        setNotif(!Notif)
        //Redirect to the login page if the user is not logged in
        // window.location.href = "/Login_Page"

        //To be changed into a user friendly notification
        // alert("Please login to continue")
      }else{
        //Set the required states
        setActionType('Purchase')
        setFormTitle('Purchase')
        setAppointmentRequested(true)
      }
      
    }

    //Function to open the rental appointment form
    //Same logic as before
    //May combine with the previous function for optimization when reviewing the completed project
    function openRentalAppoitnmentForm() {
      if (!user_id) {
        desc = 7
        // window.location.href = "/Login_Page";

        //To be changed into a user friendly notification
        alert("Please login to continue");
      }else{
        setActionType('Rent')
        setFormTitle('Rental')
        setAppointmentRequested(true)
      }
      
    }

    const closeForm = () => {
      setAppointmentRequested(false); // Close form when submitted or cancelled
    };

    //Dynamic filtering of data on search term change
    const filteredInventory = carInventoryData.filter((car) =>
      `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
    const filteredRentals = carRentalData.filter((car) =>
        `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // let searchData = JSON.parse(carInventoryData);
  return (
    <div>
      {/* Display Notification on the corner */}
      {Notif &&(
        <div className="fixed bg-white flex justify-center items-center z-50 rounded-l-lg w-32 h-10 inset-x-[89%] inset-y-20">
          {
            // setTimeout(() => {
            //   <Notification 
            //   desc = {desc}
            //   />
            // }, 100)
          }
        </div>
      )}
      {/* RentalForm modal */}

      {/* if the appoitnment form is requested, open the rental form, otherwise don't load the form */}
      {appointmentRequested && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 rounded-lg h-auto">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-lg h-auto m-auto">
            {/* Pass the props into the Rental form to simplify usage and avoid errors */}
            <RentalForm 
              setFormOpen={appointmentRequested} //Open the form by setting the boolean value to true
              actionType={actionType} //Choose whether the Form is a rental or purchase
              formTitle={formTitle} //Set the title for clarity
              carProductionCompany={carProductionCompany} //Set the car production company
              carModel={carModel} //Set the car model
              carYear={carYear} //Set the car year
              closeForm={closeForm} // Pass the close function to RentalForm in order to not refresh 
            />
          </div>
        </div>
      )}
      {/* Provide the header (Navbar) for convinient navigation between pages */}
      <Header title={'Cars Gallery'}/>
      {/* The main body of the page */}
      <div id="body" className='flex flex-col justify-center items-center w-full p-10 gap-10 bg-sky-900 text-gray-100 '>
        {/* Make sure that the data is correctly stored before running the components. */}
        {/* {console.log("Car inventory data is: "+JSON.stringify(carInventoryData))} */}

        {/* Run the search bar component */}
        <SearchBar 
          onSearch={setSearchTerm}
          data={JSON.parse(JSON.stringify(carInventoryData))}
        />

        <div id="carsForSale" className='text-start w-[90%] m-auto'>

            
            <div id="sectionTitle" className='text-2xl font-extrabold'>Sale Market</div>
            
              <div id="sectionBody" className='grid grid-cols-5 gap-4 bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>
              
              {/* Map the filtered cars labeled as "For sale" */}
              {filteredInventory && filteredInventory.length > 0 ? (
                filteredInventory.map((car) => (
                  <div key={filteredInventory.car_id} className="h-[100%] flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
                      {/* This button has the shape of a bookmark to symbolize booking an appointment */}
                      <button className="items-center my-auto" onClick={()=>{
                        setCarProductionCompany(car.production_company);
                        setCarModel(car.car_model);
                        setCarYear(car.production_year);
                        openPurchaseAppoitnmentForm();
                        }}>
                        <BookmarkIcon color='primary'/>
                      </button>
                    </div>
                  </div>
                ))
                ):(
                  <p>Loading...</p>
              )}
              </div>

              

          </div>

        {/* Same as above but for cars labled as "For rent" */}
        <div id="carsForRent" className='text-start w-[90%] m-auto'>
          <div id="sectionTitle" className='text-2xl font-extrabold'>Rental Market</div>

            <div id="sectionBody" className='grid grid-cols-5 gap-4 bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>

              {filteredRentals && filteredRentals.length > 0 ? (
                filteredRentals.map((car) => (
                  <div key={filteredRentals.car_id} className="h-[100%] flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
                      <button className="items-center my-auto" onClick={()=>{
                        setCarProductionCompany(car.production_company);
                        setCarModel(car.car_model);
                        setCarYear(car.production_year);
                        openRentalAppoitnmentForm();
                        }}>
                        <BookmarkIcon color='primary'/>
                      </button>
                    </div>
                  </div>
                ))
                ): (
                  <p>Loading...</p>
              )}

            </div>

        </div>
        
      </div>
    </div>
  )
}

export default CarsForSaleOrRent
