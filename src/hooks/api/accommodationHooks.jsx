import useAxios from "axios-hooks";
import { getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Accommodation from "models/Accommodation";

const useGetAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true }
    );

    const accommodation = data;
    const accommodationGetInProgress = loading;
    const accommodationGetError = error;

    const fetchAccommodation = ({ accommodationId }) => {
        const url = getPath(Paths.ACCOMMODATION) + "/" + accommodationId;
        const transformResponse = (data) => plainToClass(Accommodation, data);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                return error;
                // console.error(
                //     "[AccommodationEditPage] Error on fetchAccommodation(): ",
                //     error
                // );
                // const toast = new Toast()
                // toast.info(this.props.t("accommodation:form.message.updateFailure"));
                // toasts.addToast()
            }
        };

        return fetchData();

        // await fetch(config);
    };

    console.log("[useGetAccommodation] invoked: ", {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        fetchAccommodation,
    });

    return {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        fetchAccommodation,
    };
};

export { useGetAccommodation };
