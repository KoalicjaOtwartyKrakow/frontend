import React, { useContext } from 'react';

import { GlobalContext } from 'context/GlobalState';
import ApartmentList from 'components/apartments/ApartmentList';

const ApartmentsPage = () => {
    const { apartments } = useContext(GlobalContext);

    return (
        <React.Fragment>
            {apartments.length > 0 ? (
                <React.Fragment>
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <ApartmentList apartments={apartments} />
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <p className="text-center bg-gray-100 text-gray-500 py-5">Brak danych.</p>
            )}
        </React.Fragment>
    );
};

export default ApartmentsPage;