import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { Head, Link } from "@inertiajs/react";
import {
    Alert,
    Table,
    Button,
    Select,
    TextInput,
    Breadcrumb,
} from "flowbite-react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";

export default function StockIndex({ auth, flash, stocks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Stock Up
                </h2>
            }
        >
            <Head title="Stocks" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[70vh] overflow-y-visible">
                        <div className="p-6 text-gray-900">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("stocks.index")}
                                    icon={HiHome}
                                >
                                    Stock Up
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}
                            <div className="flex justify-end mb-2">
                                <Button href={route("stocks.create")}>
                                    Add
                                </Button>
                            </div>
                            <div className="overflow-auto max-h-96 w-full">
                                <Table striped>
                                    <Table.Head className="sticky top-0">
                                        <Table.HeadCell>
                                            Control #
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Delivery Date
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Products
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">
                                                View
                                            </span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {stocks.map((stock) => {
                                            return (
                                                <Table.Row
                                                    key={stock.control_no}
                                                >
                                                    <Table.Cell>
                                                        {stock.control_no}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {stock.delivery_date}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {stock.stock_products.map(
                                                            (sp) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            `sp` +
                                                                            sp.id
                                                                        }
                                                                    >
                                                                        {sp
                                                                            .product
                                                                            .product_name +
                                                                            " - " +
                                                                            sp.quantity}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
