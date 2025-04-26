import { IconButton } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const PartCard = (props) => {
  const navigate = useNavigate();

  function handleClick(category) {
    props.setSelectedPart(props.partName);
    navigate("/Requested_Part", { state: { category } });
  }
  return (
    <div className="bg-gray-800 shadow-md rounded-lg flex flex-col items-center p-4 hover:scale-105 transition-transform duration-200 ease-in-out">
      <img
        src={props.imgSrc}
        alt={props.partName}
        className="rounded-md w-full h-48 object-cover" // Added w-full and h-48, object-cover
      />
      <div className="flex flex-row items-center justify-between w-full mt-4">
        <h1 className="text-lg font-bold text-white">{props.partName}</h1>
        <div className="flex space-x-2">
          <IconButton onClick={() => handleClick(props.partName)}>
            <DoubleArrowIcon sx={{ color: blue[400] }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default PartCard;
