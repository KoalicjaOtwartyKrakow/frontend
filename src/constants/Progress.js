const inProgressStates = Object.freeze({
    CREATE: "create",
    DELETE: "delete",
    NONE: "none",
    RETRIEVE: "retrieve",
    UPDATE: "update",
});

const getInProgressState = ({
    createInProgress = false,
    deleteInProgress = false,
    retrieveInProgress = false,
    updateInProgress = false,
}) => {
    if (createInProgress) {
        return inProgressStates.CREATE;
    }
    if (deleteInProgress) {
        return inProgressStates.DELETE;
    }
    if (retrieveInProgress) {
        return inProgressStates.RETRIEVE;
    }
    if (updateInProgress) {
        return inProgressStates.UPDATE;
    }
    return inProgressStates.NONE;
};

export { getInProgressState, inProgressStates };
