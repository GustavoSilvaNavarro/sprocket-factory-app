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

export interface IDataList extends IFactoryData {
  name: string;
}

export interface ISprocket {
  id?: number;
  teeth: number;
  pitch_diameter: number;
  outside_diameter: number;
  pitch: number;
}

export interface IFactoryList {
  sprocket_production_actual: Array<number>;
  sprocket_production_goal: Array<number>;
  time: Array<number>;
}

export type AllFactoryData = {
  [key: string]: {
    factory: {
      chart_data: IFactoryList;
    };
  };
};
