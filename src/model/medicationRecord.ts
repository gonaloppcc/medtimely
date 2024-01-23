export interface MedicationRecord {
    id: string; // ID only set when retrieved from db
    isPlanned: boolean; // se for planned então pode-se ir ao plannedMeds desse user com o ownedMedicationRef
    ownedMedicationRef: string; // Reference to the medication subcollection: personal or group
    name: string;
    dosage: string;
    form: MedicationRecordForm;
    units?: number;
    missed?: boolean;
    scheduledTime: Date;
}

export interface MedicationRecordWithoutMedication {
    isPlanned: boolean;
    units?: number;
    missed?: boolean;
    scheduledTime: Date;
}

export type MedicationRecordData = Omit<MedicationRecord, 'id'>;

export enum MedicationRecordForm {
    TABLET = 'Tablet',
    CAPSULE = 'Capsule',
    SYRUP = 'Syrup',
    INJECTION = 'Injection',
    DROPS = 'Drops',
    INHALER = 'Inhaler',
    CREAM = 'Cream',
    OINTMENT = 'Ointment',
    LOTION = 'Lotion',
    SUPPOSITORY = 'Suppository',
    POWDER = 'Powder',
    GEL = 'Gel',
    SPRAY = 'Spray',
    PATCH = 'Patch',
    IMPLANT = 'Implant',
    MOUTHWASH = 'Mouthwash',
    SOLUTION = 'Solution',
    SUSPENSION = 'Suspension',
    EMULSION = 'Emulsion',
    AEROSOL = 'Aerosol',
    MIST = 'Mist',
    FOAM = 'Foam',
    OIL = 'Oil',
    GARGLE = 'Gargle',
    PASTE = 'Paste',
    JELLY = 'Jelly',
    ENEMA = 'Enema',
    PESSARY = 'Pessary',
    DUSTING = 'Dusting',
    DRESSING = 'Dressing',
    WASH = 'Wash',
    SHAMPOO = 'Shampoo',
    LINIMENT = 'Liniment',
    SOAP = 'Soap',
    CLEANSER = 'Cleanser',
    SHOWER = 'Shower',
    BATH = 'Bath',
    SPRINKLE = 'Sprinkle',
    SOAK = 'Soak',
    DROPPER = 'Dropper',
    SWAB = 'Swab',
    TINCTURE = 'Tincture',
    LIQUID = 'Liquid',
}
