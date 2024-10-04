import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState({ page: 1, pageSize: 5 });
    const [filters, setFilters] = useState({
        name: { label: 'Name', value: '' },
        email: { label: 'Email', value: '' },
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(5);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/users?limit=${pagination.pageSize}&skip=${(pagination.page - 1) * pagination.pageSize}`);
            setUsers(response.data.users);
            setCount(response.data.total);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsersWithQuery = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://dummyjson.com/users/search?q=${query.value}`);
            setUsers(response.data.users);
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
        fetchUsers();
    }, [pagination]);

    useEffect(() => {
        const delayFetch = setTimeout(() => {
            const query = getNonEmptyFilters();
            if (query.query === undefined) {
                fetchUsers();
            } else if (query.query === "name") {
                fetchUsersWithQuery(query);
            } else if (query.query === "email") {
                fetchUsersWithQuery(query);
            }
        }, 700);

        return () => clearTimeout(delayFetch);
    }, [filters]);

    useEffect(() => {
        setPagination(prev => ({ ...prev, pageSize: pageSize }));
    }, [pageSize]);

    useEffect(() => {
        if (searchQuery === "") {
            fetchUsers();
        } else {
            const filteredUsers = users.filter(user =>
                Object.values(user).some(value =>
                    value.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setUsers(filteredUsers);
        }
    }, [searchQuery]);

    return (
        <UsersContext.Provider
            value={{
                users,
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
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    return useContext(UsersContext);
};
