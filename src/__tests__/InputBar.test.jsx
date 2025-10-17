import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, expectTypeOf, test, vi } from "vitest";
import InputBar from "../components/InputBar";
import { Input } from "postcss";

describe("This test suite contains the tests related to the input bar section of the app", () => {
  const mockSetUserInput = vi.fn();
  const mockSetLocation = vi.fn();
  const mockSetGeoCoding = vi.fn();
  const mockSetCityResults = vi.fn();
  const user = userEvent.setup();
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("test weather the toast appears on clicking the search button for empty input bar", async () => {
    render(
      <InputBar
        userInput=""
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={[]}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);
    expect(screen.queryByRole("emptySearchQuery")).toBeInTheDocument();
  });
  test("test weather the app loads with the correct text or not", () => {
    render(
      <InputBar
        userInput=""
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults=""
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading=""
      />
    );
    const appText = screen.getByText(`How's the sky looking today?`);
    expect(appText).toBeInTheDocument();
  });
  test("test weather setUserInput is called", async () => {
    render(
      <InputBar
        userInput=""
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults=""
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading=""
      />
    );
    const input = screen.getByPlaceholderText("Search for a place");
    fireEvent.change(input, { target: { value: "test" } });
    expect(mockSetUserInput).toHaveBeenLastCalledWith("test");
    expect(mockSetUserInput).toHaveBeenCalledTimes(1);
  });
  test("test weather setLocation is called on search button click", async () => {
    render(
      <InputBar
        userInput="Tokyo"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults=""
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading=""
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);
    expect(mockSetLocation).toHaveBeenCalledWith("Tokyo");
  });
  test("test weather search results appear when query with more than one result", async () => {
    const mockResults = [
      { formatted: "Srinagar,jammu and kashmir" },
      { formatted: "Srinagar,Uttarakhand" },
    ];
    const { rerender } = render(
      <InputBar
        userInput="srinagar"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={[]}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    expect(screen.queryByRole("searchResults")).not.toBeInTheDocument();
    rerender(
      <InputBar
        userInput="srinagar"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={mockResults}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    const searchResults = screen.getByRole("searchResults");
    expect(searchResults).toBeInTheDocument();
  });
  test("weather the search button is disabled when we search for a search query", () => {
    render(
      <InputBar
        userInput="srinagar"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={[]}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={true}
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    expect(searchButton).toBeDisabled();
  });
  test("test for clearing the previous search result on new search", async () => {
    render(
      <InputBar
        userInput="tral"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={[]}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);
    expect(mockSetCityResults).toBeCalledWith([]);
  });
  test("selecting a result from the list ", async () => {
    const mockResults = [
      { formatted: "Srinagar,jammu and kashmir" },
      { formatted: "Srinagar,Uttarakhand" },
    ];
    const { rerender } = render(
      <InputBar
        userInput="srinagar"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={[]}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    expect(screen.queryByRole("searchResults")).not.toBeInTheDocument();
    rerender(
      <InputBar
        userInput="srinagar"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={mockResults}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    const searchResults = screen.getByRole("searchResults");
    expect(searchResults).toBeInTheDocument();
    const itemTobeSelected = screen.getByText(mockResults[0].formatted);
    await user.click(itemTobeSelected);
    expect(mockSetGeoCoding).toHaveBeenCalledTimes(1);
  });
  test("tests weather for the single result of the query the item in directly selected without showing the list of search results", async () => {
    const mockResults = [{ formatted: "Anantnag,jammu and kashmir" }];
    render(
      <InputBar
        userInput="Anantnag"
        setUserInput={mockSetUserInput}
        setLocation={mockSetLocation}
        cityResults={mockResults}
        setGeoCodingData={mockSetGeoCoding}
        setCityResults={mockSetCityResults}
        loading={false}
      />
    );
    const searchButton = screen.getByRole("button", { name: /search/i });
    await user.click(searchButton);
    expect(screen.queryByRole("searchResults")).not.toBeInTheDocument();
  });
});
