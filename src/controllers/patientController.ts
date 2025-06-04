import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    console.error('Error retrieving patients:', error);
    res.status(500).json({ error: 'Failed to retrieve patients' });
  }
};

export const createPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create patient' });
  }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update patient' });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve patient' });
  }
};

export default {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientById,
};
