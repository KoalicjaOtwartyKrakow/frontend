const CrudInProgressStates = {
    CREATE: "create",
    DELETE: "delete",
    NONE: "none",
    RETRIEVE: "retrieve",
    UPDATE: "update",
} as const;

type CrudInProgressState = typeof CrudInProgressStates[keyof typeof CrudInProgressStates];

type CrudProgressFlags = {
    createInProgress?: boolean;
    deleteInProgress?: boolean;
    retrieveInProgress?: boolean;
    updateInProgress?: boolean;
};

const getCrudInProgress = ({
    createInProgress = false,
    deleteInProgress = false,
    retrieveInProgress = false,
    updateInProgress = false,
}: CrudProgressFlags): CrudInProgressState => {
    if (createInProgress) {
        return CrudInProgressStates.CREATE;
    }
    if (deleteInProgress) {
        return CrudInProgressStates.DELETE;
    }
    if (retrieveInProgress) {
        return CrudInProgressStates.RETRIEVE;
    }
    if (updateInProgress) {
        return CrudInProgressStates.UPDATE;
    }
    return CrudInProgressStates.NONE;
};

const isCrudInProgress = (crudInProgress?: CrudInProgressState) => crudInProgress !== CrudInProgressStates.NONE;

export { getCrudInProgress, isCrudInProgress, CrudInProgressStates };
export type { CrudInProgressState, CrudProgressFlags };
