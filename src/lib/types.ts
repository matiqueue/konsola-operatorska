export interface DataItem {
  Id: string;
  Name: string;
  Type: string;
  SerialNumber: string;
  Strength: number;
  BatteryLevel: number;
  WorkingMode: string;
  Position: {
    Lat: number;
    Lon: number;
  };
}

export interface SortConfig {
  key: keyof DataItem;
  direction: "ascending" | "descending";
}
