import * as L from "leaflet";

export const baseStationIconGreen = L.icon({
  iconUrl: "./basestationgreen.png",
  iconSize: [40, 55],
});
export const baseStationIconGreenSelected = L.icon({
  iconUrl: "./basestationgreenselected.png",
  iconSize: [40, 55],
});

export const baseStationIconOrange = L.icon({
  iconUrl: "./basestationorange.png",
  iconSize: [40, 55],
});
export const baseStationIconOrangeSelected = L.icon({
  iconUrl: "./basestationorangeselected.png",
  iconSize: [40, 55],
});

export const baseStationIconRed = L.icon({
  iconUrl: "./basestationred.png",
  iconSize: [40, 55],
});
export const baseStationIconRedSelected = L.icon({
  iconUrl: "./basestationredselected.png",
  iconSize: [40, 55],
});

export const carIconGreen = L.icon({
  iconUrl: "./cargreen.png",
  iconSize: [45, 25],
});
export const carIconGreenSelected = L.icon({
  iconUrl: "./cargreenselected.png",
  iconSize: [47, 27],
});

export const carIconOrange = L.icon({
  iconUrl: "./carorange.png",
  iconSize: [45, 25],
});
export const carIconOrangeSelected = L.icon({
  iconUrl: "./carorangeselected.png",
  iconSize: [47, 27],
});

export const carIconRed = L.icon({
  iconUrl: "./carred.png",
  iconSize: [45, 25],
});
export const carIconRedSelected = L.icon({
  iconUrl: "./carredselected.png",
  iconSize: [47, 27],
});

export const portableIconGreen = L.icon({
  iconUrl: "./portablegreen.png",
  iconSize: [30, 40],
});
export const portableIconGreenSelected = L.icon({
  iconUrl: "./portablegreenselected.png",
  iconSize: [27, 40],
});

export const portableIconOrange = L.icon({
  iconUrl: "./portableorange.png",
  iconSize: [30, 40],
});
export const portableIconOrangeSelected = L.icon({
  iconUrl: "./portableorangeselected.png",
  iconSize: [27, 40],
});

export const portableIconRed = L.icon({
  iconUrl: "./portablered.png",
  iconSize: [30, 40],
});
export const portableIconRedSelected = L.icon({
  iconUrl: "./portableredselected.png",
  iconSize: [25, 40],
});

export const getIcon = (type: string, value: number, isSelected: boolean) => {
  switch (type) {
    case "BaseStation":
      if (isSelected) {
        if (value > 700) return baseStationIconGreenSelected;
        if (value > 400) return baseStationIconOrangeSelected;
        return baseStationIconRedSelected;
      } else {
        if (value > 700) return baseStationIconGreen;
        if (value > 400) return baseStationIconOrange;
        return baseStationIconRed;
      }
    case "Car":
      if (isSelected) {
        if (value > 700) return carIconGreenSelected;
        if (value > 100) return carIconOrangeSelected;
        return carIconRedSelected;
      } else {
        if (value > 700) return carIconGreen;
        if (value > 100) return carIconOrange;
        return carIconRed;
      }
    case "Portable":
      if (isSelected) {
        if (value > 700) return portableIconGreenSelected;
        if (value > 100) return portableIconOrangeSelected;
        return portableIconRedSelected;
      } else {
        if (value > 700) return portableIconGreen;
        if (value > 100) return portableIconOrange;
        return portableIconRed;
      }
    default:
      return baseStationIconRed;
  }
};
