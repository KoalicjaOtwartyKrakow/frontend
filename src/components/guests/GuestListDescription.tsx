import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/shared/Icons' or it... Remove this comment to see the full error message
import { IconFoodAllergy, IconFoodGlutenFree, IconFoodLactoseFree, IconFoodMeatFree } from "components/shared/Icons";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestPriority... Remove this comment to see the full error message
import GuestPriorityStatusBadge from "components/guest/GuestPriorityStatusBadge";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/shared/constants/Gu... Remove this comment to see the full error message
import { GuestPeopleCountBadgeColor } from "components/shared/constants/GuestColorScheme";
import { Col, Row } from "reactstrap";

const GuestListDescription = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <article>
            <Row>
                <Col xs={12} lg={6}>
                    <p>
                        {t("guest:peopleCount.label")}:{" "}
                        <GuestPriorityStatusBadge
                            color={GuestPeopleCountBadgeColor.TOTAL}
                            label={t("guest:peopleCount.total")}
                        />
                        <GuestPriorityStatusBadge
                            color={GuestPeopleCountBadgeColor.MALE}
                            label={t("guest:peopleCount.men")}
                        />
                        <GuestPriorityStatusBadge
                            color={GuestPeopleCountBadgeColor.FEMALE}
                            label={t("guest:peopleCount.women")}
                        />
                        <GuestPriorityStatusBadge
                            color={GuestPeopleCountBadgeColor.CHILDREN}
                            label={t("guest:peopleCount.children")}
                        />
                    </p>
                </Col>
                <Col xs={12} lg={6}>
                    <p className="text-lg-end">
                        <span>
                            <IconFoodMeatFree /> – {t("guest:traits.food.meatFree")};{" "}
                        </span>
                        <span>
                            <IconFoodAllergy /> – {t("guest:traits.food.allergy")};{" "}
                        </span>
                        <span>
                            <IconFoodGlutenFree /> – {t("guest:traits.food.glutenFree")};{" "}
                        </span>
                        <span>
                            <IconFoodLactoseFree /> – {t("guest:traits.food.lactoseFree")};{" "}
                        </span>
                    </p>
                </Col>
            </Row>
        </article>
    );
};

export default GuestListDescription;
