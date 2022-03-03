import React from "react";

import Apartment from "models/Apartment";
import { fetchApartmentsDelayed } from "services/Api";
import { plainToClass } from "serializers/Serializer";

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
            this.fetchApartments();
        }

        fetchApartmentsBefore = () => {
            this.setState({ apartmentsInProgress: true });
        };

        fetchApartmentsFailure = (error) => {
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
        };

        fetchApartmentsSuccess = (response) => {
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
        };

        fetchApartmentsFinally = () => {
            console.log("[APARTMENTS] Fetch finalized");
            const apartmentsInProgress = false;
            this.setState({ apartmentsInProgress });
        };

        fetchApartments = () =>
            fetchApartmentsDelayed(
                this.fetchApartmentsBefore,
                this.fetchApartmentsSuccess,
                this.fetchApartmentsFailure,
                this.fetchApartmentsFinally
            );

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchApartments={this.fetchApartments}
                />
            );
        }
    };
};

export default withApartments;
