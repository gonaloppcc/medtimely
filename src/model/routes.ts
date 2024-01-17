type Routes = {
    BASE_NAME: string;
    HOME: string;
    BY_ID?: string;
    EDIT?: string;
    ADD?: string;
    MEMBERS?: string;
    MEMBER?: string;
    MEMBER_MEDS?: string;
    MEMBER_RECORDS?: string;
};

const createRoutes = (BASE_NAME: string): Routes => ({
    BASE_NAME,
    HOME: `/${BASE_NAME}`,
    BY_ID: `/${BASE_NAME}/[id]`,
    EDIT: `/${BASE_NAME}/[id]/edit`,
    ADD: `/${BASE_NAME}/add`,
    MEMBERS: `/${BASE_NAME}/[id]/members`,
    MEMBER: `/${BASE_NAME}/[id]/members/[memberId]`,
    MEMBER_MEDS: `/${BASE_NAME}/[id]/members/[memberId]/meds`,
    MEMBER_RECORDS: `/${BASE_NAME}/[id]/members/[memberId]/records`,
});

const GROUPS_ROUTES = createRoutes('groups');
const MEDICATIONS_ROUTES = createRoutes('medications');
const RECORDS_ROUTES = createRoutes('records');

// const GROUPS_BASE_NAME = "groups";
// const GROUPS_ROUTES: Routes = {
//     BASE_NAME: GROUPS_BASE_NAME,
//     HOME: `/${GROUPS_BASE_NAME}`,
//     BY_ID: `/${GROUPS_BASE_NAME}/[id]`,
// };

// const MEDICATIONS_BASE_NAME = "medications";
// const MEDICATIONS_ROUTES: Routes = {
//     BASE_NAME: MEDICATIONS_BASE_NAME,
//     HOME: `/${MEDICATIONS_BASE_NAME}`,
//     BY_ID: `/${MEDICATIONS_BASE_NAME}/[id]`,
// };

// const RECORDS_BASE_NAME = "records";
// const RECORDS_ROUTES: Routes = {
//     BASE_NAME: RECORDS_BASE_NAME,
//     HOME: `/${RECORDS_BASE_NAME}`,
//     BY_ID: `/${RECORDS_BASE_NAME}/[id]`,
// };

const SETTINGS_ROUTES: Routes = {
    BASE_NAME: 'settings',
    HOME: '/settings',
};

const STOCK_ROUTES: Routes = {
    BASE_NAME: 'stock',
    HOME: '/ownedMedication',
};

export const ROUTE = {
    GROUPS: GROUPS_ROUTES,
    MEDICATIONS: MEDICATIONS_ROUTES,
    RECORDS: RECORDS_ROUTES,
    SETTINGS: SETTINGS_ROUTES,
    STOCK: STOCK_ROUTES,
};
