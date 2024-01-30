import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head } from "@inertiajs/react";
import { Alert, Table, Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";

export default function ProductIndex({ auth, flash, products, categories }) {
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchedProduct, setSearchedProduct] = useState("");
    const [filteredProducts, setFilteredProducts] = useState(products);

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
            <Head title="Reports" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}

                            <div className="flex gap-2 mb-2">
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

                            <div className="overflow-y-auto max-h-96">
                                <Table striped>
                                    <Table.Head className="sticky top-0">
                                        <Table.HeadCell>
                                            Product name
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Category
                                        </Table.HeadCell>
                                        <Table.HeadCell>Price</Table.HeadCell>
                                        <Table.HeadCell>
                                            Retail Price
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            WholeSale Price
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Remaining
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Last Delivery
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
                                                    {product.last_delivery_date}
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
