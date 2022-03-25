import useAxios from "axios-hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Guest' or its correspon... Remove this comment to see the full error message
import Guest from "models/Guest";

const useGetGuests = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const guests = data;
    const guestsGetInProgress = loading;
    const guestsGetError = getErrorsFromApi(error);

    const retrieveGuests = () => {
        const url = getPath(ApiPaths.GUEST);
        const transformResponse = transformArrayResponse(Guest);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetGuests] Error on retrieveGuests(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        guests,
        guestsGetInProgress,
        guestsGetError,
        retrieveGuests,
    };
};

export { useGetGuests };
