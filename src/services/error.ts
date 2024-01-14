type ErrorName =
    // Record errors
    | 'ADDING_RECORD_ERROR'
    | 'DELETING_RECORD_ERROR'
    | 'GETTING_RECORD_ERROR'
    | 'UPDATING_RECORD_ERROR'
    | 'INVALID_RECORD_ID_ERROR'

    // Medication errors
    | 'CREATING_MEDICATION_ERROR'
    | 'GETTING_MEDICATION_ERROR'
    | 'INVALID_MEDICATION_ID_ERROR'
    | 'UPDATING_MEDICATION_ERROR'
    | 'DELETING_MEDICATION_ERROR'
    | 'GETTING_MEDICATIONS_BY_NAME_SUBSTRING_ERROR';

export class ProjectError extends Error {
    name: ErrorName;
    message: string;

    constructor(name: ErrorName, message: string) {
        super(message);
        this.name = name;
        this.message = message;
    }
}
