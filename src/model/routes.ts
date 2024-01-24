type Routes = {
    BASE_NAME: string;
    HOME: string;
    BY_ID?: string;
    EDIT?: string;
    ADD?: string;
    MEMBERS?: string;
    MEMBER?: string;
    MEMBER_MEDS?: string;
    SEARCH?: string;
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
});

const GROUPS_ROUTES = createRoutes('groups');
const MEDICATIONS_ROUTES = createRoutes('medications');

const SETTINGS_ROUTES: Routes = {
    BASE_NAME: 'settings',
    HOME: '/settings',
};

const STOCK_ROUTES: Routes = {
    BASE_NAME: 'stock',
    HOME: '/stock',
    ADD: '/stock/add',
    SEARCH: '/stock/search',
    BY_ID: '/stock/[id]'
};

const PROFILE_ROUTES: Routes = {
    BASE_NAME: 'profile',
    HOME: '/profile',
};

const EDIT_PROFILE_ROUTES: Routes = {
    BASE_NAME: 'editProfile',
    HOME: '/editProfile',
};

export const ROUTE = {
    GROUPS: GROUPS_ROUTES,
    MEDICATIONS: MEDICATIONS_ROUTES,
    SETTINGS: SETTINGS_ROUTES,
    STOCK: STOCK_ROUTES,
    PROFILE: PROFILE_ROUTES,
    EDITPROFILE: EDIT_PROFILE_ROUTES,
};
