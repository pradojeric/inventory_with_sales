import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head } from "@inertiajs/react";
import { Alert, Table, Button, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

export default function ProductIndex({ auth, flash, products, categories }) {
    const [addProduct, setAddProduct] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    // const [editProduct, setEditProduct] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchedProduct, setSearchedProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddProductClick = () => {
        setAddProduct((prev) => (prev = !prev));
    };

    const handleEditProductClick = () => {
        setEditProduct((prev) => (prev = !prev));
    };

    const editModal = (product) => () => {
        setSelectedProduct(product);
        handleEditProductClick();
        // return (
        //     <EditProduct
        //         product={product}
        //         show={editProduct == product.id}
        //         categories={categories}
        //         onClose={handleEditProductClick}
        //     ></EditProduct>
        // );
    };

    useEffect(() => {
        search();
    }, [products]);

    const search = () => {
        const filteredProducts = products.filter(
            (prod) =>
                prod.name.toLowerCase().indexOf(searchedProduct.toLowerCase()) >
                    -1 &&
                (prod.category_id == selectedCategory || !selectedCategory)
        );

        setFilteredProducts(filteredProducts);
    };

    const clear = () => {
        setFilteredProducts(products);
        setSelectedCategory("");
        setSearchedProduct("");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products List
                </h2>
            }
        >
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hiden shadow-sm sm:rounded-lg max-h-[70vh] overflow-y-auto">
                        <div className="p-2 text-gray-900 md:w-auto w-screen">
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}
                            <AddProduct
                                show={addProduct}
                                categories={categories}
                                onClose={handleAddProductClick}
                            ></AddProduct>

                            {selectedProduct && (
                                <EditProduct
                                    product={selectedProduct}
                                    show={editProduct}
                                    categories={categories}
                                    onClose={handleEditProductClick}
                                ></EditProduct>
                            )}

                            <div className="flex justify-end mb-2">
                                <Button
                                    type="button"
                                    onClick={handleAddProductClick}
                                >
                                    Add Product
                                </Button>
                            </div>

                            <div className="flex flex-col md:flex-row gap-2 mb-2">
                                <Select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="flex-shrink-0"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => {
                                        return (
                                            <option
                                                value={category.id}
                                                key={category.id + `cat`}
                                            >
                                                {category.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <TextInput
                                    type="text"
                                    placeholder="Search Product"
                                    className="w-full"
                                    value={searchedProduct}
                                    onChange={(e) =>
                                        setSearchedProduct(e.target.value)
                                    }
                                ></TextInput>
                                <Button type="button" onClick={search}>
                                    Search
                                </Button>
                                <Button
                                    type="button"
                                    color="light"
                                    onClick={clear}
                                >
                                    Clear
                                </Button>
                            </div>
                            <div className="overflow-x-auto max-h-full">
                                <Table striped>
                                    <Table.Head className="top-0 sticky">
                                        <Table.HeadCell>
                                            Product name
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Category
                                        </Table.HeadCell>
                                        <Table.HeadCell>SRP</Table.HeadCell>
                                        <Table.HeadCell>
                                            Retail Price
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            WholeSale Price
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Quantity
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {filteredProducts.map((product) => (
                                            <Table.Row key={"pro" + product.id}>
                                                <Table.Cell>
                                                    <div className="font-semibold">
                                                        {product.product_name}
                                                    </div>
                                                    <div className="text-xs italic">
                                                        {product.description}
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {product.category.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {formatNumber(
                                                        product.price
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {formatNumber(
                                                        product.retail_price
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {formatNumber(
                                                        product.wholesale_price
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {product.quantity}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {/* <EditProduct
                                                    key={product.id}
                                                    product={product}
                                                    show={
                                                        editProduct ==
                                                        product.id
                                                    }
                                                    categories={categories}
                                                    onClose={
                                                        handleEditProductClick
                                                    }
                                                ></EditProduct> */}
                                                    {/* {editProduct == product.id &&
                                                    editModal({ product })} */}
                                                    <a
                                                        href="#"
                                                        onClick={editModal(
                                                            product
                                                        )}
                                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                    >
                                                        Edit
                                                    </a>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                    <Table.Head className="sticky bottom-0">
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell>
                                            Total Stocks
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            {filteredProducts.reduce(
                                                (acc, curr) =>
                                                    acc + curr.quantity,
                                                0
                                            )}
                                        </Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                    </Table.Head>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
