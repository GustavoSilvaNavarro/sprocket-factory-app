import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { ICompany } from '@/types/sprocket-types';

export const FactoriesSchema = sequelize.define<Model<ICompany, Optional<ICompany, 'id'>>>(
  'companies',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
    },
  },
  {
    timestamps: false,
  }
);
