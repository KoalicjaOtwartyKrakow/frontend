import React from 'react';
import { generatePath, withRouter } from 'react-router-dom';

import Routes from 'constants/Routes';
import { Table } from 'reactstrap';
import ApartmentListItem from 'components/apartments/ApartmentListItem';

const ApartmentList = ({ apartments, history }) => {

    const getEditRoute = (apartmentId) => {
        return generatePath(Routes.APARTMENTS_EDIT, { apartmentId });
    };

    const onEdit = (apartmentId) => {
        const path = getEditRoute(apartmentId);
        history.push(path);
    };

    return (
        <Table hover striped responsive>
            <thead className="thead-dark">
            <tr>
                <th>Udostępniający</th>
                <th>Adres</th>
                <th>Dostępność</th>
                <th>Wolontariusz</th>
                <th>Akcje</th>
            </tr>
            </thead>
            <tbody>
            {
                apartments.map((apartment) => {
                    const { id } = apartment;
                    return (
                        <ApartmentListItem
                            key={id}
                            apartment={apartment}
                            onEdit={onEdit}
                        />
                    );
                })
            }
            </tbody>
        </Table>
    );


    // return (
    //     <table className="min-w-full divide-y divide-gray-200">
    //       <thead className="bg-gray-50">
    //       <tr>
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Udostępniający</th>
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adres</th>
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dostępność</th>
    //
    //         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wolontariusz</th>
    //         <th scope="col" className="relative px-6 py-3">
    //           <span className="sr-only">Edytuj</span>
    //         </th>
    //       </tr>
    //       </thead>
    //       <tbody className="bg-white divide-y divide-gray-200">
    //       {apartments.map((apartment) => (
    //           <tr key={apartment.apartmentId}>
    //             <td className="px-6 py-4 whitespace-nowrap">
    //               <div className="flex items-center">
    //                 <div className="ml-4">
    //                   <div className="text-sm font-medium text-gray-900">{apartment.LANDLORD_NAME}</div>
    //                   <div className="text-sm text-gray-500">{apartment.LANDLORD_EMAIL}</div>
    //                   <div className="text-sm text-gray-500">{apartment.LANDLORD_PHONE}</div>
    //                 </div>
    //               </div>
    //             </td>
    //             <td className="px-6 py-4 whitespace-nowrap">
    //               <div className="text-sm text-gray-900">{apartment.ST_NAME} {apartment.ST_NUM}</div>
    //               <div className="text-sm text-gray-500">{apartment.ZIP} {apartment.CITY}, {apartment.CNT_NAME}</div>
    //             </td>
    //             <td className="px-6 py-4 whitespace-nowrap center">
    //               <span className="text-sm font-medium text-gray-900">3/5</span>
    //               <span className="px-2 mx-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Wolny </span>
    //             </td>
    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{apartment.VOLUNTEER_NAME}</td>
    //             <td className="flex-auto text-right px-4 py-2 m-2">
    //               <Link
    //                   to={getEditRoute(apartment.apartmentId)}
    //                   title="Edit Apartment"
    //               >
    //                 <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-3 py-2 px-4 rounded-full inline-flex items-center">
    //                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    //                 </div>
    //               </Link>
    //             </td>
    //           </tr>
    //       ))}
    //       </tbody>
    //     </table>
    // )
};

export default withRouter(ApartmentList);