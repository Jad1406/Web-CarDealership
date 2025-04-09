import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../css/market.css'
import carCart from '../assets/MarketAssets/carCart.svg'
import RentalForm from '../components/RentalForm'


const Market = () => {

  let user_id = localStorage.getItem("user_id")

  const [carInventoryData, setCarInventoryData] = useState('')
  const [carRentalData, setCarRentalData] = useState('')
  const [carPartsData, setCarPartsData] = useState('')
  const [carRepairServicesData, setCarRepairServicesData] = useState('')
  const [actionType,setActionType] = useState('')
  const [formTitle,setFormTitle] = useState('')
  const [appointmentRequested, setAppointmentRequested] = useState(false)
  const [carProductionCompany, setCarProductionCompany] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carYear, setCarYear] = useState('')

  //Fetch the data related to the cars ready for sale.
  useEffect(()=>{
    const fetchSaleData = async()=>{
      try {
        const response = await fetch("http://localhost:9000/api/market/sale",{
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

    const fetchPartsData = async()=>{
      try {
        const response = await fetch("http://localhost:9000/api/market/parts",{
          method: 'GET',
        });
        const result = await response.json();
        setCarPartsData(result)
        
        //Checking whether the data has been read correctly or not
        console.log(JSON.stringify(carPartsData));
      } catch (error) {
        console.log(error,"get method error");
      }
    }

    const fetchRepairOptionsData = async()=>{
      try {
        const response = await fetch("http://localhost:9000/api/market/repairs",{
          method: 'GET',
        });
        const result = await response.json();
        setCarRepairServicesData(result)
        
        //Checking whether the data has been read correctly or not
        console.log(JSON.stringify(carRepairServicesData));
      } catch (error) {
        console.log(error,"get method error");
      }
    }

    fetchSaleData()
    fetchRentalsData()
    fetchPartsData()
    fetchRepairOptionsData()
  },[])

  //Function to open the purchase appointment form
  function openPurchaseAppoitnmentForm() {

    if (!user_id) {
        //Redirect to the login page if the user is not logged in
        window.location.href = "/Login_Page";

        //To be changed into a user friendly notification
        alert("Please login to continue");
      }else{
        //Set the required states
        setActionType('Purchase')
        setFormTitle('Purchase')
        setAppointmentRequested(true)
      }
  }

  //Function to open the rental appointment form
  function openRentalAppoitnmentForm() {
    if (!user_id) {
      window.location.href = "/Login_Page";

      //To be cahnged into a user friendly notification
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
    
  return (
    <div id="container" className='w-full'>

      {/* RentalForm modal */}
      {appointmentRequested && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 rounded-lg h-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mt-4 h-auto">
            <RentalForm 
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

      <Header title="Marketplace"/>

      <div id="body" className='flex flex-col justify-center items-center w-full p-10 gap-10 bg-sky-900 text-gray-100 '>

        {/* Main Body */}
        {/* Top selling cars will be displayed here */}
        <div id="carsForSale" className='text-start w-[90%] m-auto'>

          
          <div id="sectionTitle" className='text-2xl font-extrabold'>Sale Market</div>
          
            <div id="sectionBody" className='flex flex-row justify-start gap-4 w-[100%] h-[270px] bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>
              
            {carInventoryData && carInventoryData.length > 0 ? (
              carInventoryData.slice(0, 4).map((car, index) => (
                <div key={index} className="h-[100%] w-1/4 flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                  <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                    <p className="text-m my-auto font-bold text-gray-800">
                      {car.production_company} {car.car_model}
                    </p>
                    <button className="items-center my-auto" onClick={()=>{
                      setCarModel(car.car_model);
                      setCarProductionCompany(car.production_company);
                      setCarYear(car.production_year)
                      openPurchaseAppoitnmentForm();
                      }}>
                      <img src={carCart} alt="Add to Cart" className="w-[25px] h-[25px]" />
                    </button>
                  </div>
                </div>
              ))
              ): (
                <p>Loading...</p>
            )}

              <button  className="h-full w-[50px] bg-gradient-to-b from-sky-700 to-sky-600 border-l-2 border-sky-200 rounded-tr-xl rounded-br-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <Link to='/Cars_For_Sale_Or_Rent'><span className="rotate-90 text-white font-bold">More</span></Link>
              </button>

            </div>

        </div>

        {/* Top rated rented cars will be displayed here */}
        <div id="carsForRent" className='text-start w-[90%] m-auto'>
          <div id="sectionTitle" className='text-2xl font-extrabold'>Rental Market</div>

            <div id="sectionBody" className='flex flex-row justify-start gap-4 w-[100%] h-[270px] bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>

              {carRentalData && carRentalData.length > 0 ? (
                carRentalData.slice(0, 4).map((car, index) => (
                  <div key={index} className="h-[100%] w-1/4 flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
                      <button className="items-center my-auto" onClick={()=>{
                        setCarModel(car.car_model);
                        setCarProductionCompany(car.production_company);
                        setCarYear(car.production_year);
                        openRentalAppoitnmentForm();
                        }}>
                        <img src={carCart} alt="Add to Cart" className="w-[25px] h-[25px]" />
                      </button>
                    </div>
                  </div>
                ))
                ): (
                  <p>Loading...</p>
              )}

              <button  className="h-full w-[50px] bg-gradient-to-b from-sky-700 to-sky-600 border-l-2 border-sky-200 rounded-tr-xl rounded-br-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <Link to='/Cars_For_Sale_Or_Rent#Rentals'><span className="rotate-90 text-white font-bold">More</span></Link>
              </button>

            </div>

        </div>

        {/* Top requested car parts will be displayed here */}
        <div id="carParts" className='text-start w-[90%] m-auto'>
          <div id="sectionTitle" className='text-2xl font-extrabold'>Parts Market</div>

            <div id="sectionBody" className='flex flex-row justify-start gap-4 w-[100%] h-[270px] bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>

              {carPartsData && carPartsData.length > 0 ? (
                carPartsData.slice(0, 4).map((part, index) => (
                  <div key={index} className="h-[100%] w-1/4 flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={part.image_url} alt="part" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {part.car_part_title}
                      </p>
                      <button className="items-center my-auto">
                        <img src={carCart} alt="Add to Cart" className="w-[25px] h-[25px]" />
                      </button>
                    </div>
                  </div>
                ))
                ): (
                  <p>Loading...</p>
              )}

                <button  className="h-full w-[50px] bg-gradient-to-b from-sky-700 to-sky-600 border-l-2 border-sky-200 rounded-tr-xl rounded-br-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                  <Link to='/Parts'><span className="rotate-90 text-white font-bold">More</span></Link>
                </button>

            </div>
        </div>

        {/* Top requested repair options will be displayed here */}
        <div id="repairOptions" className='text-start w-[90%] m-auto'>

          <div id="sectionTitle" className='text-2xl font-extrabold'>Repair Options</div>

            <div id="sectionBody" className='flex flex-row justify-start gap-4 w-[100%] h-[270px] bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>

              {carRepairServicesData && carRepairServicesData.length > 0 ? (
                  carRepairServicesData.slice(0, 4).map((repairOption, index) => (
                    <div key={index} className="h-[100%] w-1/4 flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <img src={repairOption.image_url} alt="repairOption" className="w-full h-[80%] rounded-t-lg object-cover"/>
                      <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                        <p className="text-m my-auto font-bold text-gray-800">
                          {repairOption.repair_option_title}
                        </p>
                        <button className="items-center my-auto">
                          <img src={carCart} alt="Add to Cart" className="w-[25px] h-[25px]" />
                        </button>
                      </div>
                    </div>
                  ))
                  ): (
                    <p>Loading...</p>
                )}

              {/* <button className="h-full bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800 font-bold rounded-xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 px-4">More</button> */}
              <button  className="h-full w-[50px] bg-gradient-to-b from-sky-700 to-sky-600 border-l-2 border-sky-200 rounded-tr-xl rounded-br-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
                <Link to='/Repairs'><span className="rotate-90 text-white font-bold">More</span></Link>
              </button>

            </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Market
