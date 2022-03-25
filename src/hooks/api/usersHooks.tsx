import useAxios from "axios-hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/User' or its correspond... Remove this comment to see the full error message
import User from "models/User";

const useGetUsers = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const users = data;
    const usersGetInProgress = loading;
    const usersGetError = getErrorsFromApi(error);

    const retrieveUsers = () => {
        const url = getPath(ApiPaths.USER);
        const transformResponse = transformArrayResponse(User);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetUsers] Error on retrieveUsers(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        users,
        usersGetInProgress,
        usersGetError,
        retrieveUsers,
    };
};

export { useGetUsers };
