import React from 'react';
import axios from 'axios';
import Api from 'constants/Api';
import { APARTMENTS_FETCH_DELAY, delay } from 'shared/Debug';
import { plainToClass } from 'serializers/Serializer';
import Apartment from 'models/Apartment';

const withApartments = (WrappedComponent) => {
    return class extends React.PureComponent {

        constructor(props) {
            super(props);
            this.state = {
                apartmentsErrorMessage: '',
                apartmentsInProgress: false,
                apartmentsSuccess: undefined,
                apartments: [],
            };
        }

        componentDidMount() {
            this.fetchApartmentsDelayed();
        }

        /**
         *
         * @param {function} resolve
         * @param {function} reject
         * @returns {Promise}
         */
        fetchApartments = (resolve, reject) => {
            return axios.get(Api.APARTMENTS)
                .then((response) => this.fetchApartmentsSuccess(response, resolve))
                .catch((error) => this.fetchApartmentsFailure(error, reject));
        };

        /**
         * Fetch Apartments with some predefined delay.
         */
        fetchApartmentsDelayed = () => {
            console.log('Method Apartments.fetchApartmentsDelayed() fired');

            const apartmentsInProgress = true;
            this.setState({ apartmentsInProgress });

            return delay(APARTMENTS_FETCH_DELAY, this.fetchApartments)
                .finally(this.fetchApartmentsFinally);
        };

        fetchApartmentsFailure = (error, reject) => {
            const apartmentsSuccess = false;
            const apartmentsErrorMessage = error.message;

            this.setState({
                apartmentsErrorMessage,
                apartmentsSuccess,
            });

            reject();
        };

        fetchApartmentsFinally = () => {
            console.log('Apartments finally');
            const apartmentsInProgress = false;
            this.setState({ apartmentsInProgress });
        };

        fetchApartmentsSuccess = (response, resolve) => {
            const data = response.data;

            const apartments = data.map(item => plainToClass(Apartment, item));
            const apartmentsSuccess = true;
            const apartmentsErrorMessage = '';

            this.setState({
                apartments,
                apartmentsErrorMessage,
                apartmentsSuccess,
            });

            console.log('Fetched apartments');

            resolve();
        };

        render() {
            return (
                <WrappedComponent
                    { ...this.state }
                    { ...this.props }
                    fetchApartments={ this.fetchApartmentsDelayed }
                />
            );
        }
    };
};

export default withApartments;