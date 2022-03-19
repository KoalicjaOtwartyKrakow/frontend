import React, { useContext } from "react";
import { GuestContext } from "components/guest/GuestContext";
import {
    IconFoodAllergy,
    IconFoodGlutenFree,
    IconFoodLactoseFree,
    IconFoodMeatFree,
    IconPetsPresent
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
        petsPresent,
    } = guest;

    return (
        <aside className="mb-0 guest__col-info__needs">
            <p className="mb-0">
                {petsPresent && (
                    <IconPetsPresent className="text-guest-trait" />
                )}
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
            <p className="guest__col-info__needs mb-0 mt-2">
                <span className="guest__col-info__needs-special">
                    {specialNeeds && specialNeeds.toString()}
                </span>
            </p>
        </aside>
    );
};

export default GuestItemInfo;
