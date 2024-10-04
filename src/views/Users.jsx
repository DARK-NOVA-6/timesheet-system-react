import { useUsers } from '../contexts/UsersContext';
import TableView from "../components/TableView"
const Users = () => {
  const {
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
  } = useUsers();

  const columns = [
    { header: 'First Name', field: "firstName" },
    { header: 'Last Name', field: "lastName" },
    { header: 'Maiden Name', field: "maidenName" },
    { header: 'Gender', field: "gender" },
    { header: 'Age', field: "age" },
    { header: 'Email', field: "email" },
    { header: 'Username', field: "username" },
    { header: 'Eye Color', field: "eyeColor" },
    { header: 'Blood Group', field: "bloodGroup" },
  ];

  return (
    TableView(loading, filters, handleFilterChange, handleSearch, pageSize, setPageSize, users, columns, pagination, setPagination, count, "Users")
  );
};

export default Users;