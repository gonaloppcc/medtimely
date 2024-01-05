type ErrorName =
    // Record errors
    | 'ADDING_RECORD_ERROR'
    | 'DELETING_RECORD_ERROR'
    | 'GETTING_RECORD_ERROR'
    | 'UPDATING_RECORD_ERROR'
    | 'INVALID_RECORD_ID_ERROR'
    // Medication errors
    | 'CREATING_MEDICATION_ERROR';

export class ProjectError extends Error {
    name: ErrorName;
    message: string;

    constructor(name: ErrorName, message: string) {
        super(message);
        this.name = name;
        this.message = message;
    }
}
