// tslint:disable
import React, { useState } from "react";
import {
    useTable,
    useSortBy,
    usePagination,
    useFilters,
    useGlobalFilter,
    // useAsyncDebounce,
} from "react-table";

import { Table } from "reactstrap";
import { Label, Input, FormGroup, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { matchSorter } from "match-sorter";
import classNames from "classnames";
import "./Table.css";
import sortasc from "./assets/sort_asc.png";
import sortdesc from "./assets/sort_desc.png";
import sortboth from "./assets/sort_both.png";
import loaderimage from "./assets/loader-table.gif";
import Guest from "models/Guest";
import GuestListItem from "components/guests/GuestListItem";

// @ts-ignore
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    return (
        <Input
            type="text"
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
            placeholder="Search..."
            style={{
                fontSize: "10px",
            }}
        />
    );
}

// @ts-ignore
function fuzzyTextFilterFn(rows, id, filterValue) {
    // @ts-ignore
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// @ts-ignore
fuzzyTextFilterFn.autoRemove = (val) => !val;

// @ts-ignore
const XTable = ({ columns, data, loading = true }) => {
    const [switchSearch, setSwitchSearch] = useState(false);
    const toggleSwitchSearch = () => {
        setAllFilters([]);
        setSwitchSearch(!switchSearch);
    };
    // @ts-ignore
    const getText = (rows, id, filterValue) => {
        // @ts-ignore
        return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
                ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                : true;
        });
    };

    // @ts-ignore
    const filterTypes = React.useMemo(
        () => ({
            fuzzyText: fuzzyTextFilterFn,
            text: getText,
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
        }),
        []
    );

    // @ts-ignore
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setAllFilters,
        state: { pageIndex, pageSize },
    }: any = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
            defaultColumn,
            filterTypes,
        } as any,
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <>
            <div>
                <span className="float-right ">
                    <Input
                        checked={switchSearch}
                        className="table-search-switch"
                        type="switch"
                        name="customSwitch"
                        id="customSwitch"
                        onClick={toggleSwitchSearch}
                        label="Filter Data"
                    />
                </span>
            </div>
            <Table {...getTableProps()} hover bordered responsive>
                <thead>
                    {headerGroups.map((headerGroup: any) => (
                        <>
                            <tr className="theader" {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span className="float-right">
                                            {!column.notShowSortingDisplay ? (
                                                column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <img src={sortdesc} alt="descending" />
                                                    ) : (
                                                        <img src={sortasc} alt="ascending" />
                                                    )
                                                ) : (
                                                    <img src={sortboth} alt="sorting" />
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                            {switchSearch ? (
                                <tr style={{ backgroundColor: "aliceBlue" }}>
                                    {headerGroup.headers.map((column: any, index: any) => (
                                        <th className="tfilter">
                                            {column.canFilter ? (
                                                <FormGroup className="mb-1">
                                                    <Label className="divFilter mb-0">
                                                        Filter {column.render("Header")} :
                                                    </Label>
                                                    {column.render("Filter")}
                                                </FormGroup>
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            ) : (
                                ""
                            )}
                        </>
                    ))}
                </thead>
                {loading ? (
                    <tbody>
                        <tr>
                            <td colSpan={10000} className="text-center">
                                <img src={loaderimage} alt="Loading..." />
                            </td>
                        </tr>
                    </tbody>
                ) : (
                    <>
                        {page.length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={10000} className="text-left">
                                        * Tidak ada data
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody {...getTableBodyProps()}>
                                {page.map((row: any, i: any) => {
                                    prepareRow(row);
                                    const guest: Guest = row.original as Guest;
                                    return <GuestListItem guest={guest} onEdit={() => {}} onRemove={() => {}} />;

                                    // @ts-ignore
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        {...cell.getCellProps({
                                                            className: cell.column.className,
                                                        })}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </>
                )}
            </Table>

            {page.length > 0 && (
                <div className={classNames("div-pagination", { "d-none": loading })}>
                    <div className="div-pagination-2">
                        <div className="div-pagination-2-2">
                            Showing{" "}
                            <select
                                className="selectan"
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[10, 20, 30, 50, 100].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>{" "}
                            record per-page
                        </div>
                    </div>

                    <div className="div-pagination-1">
                        Page : {pageIndex + 1} from {pageOptions.length}{" "}
                        <Pagination className="pagina">
                            <PaginationItem disabled={!canPreviousPage}>
                                <PaginationLink onClick={() => gotoPage(0)}>{"<<"}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canPreviousPage}>
                                <PaginationLink onClick={() => previousPage()}>{"<"}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canNextPage}>
                                <PaginationLink onClick={() => nextPage()}>{">"}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={!canNextPage}>
                                <PaginationLink onClick={() => gotoPage(pageCount - 1)}>{">>"}</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                        <div className="div-pagination-2-1">
                            Next to Page {" : "}
                            <input
                                className="inputan"
                                type="number"
                                defaultValue={pageIndex + 1}
                                onChange={(e) => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                    gotoPage(page);
                                }}
                            />
                        </div>{" "}
                    </div>
                </div>
            )}
        </>
    );
};

export default XTable;
