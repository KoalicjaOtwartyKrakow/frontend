import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';

export const ApartmentEdit = (route) => {
  let history = useNavigate();

  const { appartments, editAppartment } = useContext(GlobalContext);

  const [selectedAppartment, setSelectedAppartment] = useState({
    id: null,
    name: "",
    designation: "",
    location: "",
  });

  const currentApartmentId = route.match.params.id;

  useEffect(() => {
    const apartmentId = currentApartmentId;
    const selectedAppartment = appartments.find(
      (currentAppartmentTraversal) => currentAppartmentTraversal.apartmentId === parseInt(apartmentId)
    );
    setSelectedAppartment(selectedAppartment);
  }, [currentApartmentId, appartments]);

  const onSubmit = (e) => {
    e.preventDefault();
    editAppartment(selectedAppartment);
    history.push("/");
  };

  const handleOnChange = (userKey, newValue) =>
  setSelectedAppartment({ ...selectedAppartment, [userKey]: newValue });

  if (!selectedAppartment || !selectedAppartment.apartmentId) {
    return <div>Invalid Appartment ID.</div>;
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <form onSubmit={onSubmit}>
            chuj
          <div className="text-center mt-4 text-gray-500">
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};