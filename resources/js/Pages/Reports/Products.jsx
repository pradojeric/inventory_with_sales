import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head, router } from "@inertiajs/react";
import {
    Alert,
    Table,
    Button,
    Select,
    TextInput,
    Label,
    Spinner,
} from "flowbite-react";
import { useEffect, useState } from "react";

export default function ProductIndex({ auth, flash, categories }) {
    const reports = ["All", "Daily", "Monthly", "Yearly", "Custom"];
    const [date, setDate] = useState();
    const [endDate, setEndDate] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [selectedReport, setSelectedReport] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDate(new Date().toISOString().split("T")[0]);
        setEndDate(new Date().toISOString().split("T")[0]);
        setMonth(new Date().getMonth());
        setYear(new Date().getFullYear());
    }, []);

    useEffect(() => {
        getReport();
    }, [date, endDate, selectedReport, month, year]);

    const getReport = () => {
        router.reload({
            data: {
                date: date,
                endDate: endDate,
                selectedReport: selectedReport,
                month: month,
                year: year,
            },
            onStart: () => {
                setLoading(true);
            },
            onProgress: (progress) => {
                console.log(progress);
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    };

    const renderOptions = () => {
        if (selectedReport == 1) {
            return (
                <div className="mb-2 ">
                    <div className="block">
                        <Label htmlFor="date" value="Date" />
                    </div>
                    <TextInput
                        id="date"
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                        }}
                        type="date"
                    />
                </div>
            );
        }

        if (selectedReport == 2) {
            const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ];

            return (
                <div className="block">
                    <div>
                        <div className="block">
                            <Label htmlFor="month" value="Month" />
                        </div>
                        <Select
                            id="month"
                            value={month}
                            onChange={(e) => {
                                setMonth(e.target.value);
                            }}
                            type="date"
                        >
                            {months.map((m, i) => {
                                return (
                                    <option key={i} value={i}>
                                        {m}
                                    </option>
                                );
                            })}
                        </Select>
                    </div>
                    <div>
                        <div className="block">
                            <Label htmlFor="year" value="Year" />
                        </div>
                        <TextInput
                            id="year"
                            value={year}
                            onChange={(e) => {
                                setYear(e.target.value);
                            }}
                        />
                    </div>
                </div>
            );
        }

        if (selectedReport == 3) {
            return (
                <div className="mb-2 ">
                    <div className="block">
                        <Label htmlFor="year" value="Year" />
                    </div>
                    <TextInput
                        id="year"
                        value={year}
                        onChange={(e) => {
                            setYear(e.target.value);
                        }}
                    />
                </div>
            );
        }

        if (selectedReport == 4) {
            return (
                <>
                    <div className="mb-2 ">
                        <div className="block">
                            <Label htmlFor="date" value="Date" />
                        </div>
                        <TextInput
                            id="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                            type="date"
                        />
                    </div>
                    <div className="mb-2 ">
                        <div className="block">
                            <Label htmlFor="endDate" value="End Date" />
                        </div>
                        <TextInput
                            id="endDate"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                            type="date"
                        />
                    </div>
                </>
            );
        }
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
                    <div className="bg-white shadow-sm sm:rounded-lg h-[70vh] overflow-y-visible">
                        <div className="p-6 text-gray-900 md:w-auto w-screen">
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}

                            <div className="sticky top-0 z-10 border-b bg-white">
                                <div className="flex md:justify-end">
                                    <Button.Group>
                                        {reports.map((report, index) => {
                                            return (
                                                <Button
                                                    size="sm"
                                                    key={`H` + index}
                                                    onClick={() => {
                                                        setSelectedReport(
                                                            index
                                                        );
                                                    }}
                                                    color={
                                                        selectedReport == index
                                                            ? "blue"
                                                            : "info"
                                                    }
                                                >
                                                    {report}
                                                </Button>
                                            );
                                        })}
                                    </Button.Group>
                                </div>

                                {renderOptions()}
                            </div>

                            {loading && (
                                <div className="flex justify-center">
                                    <Spinner className="h-24 w-24" />
                                </div>
                            )}

                            {!loading && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 overflow-auto">
                                        {categories.map((category) => {
                                            return (
                                                <div
                                                    key={category.id}
                                                    className="mb-5"
                                                >
                                                    {category.name}

                                                    <Table striped>
                                                        <Table.Head>
                                                            <Table.HeadCell>
                                                                Product
                                                            </Table.HeadCell>

                                                            <Table.HeadCell>
                                                                Received
                                                            </Table.HeadCell>
                                                            <Table.HeadCell>
                                                                Sold
                                                            </Table.HeadCell>
                                                            <Table.HeadCell>
                                                                Total Stock
                                                            </Table.HeadCell>
                                                        </Table.Head>
                                                        <Table.Body>
                                                            {category.products.map(
                                                                (
                                                                    prod,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Table.Row
                                                                            key={
                                                                                `prod` +
                                                                                index
                                                                            }
                                                                            className="text-xs"
                                                                        >
                                                                            <Table.Cell>
                                                                                {
                                                                                    prod.name
                                                                                }
                                                                            </Table.Cell>

                                                                            <Table.Cell>
                                                                                {
                                                                                    prod.delivered_item
                                                                                }
                                                                            </Table.Cell>
                                                                            <Table.Cell>
                                                                                {
                                                                                    prod.item_sold
                                                                                }
                                                                            </Table.Cell>
                                                                            <Table.Cell>
                                                                                {
                                                                                    prod.remaining
                                                                                }
                                                                            </Table.Cell>
                                                                        </Table.Row>
                                                                    );
                                                                }
                                                            )}
                                                        </Table.Body>
                                                        <Table.Head>
                                                            <Table.HeadCell>
                                                                Total
                                                            </Table.HeadCell>

                                                            <Table.HeadCell>
                                                                {category.products.reduce(
                                                                    (
                                                                        prev,
                                                                        curr
                                                                    ) =>
                                                                        prev +
                                                                        curr.delivered_item,
                                                                    0
                                                                )}
                                                            </Table.HeadCell>
                                                            <Table.HeadCell>
                                                                {category.products.reduce(
                                                                    (
                                                                        prev,
                                                                        curr
                                                                    ) =>
                                                                        prev +
                                                                        curr.item_sold,
                                                                    0
                                                                )}
                                                            </Table.HeadCell>
                                                            <Table.HeadCell>
                                                                {category.products.reduce(
                                                                    (
                                                                        prev,
                                                                        curr
                                                                    ) =>
                                                                        prev +
                                                                        curr.remaining,
                                                                    0
                                                                )}
                                                            </Table.HeadCell>
                                                        </Table.Head>
                                                    </Table>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
