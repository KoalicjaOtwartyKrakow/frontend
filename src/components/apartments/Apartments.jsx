import React from "react";
import axios from "axios";
import { Api } from "services/Api";
import { APARTMENTS_FETCH_DELAY, delay, emptyFn } from "shared/Debug";
import { plainToClass } from "serializers/Serializer";
import Apartment from "models/Apartment";
import apartments from "models/mocks/apartments";

const withApartments = (WrappedComponent) => {
    return class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                apartmentsErrorMessage: "",
                apartmentsInProgress: false,
                apartmentsSuccess: undefined,
                apartments: [],
            };
        }

        componentDidMount() {
            this.fetchApartmentsDelayed().finally(this.fetchApartmentsFinally);
        }

        /**
         *
         * @param {function} resolve
         * @param {function} reject
         * @returns {Promise}
         */
        fetchApartments = (resolve = emptyFn, reject = emptyFn) => {
            console.log("[APARTMENTS] Fetch in progress");

            const api = new Api();
            const url = api.getPath(Api.APARTMENTS);

            const promise = Api.useMocks
                ? Promise.resolve({ data: apartments })
                : axios.get(url);
            return promise
                .then((response) =>
                    this.fetchApartmentsSuccess(response, resolve)
                )
                .catch((error) => this.fetchApartmentsFailure(error, reject));
        };

        /**
         * Fetch Apartments with some predefined delay.
         */
        fetchApartmentsDelayed = () => {
            console.log("[APARTMENTS] Fetch (delayed) fired");

            const apartmentsInProgress = true;
            this.setState({ apartmentsInProgress });

            return delay(APARTMENTS_FETCH_DELAY, this.fetchApartments);
        };

        fetchApartmentsFailure = (error, reject) => {
            console.log("[APARTMENTS] Fetch apartments failure: ");

            if (error instanceof TypeError) {
                console.error(error);
            } else {
                console.log("[APARTMENTS] Error:", error);
            }

            const apartmentsSuccess = false;
            const apartmentsErrorMessage = error.message;

            this.setState({
                apartmentsErrorMessage,
                apartmentsSuccess,
            });

            reject();
        };

        fetchApartmentsFinally = () => {
            console.log("[APARTMENTS] Fetch finalized");
            const apartmentsInProgress = false;
            this.setState({ apartmentsInProgress });
        };

        fetchApartmentsSuccess = (response, resolve) => {
            try {
                const data = response.data;

                const apartments = data.map((item) =>
                    plainToClass(Apartment, item)
                );
                const apartmentsSuccess = true;
                const apartmentsErrorMessage = "";

                this.setState({
                    apartments,
                    apartmentsErrorMessage,
                    apartmentsSuccess,
                });

                console.log("[APARTMENTS] Fetch success");
            } catch (error) {
                throw error;
            } finally {
                resolve();
            }
        };

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchApartments={this.fetchApartmentsDelayed}
                />
            );
        }
    };
};

export default withApartments;
