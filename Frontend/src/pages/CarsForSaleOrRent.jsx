import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RentalForm from '../components/RentalForm';
import BookmarkIcon from '@mui/icons-material/BookmarkBorder';
import Notification from '../components/Notification';
import '../css/carGallery.css';
import ChatBot from '../components/ChatBot';

const CarsForSaleOrRent = () => {
  let user_id = localStorage.getItem('user_id');
  let desc = 0;

  const [carInventoryData, setCarInventoryData] = useState([]);
  const [carRentalData, setCarRentalData] = useState([]);
  const [actionType, setActionType] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [userData, setUserData] = useState('');
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const [carProductionCompany, setCarProductionCompany] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [Notif, setNotif] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [featuredCarIndex, setFeaturedCarIndex] = useState(0);

  useEffect(() => {
    const fetchSaleData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/market/sale/alphabet", {
          method: 'GET',
        });
        const result = await response.json();
        setCarInventoryData(result);
        console.log("Sale Data:", result);
      } catch (error) {
        console.log(error, "GET sale method error");
      }
    };

    const fetchRentalsData = async () => {
      try {
        const response = await fetch("http://localhost:9000/api/market/rent", {
          method: 'GET',
        });
        const result = await response.json();
        setCarRentalData(result);
        console.log("Rental Data:", result);
      } catch (error) {
        console.log(error, "GET rental method error");
      }
    };

    const fetchUserData = async () => {
      try {
        const user_id = localStorage.getItem('user_id');
        if (user_id) {
          let result = await fetch(`http://localhost:9000/api/user/${user_id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json'
            }
          });
          result = await result.json();
          setUserData(result);
          console.log("User Data:", result);
        }
      } catch (error) {
        console.log(error, "GET user method error");
      }
    };

    fetchSaleData();
    fetchRentalsData();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (carInventoryData.length > 0) {
      const intervalId = setInterval(() => {
        setFeaturedCarIndex((prevIndex) => (prevIndex + 1) % carInventoryData.length);
      }, 4000); // Change every 4 seconds (4000 milliseconds)

      return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }
  }, [carInventoryData]);

  const openPurchaseAppoitnmentForm = (car) => {
    if (!user_id) {
      desc = 7;
      setNotif(!Notif);
    } else {
      setActionType('Purchase');
      setFormTitle('Purchase');
      setCarProductionCompany(car.production_company);
      setCarModel(car.car_model);
      setCarYear(car.production_year);
      setAppointmentRequested(true);
    }
  };

  const openRentalAppoitnmentForm = (car) => {
    if (!user_id) {
      desc = 7;
      setNotif(!Notif);
    } else {
      setActionType('Rent');
      setFormTitle('Rental');
      setCarProductionCompany(car.production_company);
      setCarModel(car.car_model);
      setCarYear(car.production_year);
      setAppointmentRequested(true);
    }
  };

  const closeForm = () => {
    setAppointmentRequested(false);
  };

  const filteredInventory = carInventoryData.filter((car) =>
    `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'All' || (activeCategory === 'Electric' && car.is_electric === 1) || (activeCategory === 'Gas' && car.is_electric === 0))
  );

  const filteredRentals = carRentalData.filter((car) =>
    `${car.production_company} ${car.car_model}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'All' || (activeCategory === 'Electric' && car.is_electric === 1) || (activeCategory === 'Gas' && car.is_electric === 0))
  );

  const featuredCar = carInventoryData[featuredCarIndex];

  return (
    <div className="dark:bg-gray-900 bg-gray-100 min-h-screen">
      {Notif && (
        <div className="fixed bg-white dark:bg-gray-800 flex justify-center items-center z-50 rounded-l-lg w-32 h-10 inset-x-[89%] inset-y-20 shadow-md border dark:border-gray-700">
          Please Login
        </div>
      )}

      {appointmentRequested && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 rounded-lg h-auto">
          <div className="p-6 rounded-lg shadow-lg w-full max-w-lg h-auto m-auto bg-white dark:bg-gray-800">
            <RentalForm
              setFormOpen={appointmentRequested}
              actionType={actionType}
              formTitle={formTitle}
              carProductionCompany={carProductionCompany}
              carModel={carModel}
              carYear={carYear}
              closeForm={closeForm}
            />
          </div>
        </div>
      )}

      <Header title={'Cars Gallery'} />

      <div id="body" className='flex flex-col justify-center items-center w-full p-6 md:p-10 gap-6 md:gap-10 dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-gray-100'>

        {/* Featured Car Section (rotating through sale cars) */}
        {carInventoryData.length > 0 && featuredCar && (
          <div className="w-full rounded-xl shadow-md dark:shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
            <div className="md:flex">
              <img
                src={featuredCar.image_url}
                alt="Featured Car"
                className="w-full h-64 object-cover md:w-1/2"
              />
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-xl font-bold dark:text-gray-100 text-gray-800">{featuredCar.production_company} {featuredCar.car_model}</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Year: {featuredCar.production_year}</p>
                <p className="text-gray-600 dark:text-gray-400">Color: {featuredCar.car_color}</p>
                <button
                  onClick={() => openPurchaseAppoitnmentForm(featuredCar)}
                  className="mt-4 bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-800 transition w-fit"
                >
                  Book a Visit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchTerm}
          data={JSON.parse(JSON.stringify(carInventoryData.concat(carRentalData)))}
        />

        {/* Category Filter Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className={`py-2 px-4 rounded-full text-sm font-semibold transition ${activeCategory === 'All' ? 'bg-sky-700 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-semibold transition ${activeCategory === 'Gas' ? 'bg-sky-700 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => setActiveCategory('Gas')}
          >
            Gas
          </button>
          <button
            className={`py-2 px-4 rounded-full text-sm font-semibold transition ${activeCategory === 'Electric' ? 'bg-sky-700 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            onClick={() => setActiveCategory('Electric')}
          >
            Electric
          </button>
        </div>

        {/* Sale Market */}
        <div id="carsForSale" className='text-start w-[90%] m-auto'>
          <div id="sectionTitle" className='text-2xl font-extrabold dark:text-gray-100 text-gray-800 mb-4'>Sale Market</div>
          <div id="sectionBody" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {filteredInventory && filteredInventory.length > 0 ? (
              filteredInventory.map((car) => (
                <div key={car.car_id} className="h-auto flex flex-col justify-start border dark:border-gray-700 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
                  <img src={car.image_url} alt="Car" className="w-full h-48 rounded-t-lg object-cover" />
                  <div id="textArea" className="w-full p-4 flex flex-col justify-between">
                    <p className="text-lg font-bold dark:text-gray-100 text-gray-800 mb-2">
                      {car.production_company} {car.car_model}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm dark:text-gray-300 text-gray-600">Year: {car.production_year}</span>
                      <button className="items-center" onClick={() => openPurchaseAppoitnmentForm(car)}>
                        <BookmarkIcon color='primary' className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="dark:text-gray-300 text-gray-700">No cars for sale in the selected category.</p>
            )}
          </div>
        </div>

        {/* Rental Market */}
        <div id="carsForRent" className='text-start w-[90%] m-auto mt-8'>
          <div id="sectionTitle" className='text-2xl font-extrabold dark:text-gray-100 text-gray-800 mb-4'>Rental Market</div>
          <div id="sectionBody" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {filteredRentals && filteredRentals.length > 0 ? (
              filteredRentals.map((car) => (
                <div key={car.car_id} className="h-auto flex flex-col justify-start border dark:border-gray-700 rounded-lg shadow-md dark:shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800">
                  <img src={car.image_url} alt="Car" className="w-full h-48 rounded-t-lg object-cover" />
                  <div id="textArea" className="w-full p-4 flex flex-col justify-between">
                    <p className="text-lg font-bold dark:text-gray-100 text-gray-800 mb-2">
                      {car.production_company} {car.car_model}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm dark:text-gray-300 text-gray-600">Year: {car.production_year}</span>
                      <button className="items-center" onClick={() => openRentalAppoitnmentForm(car)}>
                        <BookmarkIcon color='primary' className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="dark:text-gray-300 text-gray-700">No cars for rent in the selected category.</p>
            )}
          </div>
        </div>

      </div>

      <ChatBot />
    </div>
  );
};

export default CarsForSaleOrRent;