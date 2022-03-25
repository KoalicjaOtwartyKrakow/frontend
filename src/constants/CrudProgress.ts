const crudInProgressStates = Object.freeze({
    CREATE: "create",
    DELETE: "delete",
    NONE: "none",
    RETRIEVE: "retrieve",
    UPDATE: "update",
});

const getCrudInProgressState = ({
    createInProgress = false,
    deleteInProgress = false,
    retrieveInProgress = false,
    updateInProgress = false,
}) => {
    if (createInProgress) {
        return crudInProgressStates.CREATE;
    }
    if (deleteInProgress) {
        return crudInProgressStates.DELETE;
    }
    if (retrieveInProgress) {
        return crudInProgressStates.RETRIEVE;
    }
    if (updateInProgress) {
        return crudInProgressStates.UPDATE;
    }
    return crudInProgressStates.NONE;
};

export { getCrudInProgressState, crudInProgressStates };
