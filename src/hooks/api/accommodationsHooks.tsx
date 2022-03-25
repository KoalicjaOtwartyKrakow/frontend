import useAxios from "axios-hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";

const useGetAccommodations = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const accommodations = data;
    const accommodationsGetInProgress = loading;
    const accommodationsGetError = getErrorsFromApi(error);

    const retrieveAccommodations = () => {
        const url = getPath(ApiPaths.ACCOMMODATION);
        const transformResponse = transformArrayResponse(Accommodation);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetAccommodations] Error on retrieveAccommodations(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        accommodations,
        accommodationsGetInProgress,
        accommodationsGetError,
        retrieveAccommodations,
    };
};

export { useGetAccommodations };
