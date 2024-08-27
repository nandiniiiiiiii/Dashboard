import React, { useEffect, useMemo, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectData, allDataAsync } from '../data/data.slice'
import { useTable, usePagination, useFilters } from 'react-table';

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter }, }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    // Calculate the options for filtering
    const options = useMemo(() => {
        const optionsSet = new Set();
        preFilteredRows.forEach(row => {
            // Use an empty string as a fallback value for undefined or null
            optionsSet.add(row.values[id] ?? '');
        });
        return [...optionsSet.values()];
    }, [id, preFilteredRows]);

    return (
        <select
            value={filterValue ?? ''} // Use empty string as a fallback value
            onChange={e => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option === '' ? 'None' : option}
                </option>
            ))}
        </select>
    );
}

function Table() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allDataAsync())
        console.log("done")
    }, [dispatch])
    const data = useSelector(selectData)
    //end year, source, region, topic, sector

    const columns = useMemo(
        () => [
            {
                Header: 'Source',
                accessor: 'source',
                Filter: DefaultColumnFilter,
                filter: 'text',
            },
            {
                Header: 'Region',
                accessor: 'region',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'Topic',
                accessor: 'topic',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'Sector',
                accessor: 'sector',
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
            {
                Header: 'End-of-year',
                accessor: 'end_year',
                Filter: DefaultColumnFilter,
                filter: 'text',
            },
        ],
        []
    );

    const defaultColumn = useMemo(
        () => ({
            // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            initialState: { pageIndex: 0 }, // Pass our initial table state
        },
        useFilters, // Use the useFilters plugin hook
        usePagination // Use the usePagination plugin hook
    );

    return (
        <div className='container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',gap:'20px', transform:'translateY(-4%)' }}>
            <h1>Energy outlooks and trends</h1>
            <table {...getTableProps()} style={{border:'1px solid', padding:'10px', overflow:'hidden'}}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} key={column.id} style={{borderLeft:'1px solid',padding: '0 10px'}}>
                                    {column.render('Header')}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} key={cell.column.id} style={{borderLeft:'1px solid',padding: '0 10px'}}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'20px', marginTop:'10px'}}>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Table
