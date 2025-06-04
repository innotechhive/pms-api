import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db'; // Your Sequelize instance

interface PatientAttributes {
  patient_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_number?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface PatientCreationAttributes
  extends Optional<
    PatientAttributes,
    'patient_id' | 'created_at' | 'updated_at'
  > {}

class Patient
  extends Model<PatientAttributes, PatientCreationAttributes>
  implements PatientAttributes
{
  public patient_id!: number;
  public first_name!: string;
  public last_name!: string;
  public date_of_birth!: string;
  public gender?: string;
  public phone_number?: string;
  public email?: string;
  public address?: string;
  public emergency_contact_name?: string;
  public emergency_contact_number?: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    patient_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true, // Optional
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: true, // Optional
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: true, // Optional
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true, // Optional
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true, // Optional
    },
    emergency_contact_name: {
      type: DataTypes.STRING(100),
      allowNull: true, // Optional
    },
    emergency_contact_number: {
      type: DataTypes.STRING(15),
      allowNull: true, // Optional
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass in the sequelize instance
    modelName: 'Patient',
    tableName: 'patient',
    timestamps: false, // Disable Sequelize auto timestamps as we use custom ones
  }
);

export default Patient;
