import React from "react";

import Host from "models/Host";
import { plainToClass } from "serializers/Serializer";
import { fetchHosts } from "services/Api";

const withHosts = (WrappedComponent) => {
    return class extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                hostsErrorMessage: "",
                hostsInProgress: false,
                hostsSuccess: undefined,
                hosts: [],
            };
        }

        componentDidMount() {
            this.fetchHosts();
        }

        fetchHostsBefore = () => {
            this.setState({ hostsInProgress: true });
        };

        fetchHostsFailure = (error) => {
            console.log("[HOSTS] Fetch hosts failure: ");

            if (error instanceof TypeError) {
                console.error(error);
            } else {
                console.log("[HOSTS] Error:", error);
            }

            const hostsSuccess = false;
            const hostsErrorMessage = error.message;

            this.setState({
                hostsErrorMessage,
                hostsSuccess,
            });
        };

        fetchHostsSuccess = (response) => {
            const data = response.data;

            const hosts = data.map((item) => plainToClass(Host, item));
            const hostsSuccess = true;
            const hostsErrorMessage = "";

            this.setState({
                hosts,
                hostsErrorMessage,
                hostsSuccess,
            });

            console.log("[HOSTS] Fetch success");
        };

        fetchHostsFinally = () => {
            console.log("[HOSTS] Fetch finalized");
            const hostsInProgress = false;
            this.setState({ hostsInProgress });
        };

        fetchHosts = async () =>
            await fetchHosts(
                this.fetchHostsBefore,
                this.fetchHostsSuccess,
                this.fetchHostsFailure,
                this.fetchHostsFinally
            );

        render() {
            return (
                <WrappedComponent
                    {...this.state}
                    {...this.props}
                    fetchHosts={this.fetchHosts}
                />
            );
        }
    };
};

export default withHosts;
