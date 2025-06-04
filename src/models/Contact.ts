import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Patient from './Patient';

class Contact extends Model {
  public id!: number;
  public patientId!: number;
  public doorNoStreet!: string;
  public addressLine1?: string;
  public addressLine2?: string;
  public cityTown!: string;
  public region!: string;
  public panCardNumber?: string;
  public aadhaarNumber?: string;
  public drivingLicenseNumber?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Contact.init(
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
    doorNoStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cityTown: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    panCardNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aadhaarNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    drivingLicenseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts',
  }
);

// Define the relationship
Contact.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasOne(Contact, { foreignKey: 'patientId' });

export default Contact; 