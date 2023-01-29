import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { FactoriesSchema } from '@/models/schemas/factoryData-schema';
import { ICompany } from '@/types/sprocket-types';

export const CompanySchema = sequelize.define<Model<ICompany, Optional<ICompany, 'id'>>>(
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

CompanySchema.hasMany(FactoriesSchema, {
  foreignKey: 'factoryId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

FactoriesSchema.belongsTo(CompanySchema, {
  foreignKey: 'factoryId',
  targetKey: 'id',
});
