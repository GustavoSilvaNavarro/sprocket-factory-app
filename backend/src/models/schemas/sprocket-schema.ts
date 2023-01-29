import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { ISprocket } from '@/types/sprocket-types';

export const SprocketsSchema = sequelize.define<Model<ISprocket, Optional<ISprocket, 'id'>>>(
  'sprockets',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teeth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
    pitch_diameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
    outside_diameter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
    pitch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Field must be an integer',
        },
      },
    },
  },
  {
    timestamps: false,
  }
);
