import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { IFactoryData } from '@/types/sprocket-types';

export const FactoriesSchema = sequelize.define<Model<IFactoryData, Optional<IFactoryData, 'id'>>>(
  'factories',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sprocket_production_actual: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
    sprocket_production_goal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
    time: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Date.now(),
    },
    factoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
