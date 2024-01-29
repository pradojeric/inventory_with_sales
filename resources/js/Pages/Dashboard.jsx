import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head, router } from "@inertiajs/react";
import {
    Button,
    Label,
    Checkbox,
    TextInput,
    Select,
    Alert,
    Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LabelList,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

export default function Dashboard({ auth, sales, stocks, due_dates }) {
    const [date, setDate] = useState();

    useEffect(() => {
        setDate(new Date().getFullYear());
    }, []);

    useEffect(() => {
        router.reload({
            data: {
                date: date,
            },
            only: ["sales"],
        });
    }, [date]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
        // router.reload({
        //     data: {
        //         date: date,
        //     },
        //     only: ["sales"],
        // });
    };

    const isDue = (due_date) => {
        const today = new Date().getTime();
        const due = new Date(due_date).getTime();

        return today > due;
    };

    const barcolors = [
        "#ff0000", // Red
        "#00ff00", // Green
        "#0000ff", // Blue
        "#ffff00", // Yellow
        "#ff00ff", // Magenta
        "#00ffff", // Cyan
        "#800080", // Purple
        "#008000", // Dark Green
        "#800000", // Maroon
        "#000080", // Navy
        "#ffa500", // Orange
        "#008080", // Teal
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[70vh] overflow-y-visible">
                        <div className="p-6 text-gray-900 ">
                            <div className="border m-5 p-2">
                                <div className="flex justify-end">
                                    <TextInput
                                        type="number"
                                        value={date}
                                        onChange={(e) => {
                                            handleDateChange(e);
                                        }}
                                    />
                                </div>
                                <h3 className="text-center font-semibold uppercase tracking-wider text-lg">
                                    Sales of {date}
                                </h3>
                                <ResponsiveContainer height={500}>
                                    <BarChart
                                        data={sales}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 30,
                                            bottom: 30,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="4 1" />
                                        <XAxis
                                            dataKey="name"
                                            interval="preserveStartEnd"
                                        />
                                        <YAxis
                                            tickFormatter={(value) => {
                                                return formatNumber(value);
                                            }}
                                            label={{
                                                value: "Total Sales",
                                                angle: -90,
                                                position: "left",
                                                offset: 20,
                                            }}
                                            tick={{ fontSize: 12 }}
                                            tickSize={3}
                                        />
                                        <Tooltip
                                            formatter={(value, name, props) => [
                                                formatNumber(value),
                                                name.toUpperCase(),
                                            ]}
                                        />
                                        <Bar
                                            type="monotone"
                                            dataKey="sales"
                                            stackId="a"
                                            fill="#82ca9d"
                                            strokeWidth={1}
                                        >
                                            {/* <LabelList
                                                dataKey="sales"
                                                position="top"
                                                fontSize={10}
                                                formatter={(
                                                    value,
                                                    name,
                                                    props
                                                ) => formatNumber(value)}
                                            /> */}
                                        </Bar>
                                        <Bar
                                            type="monotone"
                                            dataKey="receivables"
                                            stackId="a"
                                            fill="#de2745"
                                            strokeWidth={1}
                                        >
                                            {/* <LabelList
                                                dataKey="receivables"
                                                position="top"
                                                fontSize={10}
                                                formatter={(
                                                    value,
                                                    name,
                                                    props
                                                ) => [
                                                    formatNumber(value),
                                                    "Receivables",
                                                ]}
                                            /> */}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="border m-5 p-2">
                                    <h3 className="text-center font-semibold uppercase tracking-wider text-lg">
                                        Due Dates
                                    </h3>
                                    <div className="overflow-y-auto h-80">
                                        <Table striped>
                                            <Table.Head className="sticky top-0">
                                                <Table.HeadCell>
                                                    Customer
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Amount
                                                </Table.HeadCell>
                                                <Table.HeadCell>
                                                    Due Date
                                                </Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body>
                                                {due_dates.map((due, index) => {
                                                    return (
                                                        <Table.Row
                                                            key={`due-` + index}
                                                            className={
                                                                isDue(
                                                                    due.due_date
                                                                )
                                                                    ? `text-red-500 font-bold`
                                                                    : ``
                                                            }
                                                        >
                                                            <Table.Cell>
                                                                {
                                                                    due.customer_name
                                                                }
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {formatNumber(
                                                                    due.total_amount
                                                                )}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {due.due_date}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })}
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </div>
                                <div className="border m-5 p-2">
                                    <ResponsiveContainer height={300}>
                                        <PieChart>
                                            <Tooltip />
                                            <Pie
                                                data={stocks}
                                                dataKey="quantity"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                innerRadius={30}
                                                label
                                            >
                                                {stocks.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={
                                                            barcolors[
                                                                index % 20
                                                            ]
                                                        }
                                                    />
                                                ))}
                                            </Pie>

                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                margin={{ left: 20, right: 20 }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>

                                    <h3 className="text-center font-semibold uppercase tracking-wider text-lg">
                                        Stocks
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
