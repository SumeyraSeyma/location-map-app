import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LocationList from "../components/LocationList";
import useLocationStore from "../store/locationStore";

jest.mock("../store/locationStore");

test("renders location list and calculates route", async () => {
  const mockSetSelectedLocation = jest.fn();
  const mockFetchRoute = jest.fn().mockResolvedValue();

  useLocationStore.mockReturnValue({
    locations: [
      {
        _id: "1",
        name: "Ankara",
        latitude: 39.9334,
        longitude: 32.8597,
        color: "#ff0000",
      },
    ],
    setSelectedLocation: mockSetSelectedLocation,
    fetchRoute: mockFetchRoute,
    loading: false,
  });

  render(<LocationList />);

  expect(screen.getByText(/Ankara/i)).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText(/Start Latitude/i), {
    target: { value: "40.0" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Start Longitude/i), {
    target: { value: "30.0" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Calculate/i }));

  await waitFor(() => {
    expect(mockFetchRoute).toHaveBeenCalledWith("40.0", "30.0");
  });
});
