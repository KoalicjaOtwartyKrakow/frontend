import useAxios from "axios-hooks";

import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";

import { ApiPaths } from "services/Api/constants";

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
