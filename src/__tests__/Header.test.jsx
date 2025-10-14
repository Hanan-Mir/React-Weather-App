import { render, screen } from "@testing-library/react"
import Header from "../components/Header"
import { expect,describe,it } from "vitest";

import React from "react";
import userEvent from "@testing-library/user-event";

describe("Test suite related to the header",()=>{
    it("Renders the Logo of the Application",()=>{
        render(<Header />)
        console.log('setup file is loading')
        const logo=screen.getByAltText(/App logo/i);
        expect(logo).toBeInTheDocument()
    })
    describe('This suite is related to the dropdown menu with the unit conversion functionaltiy',()=>{
 it('Tests weather the dropdown is visiable on click or not',async()=>{
        const user=userEvent.setup();
        render(<Header />);
        const dropDownButton=screen.getByRole('button',{name:'dropDownButton'});
        expect(dropDownButton).toBeInTheDocument()
        await user.click(dropDownButton);
        expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toBeInTheDocument()
    })
    })
  it('Tests weather the dropdown closes on click of the span items or not',async()=>{
    const user=userEvent.setup();
    const closeLabels=[{testId:'celsius'},{testId:'fahrenheit'},{testId:'kmh'},{testId:'mph'},{testId:'mm'},{testId:'inch'}]
for(const labels of closeLabels){
    render(<Header />);
    await user.click(screen.getByRole('button',{name:'dropDownButton'}));
    expect(screen.getByRole('dropdown',{name:'unitConversionDropDown'})).toBeInTheDocument();
    await user.click(screen.getByTestId(labels.testId));
    expect(screen.getByRole('dropdown'),{name:'unitConversionDropDown'}).not.toBeInTheDocument();
}  
})  
   
})