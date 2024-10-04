import { useProducts } from '../contexts/ProductsContext';
import TableView from "../components/TableView"
const Products = () => {
    const {
        products,
        loading,
        count,
        pagination,
        setPagination,
        filters,
        pageSize,
        setPageSize,
        handleFilterChange,
        handleSearch,
    } = useProducts();

    const columns = [
        { header: 'Title', field: "title" },
        { header: 'Description', field: "description" },
        { header: 'Category', field: "category" },
        { header: 'Price', field: "price" },
        { header: 'Sku', field: "sku" },
        { header: 'Brand', field: "brand" },
        { header: 'Stock', field: "stock" },
        { header: 'Warranty Information', field: "warrantyInformation" },
        { header: 'Shipping Information', field: "shippingInformation" },
        { header: 'Availability Status', field: "availabilityStatus" },
        { header: 'Return Policy', field: "returnPolicy" },
    ];

    return (
        TableView(loading, filters, handleFilterChange, handleSearch, pageSize, setPageSize, products, columns, pagination, setPagination, count,"Products")
    );
};

export default Products;