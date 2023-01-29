export interface ICompany {
  id?: number;
  name: string;
}

export interface IFactoryData {
  id?: number;
  sprocket_production_actual: number;
  sprocket_production_goal: number;
  time: number;
  factoryId?: number;
}

export interface ISprockets {
  id?: number;
  teeth: number;
  pitch_diameter: number;
  outside_diameter: number;
  pitch: number;
}
