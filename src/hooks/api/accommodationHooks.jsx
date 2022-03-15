import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
import Accommodation from "models/Accommodation";

const useGetAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true, autoCancel: false }
    );

    const accommodation = data;
    const accommodationGetInProgress = loading;
    const accommodationGetError = getErrorsFromApi(error);

    const fetchAccommodation = ({ accommodationId }) => {
        const url = getPath(Paths.ACCOMMODATION) + "/" + accommodationId;
        const transformResponse = (data) => plainToClass(Accommodation, data);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetAccommodation] Error on retrieveAccommodation(): ",
                    error
                );
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        retrieveAccommodation: fetchAccommodation,
    };
};

const useUpdateAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "PUT" },
        { manual: true, autoCancel: false }
    );

    const updatedAccommodation = data;
    const accommodationUpdateInProgress = loading;
    const accommodationUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {Promise<*|undefined>}
     */
    const updateAccommodation = ({ accommodation }) => {
        const url = getPath(Paths.ACCOMMODATION) + "/" + accommodation.id;
        const transformResponse = (data) => {
            return data && plainToClass(Accommodation, data);
        };
        const data = classToPlain(accommodation);
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetAccommodation] Error on updateAccommodation(): ",
                    error
                );
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        updatedAccommodation,
        accommodationUpdateInProgress,
        accommodationUpdateError,
        updateAccommodation,
    };
};

export { useGetAccommodation, useUpdateAccommodation };
