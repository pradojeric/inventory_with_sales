import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { formatNumber, removeUnderScore } from "@/Pages/Utilities/Util";
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

function SaleView({ auth, flash, sale }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sales
                </h2>
            }
        >
            <Head title="Sales" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("sales.index")}
                                    icon={HiHome}
                                >
                                    Orders
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    Order # {sale.order_no}
                                </Breadcrumb.Item>
                            </Breadcrumb>

                            <div className="">
                                Customer: {sale.customer_name}
                            </div>
                            <div className="">
                                Address: {sale.customer_address}
                            </div>
                            <div>
                                Total Amount: {formatNumber(sale.total_amount)}
                            </div>
                            <div className="capitalize">
                                {`Status: ` + removeUnderScore(sale.status)}
                            </div>
                            {sale.paid ? (
                                <div>Paid on: {sale.paid_on}</div>
                            ) : (
                                <div>Not yet Paid</div>
                            )}
                            <div>Sale Date: {sale.sale_date}</div>
                            <div className="mt-5">
                                <Table striped>
                                    <Table.Head>
                                        <Table.HeadCell>Product</Table.HeadCell>
                                        <Table.HeadCell>
                                            Quantity
                                        </Table.HeadCell>
                                        <Table.HeadCell>Price</Table.HeadCell>
                                        <Table.HeadCell>Total</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {sale.sale_items
                                            .sort((a, b) => {
                                                if (
                                                    a.product.name <
                                                    b.product.name
                                                ) {
                                                    return -1;
                                                }
                                                if (
                                                    a.product.name >
                                                    b.product.name
                                                ) {
                                                    return 1;
                                                }
                                                return 0;
                                            })
                                            .map((si) => {
                                                return (
                                                    <Table.Row key={si.id}>
                                                        <Table.Cell>
                                                            <div>
                                                                {
                                                                    si.product
                                                                        .product_name
                                                                }
                                                            </div>
                                                            <div className="text-xs italic">
                                                                {
                                                                    si.product
                                                                        .category
                                                                        .name
                                                                }
                                                            </div>
                                                        </Table.Cell>

                                                        <Table.Cell>
                                                            {si.quantity}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {formatNumber(
                                                                si.unit_price
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {formatNumber(
                                                                si.total_price
                                                            )}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                    </Table.Body>
                                    <Table.Head>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell>
                                            {sale.sale_items.reduce(
                                                (prev, curr) =>
                                                    prev + curr.quantity,
                                                0
                                            )}
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            {formatNumber(sale.total_amount)}
                                        </Table.HeadCell>
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

export default SaleView;
