import React, { createContext,useContext, useState, useEffect } from 'react';
import axios from 'axios';


const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
    const [filters, setFilters] = useState({
        title: { label: 'Title', value: '' },
        category: { label: 'Category', value: '' },
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(5);


    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products?limit=${pagination.pageSize}&skip=${(pagination.page - 1) * pagination.pageSize}`);
            setProducts(response.data.products);
            setCount(response.data.total);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };


    const fetchProductsWithQuery = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products/search?q=${query.value}`);
            setProducts(response.data.products);
            setCount(response.data.total);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };


    const fetchProductsByCategory = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/products/category/${query.value}`);
            setProducts(response.data.products);
            setCount(response.data.total);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const getNonEmptyFilters = () => {
        return Object.entries(filters)
            .filter(([_, filter]) => filter.value !== '')
            .reduce((acc, [key, filter]) => ({ query: key, value: filter.value }), {});
    };

    const handleFilterChange = (filterKey, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterKey]: { ...prevFilters[filterKey], value },
        }));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        fetchProducts();
    }, [pagination]);

    useEffect(() => {
        const delayFetch = setTimeout(() => {
            const query = getNonEmptyFilters();
            if (query.query === undefined) {
                fetchProducts();
            } else if (query.query === "title") {
                fetchProductsWithQuery(query);
            } else if (query.query === "category") {
                fetchProductsByCategory(query);
            }
        }, 700);

        return () => clearTimeout(delayFetch);
    }, [filters]);

    useEffect(() => {
        setPagination(prev => ({ ...prev, pageSize: pageSize }));
    }, [pageSize]);

    useEffect(() => {
        if (searchQuery === "") {
            fetchProducts();
        } else {
            const filteredProducts = products.filter(product =>
                Object.values(product).some(value =>
                    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setProducts(filteredProducts);
        }
    }, [searchQuery]);

    return (
        <ProductsContext.Provider
            value={{
                products,
                loading,
                count,
                pagination,
                filters,
                pageSize,
                setPageSize,
                setPagination,
                handleFilterChange,
                handleSearch,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductsContext);
};
