import { render, screen } from "@testing-library/react";
import Map from "../components/Map";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
  TileLayer: () => null,
  Marker: () => null,
  Polyline: () => null,
  Tooltip: () => null,
}));

jest.mock("../store/locationStore", () => ({
  __esModule: true,
  default: () => ({
    locations: [
      {
        _id: "1",
        name: "Ankara",
        latitude: 39.9334,
        longitude: 32.8597,
        color: "#ff0000",
      },
      {
        _id: "2",
        name: "Istanbul",
        latitude: 41.0082,
        longitude: 28.9784,
        color: "#00ff00",
      },
    ],
    route: [
      { latitude: 39.9334, longitude: 32.8597 },
      { latitude: 41.0082, longitude: 28.9784 },
    ],
  }),
}));

test("renders map with markers and route info", () => {
  render(<Map />);

  expect(screen.getByText(/Total Distance/i)).toBeInTheDocument();

  expect(screen.getByTestId("map")).toBeInTheDocument();
});
