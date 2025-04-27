import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/market.css';
import carCart from '../assets/MarketAssets/carCart.svg';
import RentalForm from '../components/RentalForm';
import ChatBot from '../components/ChatBot';

const Market = () => {
  let user_id = localStorage.getItem("user_id");

  const [carInventoryData, setCarInventoryData] = useState([]);
  const [carRentalData, setCarRentalData] = useState([]);
  const [carPartsData, setCarPartsData] = useState([]);
  const [activeTab, setActiveTab] = useState('Buy');
  const [actionType, setActionType] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const [carProductionCompany, setCarProductionCompany] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saleRes, rentRes, partsRes] = await Promise.all([
          fetch("http://localhost:9000/api/market/sale"),
          fetch("http://localhost:9000/api/market/rent"),
          fetch("http://localhost:9000/api/market/parts")
        ]);
        setCarInventoryData(await saleRes.json());
        setCarRentalData(await rentRes.json());
        setCarPartsData(await partsRes.json());
      } catch (error) {
        console.log(error, "Fetch error");
      }
    };
    fetchData();
  }, []);

  const openCarDetails = (item, type) => {
    setSelectedCarDetails({ ...item, type });
  };

  const closeCarDetails = () => {
    setSelectedCarDetails(null);
  };

  const closeForm = () => setAppointmentRequested(false);

  const renderItems = (data, type) => (
    <div className="relative flex gap-6 overflow-x-auto scrollbar-hide py-4">
      <div className="flex animate-infinite-scroll gap-6 py-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative min-w-[250px] h-[350px] bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-transform duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.closest('.animate-infinite-scroll').style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.closest('.animate-infinite-scroll').style.animationPlayState = 'running';
            }}
          >
            <img
              src={item.image_url}
              alt={type === 'Parts' ? item.car_part_title : `${item.production_company} ${item.car_model}`}
              className="w-full h-2/3 object-cover rounded-t-xl"
            />
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-md px-2 py-1 text-xs font-bold shadow-md">
              {type === 'Parts' ? item.car_part_title : `${item.production_company} ${item.car_model}`}
            </div>
            <div className="flex justify-center mt-2">
              {(type === 'Buy' || type === 'Rent') && (
                <button
                  onClick={() => openCarDetails(item, type)}
                  className="bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-800 transition"
                >
                  Details
                </button>
              )}
              {type === 'Parts' && (
                <Link
                  to="/Parts"
                  className="bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-800 transition"
                >
                  View
                </Link>
              )}
            </div>
          </div>
        ))}
        {data.map((item, index) => (
          <div
            key={`duplicate-${index}`}
            className="relative min-w-[250px] h-[350px] bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition-transform duration-300"
            onMouseEnter={(e) => {
              e.currentTarget.closest('.animate-infinite-scroll').style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.closest('.animate-infinite-scroll').style.animationPlayState = 'running';
            }}
          >
            <img
              src={item.image_url}
              alt={type === 'Parts' ? item.car_part_title : `${item.production_company} ${item.car_model}`}
              className="w-full h-2/3 object-cover rounded-t-xl"
            />
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-md px-2 py-1 text-xs font-bold shadow-md">
              {type === 'Parts' ? item.car_part_title : `${item.production_company} ${item.car_model}`}
            </div>
            <div className="flex justify-center mt-2">
              {(type === 'Buy' || type === 'Rent') && (
                <button
                  onClick={() => openCarDetails(item, type)}
                  className="bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-800 transition"
                >
                  Details
                </button>
              )}
              {type === 'Parts' && (
                <Link
                  to="/Parts"
                  className="bg-sky-700 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-800 transition"
                >
                  View
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen">
      {appointmentRequested && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <RentalForm
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

      {selectedCarDetails && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              {selectedCarDetails.production_company} {selectedCarDetails.car_model} ({selectedCarDetails.production_year})
            </h2>
            <img
              src={selectedCarDetails.image_url}
              alt={`${selectedCarDetails.production_company} ${selectedCarDetails.car_model}`}
              className="w-full rounded-md mb-4"
            />
            <p className="text-gray-700 dark:text-gray-300 mb-2">Color: {selectedCarDetails.car_color}</p>
            {selectedCarDetails.type === 'Buy' && (
              <p className="text-green-600 font-semibold mb-2">Price: ${selectedCarDetails.price}</p>
            )}
            {selectedCarDetails.type === 'Rent' && (
              <p className="text-blue-600 font-semibold mb-2">Rental Available</p>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={closeCarDetails}
                className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Close
              </button>
              {(selectedCarDetails.type === 'Buy' || selectedCarDetails.type === 'Rent') && (
                <button
                  onClick={() => {
                    closeCarDetails();
                    if (!user_id) {
                      alert("Please login to continue");
                      window.location.href = "/Login_Page";
                    } else {
                      setActionType(selectedCarDetails.type);
                      setFormTitle(selectedCarDetails.type === 'Buy' ? 'Purchase' : 'Rental');
                      setCarProductionCompany(selectedCarDetails.production_company);
                      setCarModel(selectedCarDetails.car_model);
                      setCarYear(selectedCarDetails.production_year);
                      setAppointmentRequested(true);
                    }
                  }}
                  className="bg-sky-700 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-800 transition"
                >
                  {selectedCarDetails.type === 'Buy' ? 'Book Purchase' : 'Book Rental'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Header title="Marketplace" />

      {/* Navigation Tabs */}
      <div className="flex justify-center mt-8 gap-4">
        {['Buy', 'Rent', 'Parts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-6 rounded-full text-lg font-bold transition ${
              activeTab === tab
                ? 'bg-sky-700 text-white shadow-md'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'Buy' && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Cars For Sale</h2>
            {carInventoryData.length > 0 ? (
              renderItems(carInventoryData.filter(car => car.rental === 0), 'Buy')
            ) : (
              <p className="text-center text-gray-900 dark:text-gray-100">Loading...</p>
            )}
          </>
        )}

        {activeTab === 'Rent' && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Cars For Rent</h2>
            {carRentalData.length > 0 ? (
              renderItems(carRentalData.filter(car => car.rental === 1), 'Rent')
            ) : (
              <p className="text-center text-gray-900 dark:text-gray-100">Loading...</p>
            )}
          </>
        )}

        {activeTab === 'Parts' && (
          <>
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">Car Parts</h2>
            {carPartsData.length > 0 ? (
              renderItems(carPartsData, 'Parts')
            ) : (
              <p className="text-center text-gray-900 dark:text-gray-100">Loading...</p>
            )}
          </>
        )}
      </div>

      <ChatBot />
      <Footer />
    </div>
  );
};

export default Market;