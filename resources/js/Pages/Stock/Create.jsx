import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { Head, Link } from "@inertiajs/react";
import {
    Label,
    Table,
    Button,
    Select,
    TextInput,
    Breadcrumb,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { HiHome, HiTrash } from "react-icons/hi";

export default function StockCreate({
    auth,
    flash,
    products,
    categories,
    control_no,
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            control_no: control_no,
            delivery_date: "",
            items: [],
        });

    const [product, setProduct] = useState({
        product_id: "",
        category_id: "",
        quantity: 1,
    });
    const [selectedProducts, setSelectedProducts] = useState([]);

    const allProducts = (id) => {
        if (!id) return;

        const filtered = products.filter(
            (pro) =>
                pro.category_id == id &&
                !selectedProducts.some((sp) => sp.productItem.id == pro.id)
        );

        if (filtered.length > 0) {
            return filtered.map((p) => {
                return (
                    <option value={p.id} key={p.id}>
                        {p.product_name}
                    </option>
                );
            });
        } else {
            return <option disabled>No product</option>;
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("stocks.store"));
    };

    useEffect(() => {
        return () => {};
    }, [setSelectedProducts]);

    const add = (e) => {
        e.preventDefault();

        const prod = products.filter((p) => p.id == product.product_id)[0];

        if (!prod) return;

        const newSelectedProducts = [...selectedProducts];
        newSelectedProducts.push({
            productItem: prod,
            quantity: product.quantity,
        });

        setSelectedProducts(newSelectedProducts);

        setData("items", newSelectedProducts);

        setProduct({
            product_id: "",
            category_id: "",
            quantity: 1,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Stocks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("sales.index")}
                                    icon={HiHome}
                                >
                                    Stock Up
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Create</Breadcrumb.Item>
                            </Breadcrumb>

                            <div className="flex justify-end space-x-2">
                                <Button
                                    type="button"
                                    disabled={processing}
                                    onClick={submit}
                                >
                                    Save
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="control_no"
                                                value="Control No"
                                            />
                                        </div>
                                        <TextInput
                                            id="control_no"
                                            value={control_no}
                                            required
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="deliver_date"
                                                value="Delivery Date"
                                            />
                                        </div>
                                        <TextInput
                                            id="deliver_date"
                                            type="datetime-local"
                                            value={data.delivery_date}
                                            onChange={(e) => {
                                                setData(
                                                    "delivery_date",
                                                    e.target.value
                                                );
                                            }}
                                            color={
                                                errors.delivery_date &&
                                                "failure"
                                            }
                                            helperText={errors.delivery_date}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="mb-2 block">
                                        <Label value="Product/s" />
                                    </div>

                                    {errors.items && (
                                        <p className="mt-2 text-sm text-red-700">
                                            {errors.items}
                                        </p>
                                    )}

                                    <div className="flex space-x-2 mb-2">
                                        <Select
                                            className="w-full"
                                            value={product.category_id}
                                            onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    category_id: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value="">Select One</option>
                                            {categories.map((cat) => {
                                                return (
                                                    <option
                                                        value={cat.id}
                                                        key={`fuck` + cat.id}
                                                    >
                                                        {cat.name}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                        <Select
                                            className="w-full"
                                            value={product.product_id}
                                            onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    product_id: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {allProducts(product.category_id)}
                                        </Select>
                                        <TextInput
                                            type="number"
                                            value={product.quantity}
                                            min="1"
                                            onChange={(e) => {
                                                setProduct({
                                                    ...product,
                                                    quantity: e.target.value,
                                                });
                                            }}
                                        ></TextInput>
                                        <Button type="button" onClick={add}>
                                            Add
                                        </Button>
                                    </div>

                                    <div className="max-h-40 overflow-y-auto">
                                        <Table striped>
                                            <Table.Head className="sticky top-0">
                                                <Table.HeadCell>
                                                    Product name
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Category
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
                                                {selectedProducts.map(
                                                    (p, index) => {
                                                        return (
                                                            <Table.Row
                                                                key={
                                                                    `sp` + index
                                                                }
                                                            >
                                                                <Table.Cell>
                                                                    {
                                                                        p
                                                                            .productItem
                                                                            .name
                                                                    }{" "}
                                                                    (
                                                                    {
                                                                        p
                                                                            .productItem
                                                                            .variant
                                                                            ?.name
                                                                    }
                                                                    )
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {
                                                                        p
                                                                            .productItem
                                                                            .category
                                                                            .name
                                                                    }
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    {p.quantity}
                                                                </Table.Cell>
                                                                <Table.Cell>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedProducts(
                                                                                selectedProducts.filter(
                                                                                    (
                                                                                        p,
                                                                                        i
                                                                                    ) =>
                                                                                        i !=
                                                                                        index
                                                                                )
                                                                            );
                                                                        }}
                                                                    >
                                                                        <HiTrash className="text-red-500"></HiTrash>
                                                                    </button>
                                                                </Table.Cell>
                                                            </Table.Row>
                                                        );
                                                    }
                                                )}
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
