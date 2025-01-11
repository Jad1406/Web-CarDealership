import React from 'react'
import Header from '../components/Header'
import {useState, useEffect} from 'react'
import SearchBar from '../components/SearchBar'

const CarsForSaleOrRent = () => {

    const [carInventoryData, setCarInventoryData] = useState('')
    const [carRentalData, setCarRentalData] = useState('')
    
    useEffect(()=>{
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
      fetchSaleData()
      fetchRentalsData()
    },[])

  return (
    <div>
      <Header title={'Cars Gallery'}/>
      <div id="body" className='flex flex-col justify-center items-center w-full p-10 gap-10 bg-sky-900 text-gray-100 '>
        <SearchBar/>

        <div id="carsForSale" className='text-start w-[90%] m-auto'>

            
            <div id="sectionTitle" className='text-2xl font-extrabold'>Sale Market</div>
            
              <div id="sectionBody" className='grid grid-cols-5 gap-4 bg-gray-100 border-2 border-gray-200 rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300'>
                
              {carInventoryData && carInventoryData.length > 0 ? (
                carInventoryData.map((car, index) => (
                  <div key={index} className="h-[100%] flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
                      <button className="items-center my-auto">
                        <img src='' alt="Add to Cart" className="w-[25px] h-[25px]" />
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

              {carRentalData && carRentalData.length > 0 ? (
                carRentalData.map((car, index) => (
                  <div key={index} className="h-[100%] flex flex-col justify-start border-2 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img src={car.image_url} alt="Car" className="w-full h-[80%] rounded-t-lg object-cover"/>
                    <div id="textArea" className="w-full h-[20%] flex flex-row justify-between bg-gray-100 rounded-b-lg">
                      <p className="text-m my-auto font-bold text-gray-800">
                        {car.production_company} {car.car_model}
                      </p>
                      <button className="items-center my-auto">
                        <img src='' alt="Add to Cart" className="w-[25px] h-[25px]" />
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
