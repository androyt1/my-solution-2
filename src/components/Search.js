import React from 'react'
import HolidayList from "./components/HolidayList";








const Search = () => {
  return (
    <div className="min-h-[100vh] relative ">
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
    

   
   <HolidayList holidays={holidays} filteredVal={filteredVal} />



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

  )
}

export default Search