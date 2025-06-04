import { Request, Response } from 'express';
import Patient from '../models/Patient';
import Contact from '../models/Contact';
import EmergencyContact from '../models/EmergencyContact';
import Referral from '../models/Referral';
import { Op } from 'sequelize';

export class PatientController {
  // Create a new patient with all related information
  async create(req: Request, res: Response) {
    try {
      const {
        patient,
        contact,
        emergencyContact,
        referral,
      } = req.body;

      const result = await Patient.create(patient);

      if (contact) {
        await Contact.create({ ...contact, patientId: result.id });
      }

      if (emergencyContact) {
        await EmergencyContact.create({ ...emergencyContact, patientId: result.id });
      }

      if (referral) {
        await Referral.create({ ...referral, patientId: result.id });
      }

      const createdPatient = await Patient.findByPk(result.id, {
        include: [Contact, EmergencyContact, Referral],
      });

      return res.status(201).json(createdPatient);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create patient' });
    }
  }

  // Get all patients with pagination
  async getAll(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Patient.findAndCountAll({
        limit,
        offset,
        include: [Contact, EmergencyContact, Referral],
      });

      return res.json({
        total: count,
        page,
        limit,
        patients: rows,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch patients' });
    }
  }

  // Get a single patient by ID
  async getById(req: Request, res: Response) {
    try {
      const patient = await Patient.findByPk(req.params.id, {
        include: [Contact, EmergencyContact, Referral],
      });

      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      return res.json(patient);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch patient' });
    }
  }

  // Update a patient
  async update(req: Request, res: Response) {
    try {
      const {
        patient,
        contact,
        emergencyContact,
        referral,
      } = req.body;

      const existingPatient = await Patient.findByPk(req.params.id);
      if (!existingPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      await existingPatient.update(patient);

      if (contact) {
        const existingContact = await Contact.findOne({ where: { patientId: req.params.id } });
        if (existingContact) {
          await existingContact.update(contact);
        } else {
          await Contact.create({ ...contact, patientId: req.params.id });
        }
      }

      if (emergencyContact) {
        const existingEmergencyContact = await EmergencyContact.findOne({ where: { patientId: req.params.id } });
        if (existingEmergencyContact) {
          await existingEmergencyContact.update(emergencyContact);
        } else {
          await EmergencyContact.create({ ...emergencyContact, patientId: req.params.id });
        }
      }

      if (referral) {
        const existingReferral = await Referral.findOne({ where: { patientId: req.params.id } });
        if (existingReferral) {
          await existingReferral.update(referral);
        } else {
          await Referral.create({ ...referral, patientId: req.params.id });
        }
      }

      const updatedPatient = await Patient.findByPk(req.params.id, {
        include: [Contact, EmergencyContact, Referral],
      });

      return res.json(updatedPatient);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update patient' });
    }
  }

  // Delete a patient
  async delete(req: Request, res: Response) {
    try {
      const patient = await Patient.findByPk(req.params.id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      await patient.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete patient' });
    }
  }

  // Search patients
  async search(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const patients = await Patient.findAll({
        where: {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${query}%` } },
            { lastName: { [Op.iLike]: `%${query}%` } },
            { uhid: { [Op.iLike]: `%${query}%` } },
            { mobileNumber: { [Op.iLike]: `%${query}%` } },
          ],
        },
        include: [Contact, EmergencyContact, Referral],
      });

      return res.json(patients);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to search patients' });
    }
  }
}

export default new PatientController();
