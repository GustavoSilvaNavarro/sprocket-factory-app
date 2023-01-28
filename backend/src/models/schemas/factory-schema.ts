import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { IFactory } from '@/types/sprocket-types';

export const FactoriesSchema = sequelize.define<Model<IFactory, Optional<IFactory, 'id'>>>(
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);
