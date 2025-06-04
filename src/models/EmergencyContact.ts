import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patient from './Patient';

class EmergencyContact extends Model {
  public id!: number;
  public patientId!: number;
  public contactRelationship!: string;
  public mobile!: string;
  public landline?: string;
  public address?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EmergencyContact.init(
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
    contactRelationship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landline: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'EmergencyContact',
    tableName: 'emergency_contacts',
  }
);

// Define the relationship
EmergencyContact.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasOne(EmergencyContact, { foreignKey: 'patientId' });

export default EmergencyContact; 