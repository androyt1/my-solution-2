import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

import HolidayList from "./components/HolidayList";

const App = () => {
  // Create an array to hold the filtered price per person

  // Create an array to hold the filtered the different features
  const facilities = [
    "Restaurant",
    "Bar",
    "Free Parking",
    "Room Service",
    "Safety Deposit Box",
    "Fitness Centre/Gym",
    "Laundry Service",
    "Internet Access",
    "Swimming Pool",
    "Hot tub",
  ];

  // Create an array to hold the star ratings

  //create a state to manage open and close of the filter sidebar
  const [openside, setOpenSide] = useState(false);


  //A function to open and close the filter sidebar
  const toggleSideBar = () => {
    setOpenSide(!openside); 
  };

  //close the filter sidebar when the user clicks outside of it
  const handleClickOutside = () => {
      setOpenSide(false);
  }

  // the function dynamically generates an input field every time the user clicks on the plus button for number of children
  const generateInputs = () => {
    setInputs(
      Array(children + 1).fill(
        <input
          type="number"
          defaultValue={2}
          name="ages"
          min="2"
          max="18"
          placeholder={`Age`}
          className="border-2  border-slate-300 py-1 pl-2 mx-1 shadow-md shadow-slate-600 focus:outline-dotted"
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      )
    );
  };

  //This function is triggered every time the user clicks the minus button for number of children
  const removeInput = () => {
    setInputs(inputs.slice(0, -1));
  };

  const [message] = useState("Enter Children Ages Below"); //Message to be displayed when the user clicks the plus button for number of children
  const [children, setChildren] = useState(0); //Number of children
  const [inputs, setInputs] = useState([]); //Array of input fields

  // This function is fired when the user clicks the plus button for number of children
  const incrementChildren = () => {
    setChildren(children + 1);
    //Call the function to dynamically generate div containing the input fields
    setShow(true);
    //generates the input fields for children ages
    generateInputs();
  };

  // This function is fired when the user clicks the minus button for number of children
  const decrementChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
      //Call the function to dynamically remove the input fields
      removeInput();
    }
    //If the number of children is 0, then hide the div that once contained the input fields
    if (children === 1) {
      setShow(false);
    }
  };

  //handleChange
  const dages = [];
  const [location, setLocation] = useState("orlando");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [duration, setDuration] = useState(7);
  const [adults, setAdults] = useState(1);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [holidays, setHolidays] = useState([]);
  const [filteredVal, setFilteredVal] = useState([]);
  const[errors,setErrors]=useState([]);

  const [infants, setInfants] = useState(0);

  //this function is fired when the user clicks the DONE button..it gets all the values from the children ages input fields and stores them in an array
  const getInputs = () => {
    let inputs = document.querySelectorAll('input[name="ages"]');
    inputs.forEach((input) => {
      if (input.value) {
        dages.push(input.value);
      }
    });
    //hides the div that once contained the input fields
    setShow(false);
  };

  // This function is fired when the user clicks on the Search button
  const handlePost = async (e) => {
    //start the loading indicator
    setLoading(true);
    //formats the date to be in the format that the API accepts
    const date = format(departureDate, "dd-MM-yyyy");
    //create an object to be sent to the API
    const booking = {
      bookingType: "hotel",
      location: location,
      departureDate: date,
      duration: duration,
      partyCompositions: [
        {
          adults: Number(adults),
          childAges: dages,
          infants: Number(infants),
        },
      ],
    };
    //sends the object to the API
    await axios
      .post("cjs-search-api/search", booking, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //set the holidays array to the response from the API
        setHolidays(res.data.holidays);
        setFilteredVal(res.data.holidays);
        setErrors([]);
        //stop the loading indicator
        setLoading(false);
      })
      //if the API returns an error, display the error message
      .catch((err) => {
        //log the error message
        console.log(err.response.data.errors[0]);
        //set the errors array to the error message
        setErrors(err.response.data.errors);
        //stop the loading indicator
        setLoading(false);
      });
  };

  //handlePricePerPersonFilter
  const handlePricePerPerson = (data) => {
    let filtered = [];
    switch (data) {
      case "300-1000":
        filtered = holidays.filter(
          (item) => item.pricePerPerson >= 300 && item.pricePerPerson <= 1000
        );
        setFilteredVal(filtered);
        break;
      case "1001-3000":
        filtered = holidays.filter(
          (item) => item.pricePerPerson >= 1001 && item.pricePerPerson <= 3000
        );
        setFilteredVal(filtered);
        break;
      case "3001-5000":
        filtered = holidays.filter(
          (item) => item.pricePerPerson >= 3001 && item.pricePerPerson <= 5000
        );
        setFilteredVal(filtered);
        break;
      case "5001-10000":
        filtered = holidays.filter(
          (item) => item.pricePerPerson >= 5001 && item.pricePerPerson <= 10000
        );
        setFilteredVal(filtered);
        break;
      case "10000+":
        filtered = holidays.filter((item) => item.pricePerPerson >= 10001);
        setFilteredVal(filtered);
        break;

      default:
        setFilteredVal(holidays);
    }
  };

  //handleRatingFilter
  const handleRating = (data) => {
    let filtered = [];
    switch (data) {
      case "3":
        filtered = holidays.filter(
          (item) => item.hotel.content.starRating === "3"
        );
        setFilteredVal(filtered);
        break;

      case "4":
        filtered = holidays.filter(
          (item) => item.hotel.content.starRating === "4"
        );
        setFilteredVal(filtered);
        break;

      case "5":
        filtered = holidays.filter(
          (item) => item.hotel.content.starRating === "5"
        );
        setFilteredVal(filtered);
        break;

      case "6":
        filtered = holidays.filter(
          (item) => item.hotel.content.starRating === "6"
        );
        setFilteredVal(filtered);
        break;

      default:
        setFilteredVal(holidays);
    }
  };

  //handle facilities filter
  const handleFacilities = (data) => {
    let filtered = [];
    switch (data) {
      case "Restaurant":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Restaurant")
        );
        setFilteredVal(filtered);
        break;
      case "Bar":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Bar")
        );
        setFilteredVal(filtered);
        break;
      case "Free Parking":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Free Parking")
        );
        setFilteredVal(filtered);
        break;
      case "Room Service":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Room Service")
        );
        setFilteredVal(filtered);
        break;
      case "Safety Deposit Box":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Safety Deposit Box")
        );
        setFilteredVal(filtered);
        break;
      case "Fitness Centre/Gym":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Fitness Centre/Gym")
        );
        setFilteredVal(filtered);
        break;
      case "Laundry Service":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Laundry Service")
        );
        setFilteredVal(filtered);
        break;
      case "Internet Access":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Internet Access")
        );
        setFilteredVal(filtered);
        break;
      case "Swimming Pool":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Swimming Pool")
        );
        setFilteredVal(filtered);
        break;
      case "Hot tub":
        filtered = holidays.filter((item) =>
          item.hotel.content.hotelFacilities.includes("Hot tub")
        );
        setFilteredVal(filtered);
        break;
      default:
        setFilteredVal(holidays);
    }
  };

  return (
    <div className="min-h-[100vh] relative " >
      <div className="w-full pb-3  flex  justify-center items-center  shadow-lg shadow-gray-600 mx-auto py-10 sticky top-0 z-20 bg-white">
        <div className="flex-1 flex flex-col justify-start items-start w-full px-3">
          <label htmlFor="" className="font-bold font-md">
            Destination
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="orlando">Select Location</option>
            <option value="new-york">New York</option>
            <option value="orlando">Orlando</option>
            <option value="barbados">Barbados</option>
            <option value="toronto">Toronto</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col justify-start items-start w-full px-3 ">
          <label htmlFor="" className="font-bold font-md">
            Departure Date
          </label>
          <DatePicker
            selected={departureDate}
            placeholderText="Click to select Departure Date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            dateFormat="dd-MM-yyyy"
            minDate={new Date()}
            onChange={(date) => setDepartureDate(date)}
          />
        </div>

        <div className="flex-1 flex flex-col justify-start items-start w-full px-5 ">
          <label htmlFor="" className="font-bold font-md">
            Duration
          </label>
          <input
            type="number"
            min={0}
            placeholder="Enter Duration Here"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div className="flex-1 flex flex-col justify-start items-start w-full px-5 ">
          <label htmlFor="" className="font-bold font-md">
            Adults
          </label>
          <input
            type="number"
            min={1}
            defaultValue={1}
            placeholder="Enter Number of Adults Here"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adults"
            name="adults"
            onChange={(e) => setAdults(e.target.value)}
          />
        </div>

        <div className="w-[20%]   flex flex-col justify-start items-center relative">
          <label htmlFor="" className="font-bold font-md px-5 pb-1">
            No of Children
          </label>

          <div>
            <button
              className="bg-slate-400 text-slate-50 px-5 rounded-lg py-2 font-bold ml-3 text-xl shadow-md shadow-slate-700"
              onClick={incrementChildren}
            >
              +
            </button>
            <span className="px-4 py-2 text-md font-bold shadow-md shadow-slate-700 mx-2">
              {children}
            </span>
            <button
              className="bg-slate-400 text-slate-50 px-5 rounded-lg py-2 font-bold text-md shadow-md shadow-slate-700"
              onClick={decrementChildren}
            >
              -
            </button>
          </div>

          <div
            className={`w-[500px] absolute top-[90px]  right-[50%] translate-x-[50%] border-2 bg-white border-slate-300 shadow-md shadow-slate-600 py-5 ${
              show ? "block" : "hidden"
            }`}
          >
            {inputs.length > 0 && (
              <div className="px-5 w-full flex justify-start items-center mt-4">
                <span className="font-bold font-md  pb-1">{message}</span>
              </div>
            )}
            <div className="px-5 w-full  flex justify-start items-center flex-wrap mb-4">
              {inputs.length > 0 &&
                inputs.map((input, index) => {
                  return <div key={index}>{input}</div>;
                })}
            </div>
            <div className="w-full flex justify-center items-center mt-10">
              <button
                className="px-10 py-2 border-2 border-slate-100 shadow-md shadow-slate-500"
                onClick={getInputs}
              >
                Done
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start items-start w-full px-3 ">
          <label htmlFor="" className="font-bold font-md">
            Infants
          </label>
          <input
            type="number"
            defaultValue={0}
            min={0}
            placeholder="Enter Number of Infants Here"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="infants"
            name="infants"
            onChange={(e) => setInfants(e.target.value)}
          />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <button  
            className="border-2 px-10 py-4 shadow-md shadow-slate-700 font-bold hover:bg-slate-500 hover:text-slate-100"
            onClick={handlePost}
          >
            submit
          </button>
        </div>
      </div>

      <div className="w-[100px] border-1 border-slate-600   z-[100] sticky left-2 top-[150px] rounded-2xl">
        {" "}
        <button
          className={`w-[100px] h-[50px] font-bold transition-all duration-300 ease-linear ${openside ? "bg-slate-100 text-slate-500 " : "bg-slate-500 text-slate-50"}`}
          onClick={toggleSideBar}
        >
          {openside ? "Close Filter" : "Open Filter"}
        </button>{" "}
      </div>

      
        <div className="w-full flex justify-center items">
          <h4 className="text-2xl font-bold">{loading? 'Loading Holidays...Please Wait':'Holidays'}</h4>
        </div>

      {errors ?  <div className="w-full flex justify-center items-center mt-4">
                {errors && errors.map((error,index)=>(
                  <div key={index}>* <span className="text-red-700">{error}</span></div>
                ))}
        </div>:''} 
      

     
     <HolidayList holidays={holidays} filteredVal={filteredVal} handleClickOutside={handleClickOutside}/>



      <div
        className={`w-[300px] h-[100vh] border-2 border-gray-300 fixed left-0 top-0 z-10 flex flex-col justify-center items-center px-5 bg-white transition-all duration-700 ease-linear ${
          openside ? "translate-x-0" : "translate-x-[-800px]"
        }`}
      >
        <h4 className="font-bold text-xl mb-4">Filters</h4>

        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-10"
          id=""
          onChange={(e) => handlePricePerPerson(e.target.value)}
        >
          <option value="">All Holidays -Price Per Person</option>
          <option value="300-1000">300-1000</option>
          <option value="1001-3000">1001-3000</option>
          <option value="3001-5000">3001-5000</option>
          <option value="5001-10000">5001-10000</option>
          <option value="10000+">Greater than 10000</option>
        </select>

        <select
          name=""
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-10"
          id=""
          onChange={(e) => handleFacilities(e.target.value)}
        >
          <option>Filter By Hotel Facilities</option>
          {facilities.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          name=""
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id=""
          onChange={(e) => handleRating(e.target.value)}
        >
          <option value="all">All Holidays Rating</option>
          <option value="3">3 Star</option>
          <option value="4">4 Star</option>
          <option value="5">5 Star</option>
          <option value="6">6 Star</option> 
        </select>
      </div>
    </div>
  );
};

export default App;
