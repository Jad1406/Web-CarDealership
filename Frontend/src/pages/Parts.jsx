import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import PartCard from "../components/PartCard";
import "../css/services.css";
import testImg from "../assets/MarketAssets/InteriorRemake.jpg";

const Parts = () => {

  const [carParts, setCarParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [reqData, setReqData] = useState([]);
  

  useEffect(()=>{
    const filteredData = carParts.filter((part) =>
      `${part.car_part_category}`.toLowerCase().includes(selectedPart.toLowerCase())
    );
    setReqData(JSON.stringify(filteredData))

    console.log("Filtered data:" + reqData);
    
  },[selectedPart]);

  return (
    <div className="flex flex-row min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div id="sideBar" className="w-[20%] min-h-screen p-2 pr-4 bg-gray-800 shadow-lg">
        <SideBar />
      </div>

      {/* Main Content */}
      <div id="mainBody" className="flex-1 flex flex-col items-center p-6 bg-gray-900 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-2">Car Parts Inventory</h1>
        <p className="text-gray-400 text-lg mb-6">Find the best parts for your car model</p>

        {/* Grid Layout */}
        <div id="gridLayout" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* To be changed to data from the database */}
          {[
            "Engine",
            "Exterior",
            "Suspension",
            "Steering",
            "Brake",
            "Interior",
            "Electrical",
            "Exhaust",
            "Misc. Parts"
          ].map((part, index) => (
            <PartCard
              key={index}
              imgSrc={testImg} 
              partName={part} 
              setSelectedPart ={setSelectedPart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Parts;
