import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import {
    IconFoodAllergy,
    IconFoodGlutenFree,
    IconFoodLactoseFree,
    IconFoodMeatFree,
} from "components/shared/Icons";

/**
 *
 * @returns {JSX.Element}
 */
const GuestItemInfo = () => {
    /**
     *
     * @type {Guest}
     */
    const guest = useContext(GuestContext);

    const {
        foodAllergies,
        glutenFreeDiet,
        lactoseFreeDiet,
        meatFreeDiet,
        specialNeeds,
    } = guest;

    return (
        <p className="mb-0 guest__col-info__needs">
            <span className="guest__col-info__needs">
                <span className="guest__col-info__needs-special">
                    {specialNeeds && specialNeeds.toString()}
                </span>
            </span>
            <span className="h5 guest__col-info__diet">
                <span className="guest__col-info__diet__food-meat-free">
                    {meatFreeDiet && <IconFoodMeatFree />}
                </span>
                <span className="guest__col-info__diet__food-allergies">
                    {foodAllergies && <IconFoodAllergy />}
                </span>
                <span className="guest__col-info__diet__food-gluten-free">
                    {glutenFreeDiet && <IconFoodGlutenFree />}
                </span>
                <span className="guest__col-info__diet__food-lactose-free">
                    {lactoseFreeDiet && <IconFoodLactoseFree />}
                </span>
            </span>
        </p>
    );
};

export default GuestItemInfo;
