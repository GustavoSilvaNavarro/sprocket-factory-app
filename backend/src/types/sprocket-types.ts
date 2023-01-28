export interface IFactory {
  id?: number;
  sprocket_production_actual: number;
  sprocket_production_goal: number;
  time: Date;
}

export interface ISprockets {
  id?: number;
  teeth: number;
  pitch_diameter: number;
  outside_diameter: number;
  pitch: number;
}
