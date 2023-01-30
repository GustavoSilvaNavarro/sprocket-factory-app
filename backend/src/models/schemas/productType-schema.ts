import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '@/models/connectionDb';
import { SprocketsSchema } from '@/models/schemas/sprocket-schema';
import { ProductType } from '@/types/sprocket-types';

export const ProductSchema = sequelize.define<Model<ProductType, Optional<ProductType, 'id'>>>(
  'products',
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

ProductSchema.hasMany(SprocketsSchema, {
  foreignKey: 'productTypeId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});

SprocketsSchema.belongsTo(ProductSchema, {
  foreignKey: 'productTypeId',
  targetKey: 'id',
});
