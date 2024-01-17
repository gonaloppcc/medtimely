type ErrorName =
    // Record errors
    | 'ADDING_RECORD_ERROR'
    | 'DELETING_RECORD_ERROR'
    | 'GETTING_RECORD_ERROR'
    | 'GETTING_RECORDS_ERROR'
    | 'UPDATING_RECORD_ERROR'
    | 'INVALID_RECORD_ID_ERROR'

    // Medication errors
    | 'CREATING_MEDICATION_ERROR'
    | 'GETTING_MEDICATION_ERROR'
    | 'INVALID_MEDICATION_ID_ERROR'
    | 'UPDATING_MEDICATION_ERROR'
    | 'DELETING_MEDICATION_ERROR'
    | 'GETTING_MEDICATIONS_BY_NAME_SUBSTRING_ERROR'

    // Owned medication errors
    | 'CREATING_OWNED_MEDICATION_ERROR'
    | 'GETTING_OWNED_MEDICATION_ERROR'
    | 'GETTING_OWNED_MEDICATIONS_ERROR'
    | 'INVALID_OWNED_MEDICATION_ID_ERROR'
    | 'UPDATING_OWNED_MEDICATION_ERROR'
    | 'DELETING_OWNED_MEDICATION_ERROR'

    // Group errors
    | 'CREATING_GROUP_ERROR'
    | 'GETTING_GROUP_ERROR'
    | 'INVALID_GROUP_ID_ERROR'
    | 'UPDATING_GROUP_ERROR'
    | 'DELETING_GROUP_ERROR'
    | 'GETTING_GROUPS_BY_NAME_SUBSTRING_ERROR'

    // User errors
    | 'CREATING_USER_ERROR'
    | 'DELETING_USER_ERROR'
    | 'GETTING_USER_ERROR'
    | 'UPDATING_USER_ERROR'
    | 'INVALID_USER_ID_ERROR';

export class ProjectError extends Error {
    name: ErrorName;
    message: string;

    constructor(name: ErrorName, message: string) {
        super(message);
        this.name = name;
        this.message = message;
    }
}
