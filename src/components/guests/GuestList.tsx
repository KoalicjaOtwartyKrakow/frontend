import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Table as ReactstrapTable } from "reactstrap";
import { AppRoutes } from "constants/AppRoutes";
import GuestListItem from "components/guests/GuestListItem";
import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";
import Guest from "models/Guest";
import XTable from "components/shared/xtable/XTable";

// @ts-ignore
function GuestListRows({ columns, data, onEdit, onRemove }) {
    const scrollbarWidth = () => 30;
    // Use the state and functions returned from useTable to build your UI

    const defaultColumn = React.useMemo(
        () => ({
            width: 200,
        }),
        []
    );

    const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useBlockLayout
    );

    const RenderRow = React.useCallback(
        ({ index, style }) => {
            const row = rows[index];
            prepareRow(row);
            console.log(row);
            const guest: Guest = row.original as Guest;
            return <GuestListItem guest={guest} onEdit={onEdit} onRemove={onRemove} />;
            // return (
            //     <div
            //         {...row.getRowProps({
            //             style,
            //         })}
            //         className="tr"
            //     >
            //         {row.cells.map((cell) => {
            //             return (
            //                 <div {...cell.getCellProps()} className="td">
            //                     {cell.render("Cell")}
            //                 </div>
            //             );
            //         })}
            //     </div>
            // );
        },
        [prepareRow, rows]
    );

    // Render the UI for your table
    return (
        <FixedSizeList height={400} itemCount={rows.length} itemSize={10} width={totalColumnsWidth + scrollBarSize}>
            {RenderRow}
        </FixedSizeList>
    );
}
const GuestList = ({ guests }: any) => {
    const { t } = useTranslation(["guests"]);
    const navigate = useNavigate();

    const getEditRoute = (guestId: any) => {
        return generatePath(AppRoutes.GUEST_EDIT, { guestId });
    };

    const onRemove = () => {};

    const onEdit = (guestId: any) => {
        const path = getEditRoute(guestId);
        navigate(path);
    };

    const columnNames = [
        "fullName",
        "phoneNumber",
        "priorityStatus",
        "priorityDate",
        "totalPeople",
        "durationOfStay",
        "information",
    ];
    // {guests.map((guest: any) => {
    //     const { uuid } = guest;
    //     return <GuestListItem key={uuid} guest={guest} onEdit={onEdit} onRemove={onRemove} />;
    // })}

    const data = React.useMemo(() => guests, [guests]);

    const columns = React.useMemo(
        () => [
            {
                Header: "fullName",
                accessor: "fullName",
            },
            {
                Header: "phoneNumber",
                accessor: "phoneNumber",
            },
            {
                Header: "priorityStatus",
                accessor: "priorityStatus",
            },
            {
                Header: "priorityDate",
                accessor: "priorityDate",
            },
            {
                Header: "totalPeople",
                accessor: "totalPeople",
            },
            {
                Header: "durationOfStay",
                accessor: "durationOfStay",
            },
            {
                Header: "information",
                accessor: "information",
            },
        ],
        []
    );

    return (
        <XTable columns={columns} loading={false} data={guests} />
        // <GuestListRows columns={columns} data={data} onEdit={onEdit} onRemove={onRemove} />
        // <ReactstrapTable hover striped responsive>
        //     <colgroup>
        //         {columnNames.map((columnName) => (
        //             <col className={`accommodation__col-${columnName}`} key={columnName} />
        //         ))}
        //     </colgroup>
        //     <thead className="thead-dark">
        //         <tr>
        //             {columnNames.map((columnName) => (
        //                 <th key={columnName}>{t(`guests:list.columnHeader:${columnName}`)}</th>
        //             ))}
        //         </tr>
        //     </thead>
        //     <tbody>
        //         <GuestListRows columns={columns} data={data} onEdit={onEdit} onRemove={onRemove} />
        //     </tbody>
        // </ReactstrapTable>
    );
};

export default GuestList;
