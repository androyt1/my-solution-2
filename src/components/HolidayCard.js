import React from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

 

const HolidayCard = ({holiday}) => {
  return ( 
    <div   className="py-5 px-3 shadow-md shadow-slate-800 " 
          >
            <div>
              <h5 className="text-xl font-bold">{holiday.hotel.name}</h5> 
              <p>Board Basis: {holiday.hotel.boardBasis}</p>
              <p>total price: {holiday.totalPrice}</p>
              <p>price per person: {holiday.pricePerPerson}</p>
              <p>Hotel Name: {holiday.hotel.name}</p>
              <p>V-Rating: {holiday.hotel.content.vRating}</p>
              <Carousel showThumbs={false}>
                {holiday.hotel.content.images.map((image, index) => {
                  return (
                    <div key={index}>
                      <img src={image.RESULTS_CAROUSEL.url} alt="" />
                      <p>{holiday.hotel.content.hotelDescription}</p>
                    </div>
                  );
                })}
              </Carousel>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="w-full py-2 pl-2">
                <h5 className="text-xl font-bold">Features</h5>
                <ul>
                  {holiday.hotel.content.atAGlance.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="w-full py-2 pl-3">
                <h5 className="text-xl font-bold">Hotel Facilities</h5>
                <ul>
                  {holiday.hotel.content.hotelFacilities.map(
                    (item, index) => {
                      return <li key={index}>{item}</li>;
                    }
                  )}
                </ul>
              </div>
            </div>
            <p>
              <span className="font-bold text-xl">Parent Location </span>:{" "}
              {holiday.hotel.content.parentLocation}
            </p>
            <div className="w-full flex justify-center items-center">
              <div className="w-full">
                <h5 className="text-xl font-bold">Holiday Type</h5>
                <ul>
                  {holiday.hotel.content.holidayType.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
              <div className="w-full">
                <h5 className="text-xl font-bold">Board Basis</h5>
                <ul>
                  {holiday.hotel.content.boardBasis.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ul>
              </div>
            </div>

            <div className="w-full flex justify-center items-center">
              <div className="w-full">
                <h5 className="text-xl font-bold">Hotel Location</h5>
                <ul>
                  {holiday.hotel.content.hotelLocation.map(
                    (item, index) => {
                      return <li key={index}>{item}</li>;
                    }
                  )}
                </ul>
              </div>
              <div className="w-full">
                <ul>
                  <h5 className="text-xl font-bold">Accommodation Type</h5>
                  {holiday.hotel.content.accommodationType.map(
                    (item, index) => {
                      return <li key={index}>{item}</li>;
                    }
                  )}
                </ul>
              </div>
            </div>
            <p>
              <span className="font-bold">Star Rating</span> :
              {holiday.hotel.content.starRating}
            </p>
            <p>
              <span className="font-bold">Property Type</span>:
              {holiday.hotel.content.propertyType}
            </p>
            <p>
              <span className="font-bold">Flying Cubic Miles</span> :{" "}
              {holiday.flyingClubMiles}
            </p>
            <p>
              <span className="font-bold">Virgin Points</span> :{" "}
              {holiday.virginPoints}
            </p>
            <p>
              <span className="font-bold">Tier Points</span> :{" "}
              {holiday.tierPoints}
            </p>
            <p>
              <span className="font-bold">Departure Date</span> :{" "}
              {holiday.departureDate}
            </p>
            <p>
              <span className="font-bold">selected Date:</span>{" "}
              {holiday.selectedDate}
            </p>
          </div>
  )
}

export default HolidayCard