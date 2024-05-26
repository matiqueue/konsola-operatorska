import * as L from "leaflet";

export const baseStationIconGreen = L.icon({
  iconUrl: "./basestationgreen.png",
  iconSize: [40, 55],
});

export const baseStationIconOrange = L.icon({
  iconUrl: "./basestationOrange.png",
  iconSize: [40, 55],
});

export const baseStationIconRed = L.icon({
  iconUrl: "./basestationRed.png",
  iconSize: [40, 55],
});

export const carIconGreen = L.icon({
  iconUrl: "./carGreen.png",
  iconSize: [45, 25],
});

export const carIconOrange = L.icon({
  iconUrl: "./carOrange.png",
  iconSize: [45, 25],
});

export const carIconRed = L.icon({
  iconUrl: "./carRed.png",
  iconSize: [45, 25],
});

export const portableIconGreen = L.icon({
  iconUrl: "./portableGreen.png",
  iconSize: [30, 40],
});

export const portableIconOrange = L.icon({
  iconUrl: "./portableOrange.png",
  iconSize: [30, 40],
});

export const portableIconRed = L.icon({
  iconUrl: "./portableRed.png",
  iconSize: [30, 40],
});

export const getIcon = (type: string, value: number) => {
  switch (type) {
    case "BaseStation":
      if (value > 700) return baseStationIconGreen;
      if (value > 400) return baseStationIconOrange;
      return baseStationIconRed;
    case "Car":
      if (value > 700) return carIconGreen;
      if (value > 100) return carIconOrange;
      return carIconRed;
    case "Portable":
      if (value > 700) return portableIconGreen;
      if (value > 100) return portableIconOrange;
      return portableIconRed;
    default:
      return baseStationIconRed;
  }
};
