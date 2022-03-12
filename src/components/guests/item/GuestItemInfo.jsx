import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation(["guest"]);

    const {
        foodAllergies,
        glutenFreeDiet,
        lactoseFreeDiet,
        meatFreeDiet,
        specialNeeds,
    } = guest;

    return (
        <p className="h5">
            <span className="guest__col-needs">
                <span className="guest__col-needs__special">
                    {specialNeeds && specialNeeds.toString()}
                </span>
            </span>
            <span className="guest__col-diet">
                <span className="guest__col-diet__food-allergies">
                    {foodAllergies && foodAllergies.toString()}
                </span>
                <span className="guest__col-diet__food-gluten-free">
                    {glutenFreeDiet && glutenFreeDiet.toString()}
                </span>
                <span className="guest__col-diet__food-lactose-free">
                    {lactoseFreeDiet && lactoseFreeDiet.toString()}
                </span>
                <span className="guest__col-diet__food-lactose-free">
                    {meatFreeDiet && meatFreeDiet.toString()}
                </span>
                <span className="guest__col-diet__food-lactose-free">
                    {meatFreeDiet && meatFreeDiet.toString()}
                </span>
            </span>
        </p>
    );
};

export default GuestItemInfo;
