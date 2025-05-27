import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LocationForm from "../components/LocationForm";
import * as locationStore from "../store/locationStore";

jest.mock("../store/locationStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

beforeEach(() => {
  locationStore.default.mockReturnValue({
    addLocation: jest.fn().mockResolvedValue({}),
    loading: false,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders LocationForm and submits valid data", async () => {
  render(<LocationForm />);

  fireEvent.change(screen.getByLabelText(/location name/i), {
    target: { value: "Test" },
  });
  fireEvent.change(screen.getByLabelText(/latitude/i), {
    target: { value: "41.0082" },
  });
  fireEvent.change(screen.getByLabelText(/longitude/i), {
    target: { value: "28.9784" },
  });
  fireEvent.click(screen.getByText(/add location/i));

  await waitFor(() => {
    expect(locationStore.default().addLocation).toHaveBeenCalledWith({
      name: "Test",
      latitude: 41.0082,
      longitude: 28.9784,
      color: "#ff0000",
    });
  });
});
