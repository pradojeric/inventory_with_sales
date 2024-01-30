import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import Payment from "@/Pages/Receivables/_Partials/Payment";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head, Link, router } from "@inertiajs/react";
import {
    Alert,
    Table,
    Button,
    Label,
    TextInput,
    Breadcrumb,
    Spinner,
} from "flowbite-react";
import { useState } from "react";
import { HiHome } from "react-icons/hi";

export default function Index({ auth, flash, sales, inputs }) {
    const [dates, setDates] = useState({
        from: inputs.from,
        to: inputs.to,
    });
    const [openPayment, setOpenPayment] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePaymentClick = () => {
        setOpenPayment((prev) => (prev = !prev));
    };

    const handlePaidClick = (sale) => {
        setSelectedSale(sale);
        handlePaymentClick();
    };

    const filter = () => {
        router.reload({
            data: {
                from: dates.from,
                to: dates.to,
            },
            only: ["sales"],
            onStart: () => {
                setLoading(true);
            },
            onProgress: (progress) => {
                console.log(progress);
            },
            onSuccess: () => {
                setLoading(false);
            },
        });
    };

    const totalSales = () => {
        return sales.reduce((acc, curr) => acc + curr.total_amount, 0);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Receivables
                </h2>
            }
        >
            <Head title="Sales" />

            <Payment
                sale={selectedSale}
                show={openPayment}
                onClose={handlePaymentClick}
            />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 md:w-auto w-screen">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("sales.index")}
                                    icon={HiHome}
                                >
                                    Receivables
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}

                            <div className="mb-2">
                                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:items-end">
                                    <div className="">
                                        <div className="block">
                                            <Label
                                                htmlFor="from"
                                                value="From"
                                            />
                                        </div>
                                        <TextInput
                                            id="from"
                                            value={dates.from}
                                            onChange={(e) => {
                                                setDates({
                                                    ...dates,
                                                    from: e.target.value,
                                                });
                                            }}
                                            type="date"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="block">
                                            <Label htmlFor="to" value="To" />
                                        </div>
                                        <TextInput
                                            id="to"
                                            value={dates.to}
                                            onChange={(e) => {
                                                setDates({
                                                    ...dates,
                                                    to: e.target.value,
                                                });
                                            }}
                                            type="date"
                                        />
                                    </div>
                                    <div>
                                        <Button type="button" onClick={filter}>
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {loading && <Spinner />}
                            {!loading && (
                                <div className="overflow-auto max-h-96">
                                    <Table striped>
                                        <Table.Head className="sticky top-0">
                                            <Table.HeadCell>
                                                Order #
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Customer Name
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Sale Date
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Total Amount
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Due Date
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Created At
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                <span className="sr-only">
                                                    View
                                                </span>
                                            </Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divide-y">
                                            {sales.map((sale) => {
                                                return (
                                                    <Table.Row key={sale.id}>
                                                        <Table.Cell>
                                                            {sale.order_no}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.customer_name}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.sale_date}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {formatNumber(
                                                                sale.total_amount
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.due_date}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.created_at}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {!sale.paid && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handlePaidClick(
                                                                            sale
                                                                        );
                                                                    }}
                                                                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                                >
                                                                    Paid
                                                                </button>
                                                            )}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                        <Table.Head className="sticky bottom-0">
                                            <Table.HeadCell></Table.HeadCell>
                                            <Table.HeadCell></Table.HeadCell>
                                            <Table.HeadCell>
                                                Total Amount:
                                            </Table.HeadCell>
                                            <Table.HeadCell className="text-base">
                                                {formatNumber(totalSales())}
                                            </Table.HeadCell>
                                            <Table.HeadCell></Table.HeadCell>
                                            <Table.HeadCell></Table.HeadCell>
                                            <Table.HeadCell>
                                                <span className="sr-only">
                                                    View
                                                </span>
                                            </Table.HeadCell>
                                        </Table.Head>
                                    </Table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
