type Routes = {
    HOME: string;
    BY_ID: string;
};

const GROUPS_ROUTES: Routes = {
    HOME: '/groups',
    BY_ID: '/groups/[id]',
};

const MEDICATIONS_ROUTES: Routes = {
    HOME: '/medications',
    BY_ID: '/medications/[id]',
};

const RECORDS_ROUTES: Routes = {
    HOME: '/records',
    BY_ID: '/records/[id]',
};

export const ROUTE = {
    GROUPS: GROUPS_ROUTES,
    MEDICATIONS: MEDICATIONS_ROUTES,
    RECORDS: RECORDS_ROUTES,
};
