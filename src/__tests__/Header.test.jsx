import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import Header from "../components/Header";
import userEvent from "@testing-library/user-event";

describe('Test suite related to the header component',()=>{
  const mockSetSelectedTemperature=vi.fn();
const mockSetSelectedWindSpeed=vi.fn();
const mockSetSelectedPrecipitation=vi.fn();
const mockSetTemperatureUnit=vi.fn();
const mockSetWindSpeedUnit=vi.fn();
const mockSetPrecipitationUnit=vi.fn()
const user=userEvent.setup();
beforeEach(()=>{
render(<Header selectedTemperature={true} setSelectedTemperature={mockSetSelectedTemperature} selectedWindSpeed={true} setSelectedWindSpeed={mockSetSelectedWindSpeed} selectedPrecipitation={true} setSelectedPrecipitation={mockSetSelectedPrecipitation} setTemperatureUnit={mockSetTemperatureUnit} setWindSpeedUnit={mockSetWindSpeedUnit} setPrecipitationUnit={mockSetPrecipitationUnit} />)
})
afterEach(()=>{
vi.clearAllMocks();
})
test('Tests weather the logo is present or not',()=>{
  const logo = screen.getByAltText(/App logo/i);
expect(logo).toBeInTheDocument();
})
test('Test weather clicking the dropdown makes dropdown visiable on the screen or not',async()=>{
  const dropDownButton=screen.getByRole('button',{name:'dropDownButton'})
  await user.click(dropDownButton);
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('block')
})
test('Test weather clicking an temperature option closes the dropdown',async()=>{
   const dropDownButton=screen.getByRole('button',{name:'dropDownButton'})
  await user.click(dropDownButton);
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('block');
  const farenheitOption=screen.getByTestId('fahrenheit');
  await user.click(farenheitOption);
  expect(mockSetTemperatureUnit).toHaveBeenCalledTimes(1);
  expect(mockSetTemperatureUnit).toHaveBeenCalledWith('fahrenheit');
  expect(mockSetSelectedTemperature).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('hidden');
})
test('Test weather clicking an windspeed option closes the dropdown',async()=>{
   const dropDownButton=screen.getByRole('button',{name:'dropDownButton'})
  await user.click(dropDownButton);
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('block');
  const mphOption=screen.getByTestId('mph');
  await user.click(mphOption);
  expect(mockSetWindSpeedUnit).toHaveBeenCalledTimes(1);
  expect(mockSetWindSpeedUnit).toHaveBeenCalledWith('mph');
  expect(mockSetSelectedWindSpeed).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('hidden');
})
test('Test weather clicking an precipitation option closes the dropdown',async()=>{
     const dropDownButton=screen.getByRole('button',{name:'dropDownButton'})
  await user.click(dropDownButton);
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('block');
  const inchOption=screen.getByTestId('inch');
  await user.click(inchOption);
    expect(mockSetPrecipitationUnit).toHaveBeenCalledTimes(1);
  expect(mockSetPrecipitationUnit).toHaveBeenCalledWith('inch');
  expect(mockSetSelectedPrecipitation).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toHaveClass('hidden');

})
})


