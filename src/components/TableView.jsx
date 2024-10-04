import React from 'react';
import Filters from './Filters';
import DataTable from './Datatable';
import Pagination from './Paginator';
import NoDateFound from './NoDateFound';
import Loading from './Loading';
export default function TableView(loading,
    filters,
    handleFilterChange,
    handleSearch,
    pageSize,
    setPageSize,
    data,
    columns,
    pagination,
    setPagination,
    count, 
    title) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>{title}</h1>
        {loading ? (
            <Loading />
        ) : (
            <>
                <Filters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onSearch={handleSearch}
                    pageSize={pageSize}
                    setPageSize={setPageSize} />
                <div style={{ marginBottom: "10px", height: "10px" }}></div>
                {data.length === 0 ? <NoDateFound /> : <DataTable data={data} columns={columns} />}
                <Pagination pagination={pagination} setPagination={setPagination} count={count} />
            </>
        )}
    </div>;
}
