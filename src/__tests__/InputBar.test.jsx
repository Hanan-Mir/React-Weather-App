import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, test, vi } from "vitest"
import InputBar from "../components/InputBar";

describe('This test suite contains the tests related to the input bar section of the app',()=>{
    const mockSetUserInput=vi.fn();
    const mockSetLocation=vi.fn();
    const mockSetGeoCoding=vi.fn();
    const mockSetCityResults=vi.fn();
    const user=userEvent.setup();
    afterEach(()=>{
        vi.clearAllMocks();
    })
    test('test weather the app loads with the correct text or not',()=>{
        render(<InputBar userInput='' setUserInput={mockSetUserInput} setLocation={mockSetLocation} cityResults='' setGeoCodingData={mockSetGeoCoding} setCityResults={mockSetCityResults} loading='' />)
        const appText=screen.getByText(`How's the sky looking today?`);
        expect(appText).toBeInTheDocument();
    })
    test('test weather setUserInput is called',async ()=>{
        render(<InputBar userInput='' setUserInput={mockSetUserInput} setLocation={mockSetLocation} cityResults='' setGeoCodingData={mockSetGeoCoding} setCityResults={mockSetCityResults} loading='' /> );
        const input=screen.getByPlaceholderText('Search for a place');
        fireEvent.change(input,{target:{value:'test'}})
        expect(mockSetUserInput).toHaveBeenLastCalledWith('test')
        expect(mockSetUserInput).toHaveBeenCalledTimes(1)
    })
    test('test weather setLocation is called on search button click',async ()=>{
        render(<InputBar userInput='Tokyo' setUserInput={mockSetUserInput} setLocation={mockSetLocation} cityResults='' setGeoCodingData={mockSetGeoCoding} setCityResults={mockSetCityResults} loading='' />)
        const searchButton=screen.getByRole('button',{name:/search/i});
        await user.click(searchButton);
        expect(mockSetLocation).toHaveBeenCalledWith('Tokyo');
    })
    test('test weather search results appear when query with more than one result',async()=>{
               render(<InputBar userInput='srinagar' setUserInput={mockSetUserInput} setLocation={mockSetLocation} cityResults='' setGeoCodingData={mockSetGeoCoding} setCityResults={mockSetCityResults} loading='' />)
const searchButton=screen.getByRole('button',{name:/search/i});
const searchResults=screen.getByRole('searchResults');
await user.click(searchButton);
expect(searchResults).toBeVisible();

    })
})