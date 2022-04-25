import {render,screen,cleanup} from '@testing-library/react'
import HolidayList from '../HolidayList'

test('expect HolidayList to be in Document',()=>{
    render(<HolidayList/>)
   const List=screen.getByTestId("holiday-list")
    expect(List).toBeInTheDocument()
}) 