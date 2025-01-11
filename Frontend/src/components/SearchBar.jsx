import React, { useEffect, useState } from "react";

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState(""); // Current input value
  const [searchHistory, setSearchHistory] = useState([]); // Search history
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Tracks if search bar is clicked

  useEffect(()=>{ 
  setSearchInput("");
  setSearchHistory([])
  setIsSearchClicked(false)
  },[])

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
        setSearchHistory((prevHistory) => {
          // Add the searchInput only if it doesn't already exist in the history
          if (!prevHistory.includes(searchInput)) {
            return [...prevHistory, searchInput];
          }
          return prevHistory;
        });
        setSearchInput(""); // Clear input after adding to history
      }
  };

  const handleFocus = () => {
  setIsSearchClicked(true);
  };

  const handleBlur = () => {
  // Delay hiding to allow click events on history items
  setTimeout(() => setIsSearchClicked(false), 200);
  };

  return (
      <div>
        <div class="flex items-center justify-center">
          <div class="rounded-lg bg-gray-200">
            <div class="flex">
            
              <div class="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                <svg viewBox="0 0 20 20" aria-hidden="true" class="pointer-events-none absolute w-5 fill-gray-500 transition">
                <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                </svg>
              </div>  

              <input type="text" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0 text-black" placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onFocus={handleFocus} onBlur={handleBlur}/>
              <input type="button" value="Search" className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer" onClick={handleSearch}/>

              
            </div>

            {isSearchClicked && searchHistory.length > 0 && (
                <div className="absolute bg-white border border-gray-300 rounded shadow-md mt-1 text-black">
                  {searchHistory.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSearchInput(item)} // Populate input with clicked history
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    );
    };
    
export default SearchComponent;