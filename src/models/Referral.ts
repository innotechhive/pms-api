import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patient from './Patient';

class Referral extends Model {
  public id!: number;
  public patientId!: number;
  public referralType!: string;
  public referredBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Referral.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id',
      },
    },
    referralType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    referredBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Referral',
    tableName: 'referrals',
  }
);

// Define the relationship
Referral.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasOne(Referral, { foreignKey: 'patientId' });

export default Referral; 