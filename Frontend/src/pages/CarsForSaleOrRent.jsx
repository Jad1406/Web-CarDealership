import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar'
import RentalForm from '../components/RentalForm'
import BookmarkIcon from '@mui/icons-material/Bookmark';


const CarsForSaleOrRent = () => {

  let user_id = localStorage.getItem('user_id')
  
  
    const [carInventoryData, setCarInventoryData] = useState([])
    const [carRentalData, setCarRentalData] = useState([])
    const [actionType,setActionType] = useState('')
    const [formTitle,setFormTitle] = useState('')
    const [userData, setUserData] = useState('')
    const [appointmentRequested, setAppointmentRequested] = useState(false)
    const [carProductionCompany, setCarProductionCompany] = useState('')
    const [carModel, setCarModel] = useState('')
    const [carYear, setCarYear] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    
    
    //Fetching the data from the database
    useEffect(()=>{

      //Fetching the cars that are for sale
      const fetchSaleData = async()=>{
        try {
          const response = await fetch("http://localhost:9000/api/market/sale/alphabet",{
            method: 'GET',
          });
          const result = await response.json();
          setCarInventoryData(result)
          
          //Checking whether the data has been read correctly or not
          console.log(JSON.stringify(carInventoryData));
        } catch (error) {
          console.log(error,"get method error");
        }
      }
      
      //Fetching the cars that are for rent
      const fetchRentalsData = async()=>{
        try {
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
          console.log("fetch user data is running");
          
          const user_id = localStorage.getItem('user_id')

          console.log("user_id is: "+user_id);
          
          
          let result = await fetch(`http://localhost:9000/api/user/${user_id}`,{
            method: 'GET',
            headers: {
              'Content-type' : 'application/json'
            }
          });
          console.log("fetch completed");
        
          result = await result.json();
          console.log("result is: "+JSON.stringify(result));
          
          setUserData(result)

          //Checking whether the data has been read correctly or not
          console.log("user Data is: "+JSON.stringify(userData));
          
        } catch (error) {
          console.log(error,"Get method error");
        }
      }
    
      fetchSaleData()
      fetchRentalsData()
      fetchUserData()
    },[])
    
    //Function to open the purchase appointment form
    function openPurchaseAppoitnmentForm() {
      if (!user_id) {
        window.location.href = "/Login_Page";
        alert("Please login to continue");
      }else{
        setActionType('Purchase')
        setFormTitle('Purchase')
        setAppointmentRequested(true)
      }
      
    }

    //Function to open the rental appointment form
    function openRentalAppoitnmentForm() {
      if (!user_id) {
        window.location.href = "/Login_Page";
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

    const filteredInventory = carInventoryData.filter((car) =>
      `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

    const filteredRentals = carRentalData.filter((car) =>
        `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // let searchData = JSON.parse(carInventoryData);
  return (
    <div>

      {/* RentalForm modal */}
      {appointmentRequested && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 rounded-lg h-auto">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-lg h-auto m-auto">
            <RentalForm 
              setFormOpen={appointmentRequested}
              actionType={actionType} 
              formTitle={formTitle} 
              carProductionCompany={carProductionCompany}
              carModel={carModel}
              carYear={carYear}
              closeForm={closeForm} // Pass the close function to RentalForm
            />
          </div>
        </div>
      )}
      <Header title={'Cars Gallery'}/>
      <div id="body" className='flex flex-col justify-center items-center w-full p-10 gap-10 bg-sky-900 text-gray-100 '>
        {console.log("Car inventory data is: "+JSON.stringify(carInventoryData))}
        <SearchBar 
          onSearch={setSearchTerm}
          data={JSON.parse(JSON.stringify(carInventoryData))}
        />

        <div id="carsForSale" className='text-start w-[90%] m-auto'>

            
            <div id="sectionTitle" className='text-2xl font-extrabold'>Sale Market</div>
            
              <div id="sectionBody" className='grid grid-cols-5 gap-4 bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>
              
              {filteredInventory && filteredInventory.length > 0 ? (
                filteredInventory.map((car) => (
                  <div key={filteredInventory.car_id} className="h-[100%] flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
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
                ): (
                  <p>Loading...</p>
              )}
              </div>

              

          </div>

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
