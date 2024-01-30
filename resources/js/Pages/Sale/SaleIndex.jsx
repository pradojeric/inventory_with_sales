import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import ViewStatus from "@/Pages/Sale/_Partials/ViewStatus";
import { formatNumber, removeUnderScore } from "@/Pages/Utilities/Util";
import { Head, Link, router } from "@inertiajs/react";
import {
    Alert,
    Table,
    Button,
    Label,
    TextInput,
    Breadcrumb,
    Badge,
    Select,
    Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiEye, HiHome } from "react-icons/hi";
import { MdCancel } from "react-icons/md";

export default function SaleIndex({ auth, flash, sales, inputs }) {
    const [dates, setDates] = useState({
        from: inputs.from,
        to: inputs.to,
    });
    const [status, setStatus] = useState(inputs.status);
    const [openStatus, setOpenStatus] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleStatusClick = () => {
        setOpenStatus((prev) => (prev = !prev));
    };

    const handleUpdateStatus = (sale) => {
        if (sale.deleted_at) return;

        setSelectedSale(sale);
        handleStatusClick();
    };

    const handleDeleteSale = (sale) => {
        // console.log(sale.id);

        router.delete(route("sales.destroy", sale.id), {
            preserveState: false,
            onBefore: () =>
                confirm(
                    "Are you sure to cancel order? It will restock all items into the inventory"
                ),
        });
    };

    const filter = () => {
        // console.log(dates);

        // const filtered = sales.filter((sale) => {
        //     const d = new Date(sale.sale_date).getTime();
        //     const from = new Date(dates.from).getTime();
        //     const to = new Date(dates.to).getTime();

        //     return d >= from && d <= to;
        // });

        // setAllSales(filtered);
        router.reload({
            data: {
                from: dates.from,
                to: dates.to,
                status: status,
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
        return sales.reduce((acc, curr) => {
            if (curr.deleted_at) return acc;
            return acc + curr.total_amount;
        }, 0);
    };

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

            <ViewStatus
                sale={selectedSale}
                show={openStatus}
                onClose={handleStatusClick}
            ></ViewStatus>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 md:w-auto w-screen">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("sales.index")}
                                    icon={HiHome}
                                >
                                    Orders
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}
                            <div className="flex justify-end mb-2">
                                <Button href={route("sales.create")}>
                                    Add
                                </Button>
                            </div>

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
                                    <div className="">
                                        <div className="block">
                                            <Label
                                                htmlFor="status"
                                                value="Status"
                                            />
                                        </div>
                                        <Select
                                            id="status"
                                            value={status}
                                            onChange={(e) => {
                                                setStatus(e.target.value);
                                            }}
                                        >
                                            <option value="all">All</option>
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="processing">
                                                Processing
                                            </option>
                                            <option value="confirmed">
                                                Confirmed
                                            </option>
                                            <option value="on_delivery">
                                                On Delivery
                                            </option>
                                            <option value="on_hold">
                                                On Hold
                                            </option>
                                            <option value="waiting_for_payment">
                                                Waiting for Payment
                                            </option>
                                            <option value="delivered">
                                                Delivered
                                            </option>
                                        </Select>
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
                                <div className="!overflow-auto max-h-96">
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
                                                Payment Mode
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Total Amount
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Status
                                            </Table.HeadCell>
                                            <Table.HeadCell>
                                                Created By
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
                                                            {sale.payment_type}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {formatNumber(
                                                                sale.total_amount
                                                            )}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <Badge
                                                                as="button"
                                                                className="uppercase"
                                                                onClick={() => {
                                                                    handleUpdateStatus(
                                                                        sale
                                                                    );
                                                                }}
                                                            >
                                                                {sale.deleted_at
                                                                    ? "Cancelled"
                                                                    : removeUnderScore(
                                                                          sale.status
                                                                      )}
                                                            </Badge>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.user.name}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.created_at}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {sale.deleted_at &&
                                                                "Deleted"}
                                                            {!sale.deleted_at && (
                                                                <div className="flex space-x-2">
                                                                    <Link
                                                                        href={route(
                                                                            "sales.show",
                                                                            sale.id
                                                                        )}
                                                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                                    >
                                                                        <HiEye />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteSale(
                                                                                sale
                                                                            )
                                                                        }
                                                                        type="button"
                                                                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 ml-2"
                                                                    >
                                                                        <MdCancel />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>

                                        <Table.Head className="sticky bottom-0">
                                            <Table.HeadCell></Table.HeadCell>
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
