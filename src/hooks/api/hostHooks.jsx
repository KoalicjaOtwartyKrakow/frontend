import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
import Host from "models/Host";

const useGetHost = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true, autoCancel: false }
    );

    const host = data;
    const hostGetInProgress = loading;
    const hostGetError = getErrorsFromApi(error);

    const fetchHost = ({ hostId }) => {
        const url = getPath(Paths.HOST) + "/" + hostId;
        const transformResponse = (data) => plainToClass(Host, data);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetHost] Error on retrieveHost(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        host,
        hostGetInProgress,
        hostGetError,
        retrieveHost: fetchHost,
    };
};

const useUpdateHost = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "PUT" },
        { manual: true, autoCancel: false }
    );

    const updatedHost = data;
    const hostUpdateInProgress = loading;
    const hostUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Host} host
     * @returns {Promise<*|undefined>}
     */
    const updateHost = ({ host }) => {
        const url = getPath(Paths.HOST) + "/" + host.id;
        const transformResponse = (data) => {
            return data && plainToClass(Host, data);
        };
        const data = classToPlain(host);
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetHost] Error on updateHost(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        updatedHost,
        hostUpdateInProgress,
        hostUpdateError,
        updateHost,
    };
};

export { useGetHost, useUpdateHost };
