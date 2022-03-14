import React from "react";

import Guest from "models/Guest";
import { plainToClass } from "serializers/Serializer";
import { fetchGuests } from "services/Api";

const withGuests = (WrappedComponent) => {
    return class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                guestsErrorMessage: "",
                guestsInProgress: false,
                guestsSuccess: undefined,
                guests: [],
            };
        }

        componentDidMount() {
            this.fetchGuests();
        }

        fetchGuestsBefore = () => {
            this.setState({ guestsInProgress: true });
        };

        fetchGuestsFailure = (error) => {
            console.log("[GUEST] Fetch guests failure: ");

            if (error instanceof TypeError) {
                console.error(error);
            } else {
                console.log("[GUEST] Error:", error);
            }

            const guestsSuccess = false;
            const guestsErrorMessage = error.message;

            this.setState({
                guestsErrorMessage,
                guestsSuccess,
            });
        };

        fetchGuestsSuccess = (response) => {
            const data = response.data;

            const guests = data.map((item) => plainToClass(Guest, item));
            const guestsSuccess = true;
            const guestsErrorMessage = "";

            this.setState({
                guests,
                guestsErrorMessage,
                guestsSuccess,
            });

            console.log("[GUEST] Fetch success");
        };

        fetchGuestsFinally = () => {
            console.log("[GUEST] Fetch finalized");
            const guestsInProgress = false;
            this.setState({ guestsInProgress });
        };

        fetchGuests = async () =>
            await fetchGuests(
                this.fetchGuestsBefore,
                this.fetchGuestsSuccess,
                this.fetchGuestsFailure,
                this.fetchGuestsFinally
            );

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchGuests={fetchGuests}
                />
            );
        }
    };
};

export default withGuests;
