class Routes {
    static ROOT = '/';
    static APARTMENTS = '/apartments';
    static APARTMENTS_CREATE = Routes.APARTMENTS + '/create';
    static APARTMENTS_EDIT = Routes.APARTMENTS + '/:id/edit';
}

export default Routes;