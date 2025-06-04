import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
  public id!: number;
  public uhid!: string;
  public title!: string;
  public firstName!: string;
  public middleName?: string;
  public lastName?: string;
  public gender!: string;
  public genderExtension?: string;
  public dateOfBirth!: Date;
  public birthPlace?: string;
  public birthTime?: string;
  public mobileNumber!: string;
  public alternateMobile?: string;
  public email?: string;
  public relation?: string;
  public relationName?: string;
  public referralSource?: string;
  public religion?: string;
  public specialCare?: boolean;
  public specialCourtesy?: string;
  public decease!: boolean;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uhid: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genderExtension: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    birthPlace: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alternateMobile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relationName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    referralSource: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    religion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialCare: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    specialCourtesy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    decease: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
  }
);

export default Patient;
