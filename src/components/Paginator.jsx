import React, { useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';

import 'react-responsive-pagination/themes/minimal.css';

function calculateTotalPages(totalCount, pageSize) {
    return Math.ceil(totalCount / pageSize);
}
export default function Paginator({pagination, setPagination,count}) {
    const totalPages = calculateTotalPages(count,pagination.pageSize);

    function handlePageChange(pageNumber) {
        setPagination(prev => ({ ...prev, page: pageNumber }));
    }

    return (
        <ResponsivePagination
            total={totalPages}
            current={pagination.page}
            onPageChange={page => handlePageChange(page)}
            maxWidth={600}
        />
    );
}