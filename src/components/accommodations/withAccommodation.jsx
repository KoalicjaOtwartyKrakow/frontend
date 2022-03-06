import React from "react";

import Accommodation from "models/Accommodation";
import { fetchAccommodationsDelayed } from "services/Api";
import { plainToClass } from "serializers/Serializer";

const withAccommodation = (WrappedComponent) => {
    return class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                accommodationsErrorMessage: "",
                accommodationsInProgress: false,
                accommodationsSuccess: undefined,
                accommodations: [],
            };
        }

        componentDidMount() {
            this.fetchAccommodations();
        }

        fetchAccommodationsBefore = () => {
            this.setState({ accommodationsInProgress: true });
        };

        fetchAccommodationsFailure = (error) => {
            console.log("[ACCOMMODATIONS] Fetch accommodations failure: ");

            if (error instanceof TypeError) {
                console.error(error);
            } else {
                console.log("[ACCOMMODATIONS] Error:", error);
            }

            const accommodationsSuccess = false;
            const accommodationsErrorMessage = error.message;

            this.setState({
                accommodationsErrorMessage,
                accommodationsSuccess,
            });
        };

        fetchAccommodationsSuccess = (response) => {
            const data = response.data;

            const accommodations = data.map((item) =>
                plainToClass(Accommodation, item)
            );
            const accommodationsSuccess = true;
            const accommodationsErrorMessage = "";

            this.setState({
                accommodations,
                accommodationsErrorMessage,
                accommodationsSuccess,
            });

            console.log("[ACCOMMODATIONS] Fetch success");
        };

        fetchAccommodationsFinally = () => {
            console.log("[ACCOMMODATIONS] Fetch finalized");
            const accommodationsInProgress = false;
            this.setState({ accommodationsInProgress });
        };

        fetchAccommodations = () =>
            fetchAccommodationsDelayed(
                this.fetchAccommodationsBefore,
                this.fetchAccommodationsSuccess,
                this.fetchAccommodationsFailure,
                this.fetchAccommodationsFinally
            );

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchAccommodations={this.fetchAccommodations}
                />
            );
        }
    };
};

export default withAccommodation;
