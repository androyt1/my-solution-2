import React from 'react'
import HolidayCard from './HolidayCard'

const HolidayList = ({holidays,filteredVal,handleClickOutside}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  mt-10 px-3 gap-x-3 gap-y-8" data-testid='holiday-list'  onClick={handleClickOutside}>
    {holidays &&
      filteredVal.map((holiday, index) => {
        return (
          <HolidayCard key={index} holiday={holiday} />
        );
      })}
  </div>
  )
}

export default HolidayList