import Modal from "@/Components/Modal";
import OrderList from "@/Pages/Sale/_Partials/OrderList";
import {
    Button,
    Label,
    Checkbox,
    TextInput,
    Select,
    Alert,
} from "flowbite-react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Checkout({
    show,
    onClose = () => {},
    orders,
    order_no,
    totalAmount,
    totalQuantity,
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            order_no: order_no,
            customer_name: "",
            customer_address: "",
            payment_method: "",
            cash_received: "",
            sale_date: new Date().toISOString().split("T")[0],
            orders: [],
            change_amount: 0,
            reference_no: "",
        });

    const [change, setChange] = useState(0);

    useEffect(() => {
        setData("orders", orders);
    }, [orders]);

    useEffect(() => {
        setChange(-totalAmount);
    }, [show]);

    const submit = (e) => {
        e.preventDefault();

        post(route("sales.store"), { onSuccess: () => [onClose()] });
    };

    return (
        <>
            <Modal show={show} onClose={onClose} maxWidth="3xl">
                <form>
                    <div className="p-6 text-gray-900 h-full">
                        <h3 className="font-semibold uppercase tracking-tighter">
                            Checkout
                        </h3>
                        <hr />
                        <div className="h-auto my-2 grid grid-cols-2 gap-4">
                            <div>
                                <OrderList
                                    totalPrice={totalAmount}
                                    products={orders}
                                    totalQuantity={totalQuantity}
                                ></OrderList>
                            </div>
                            <div className="w-full">
                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="order_no"
                                            value="Order No"
                                        />
                                    </div>
                                    <TextInput
                                        id="order_no"
                                        value={data.order_no}
                                        disabled
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="sale_date"
                                            value="Sale Date"
                                        />
                                    </div>
                                    <TextInput
                                        type="date"
                                        id="sale_date"
                                        value={data.sale_date}
                                        onChange={(e) => {
                                            setData(
                                                "sale_date",
                                                e.target.value
                                            );
                                        }}
                                        color={errors.sale_date && "failure"}
                                        helperText={errors.sale_date}
                                        required
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="customer_name"
                                            value="Customer Name"
                                        />
                                    </div>
                                    <TextInput
                                        id="customer_name"
                                        required
                                        value={data.customer_name}
                                        name="customer_name"
                                        autoComplete="customer_name"
                                        onChange={(e) => {
                                            setData(
                                                "customer_name",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="c_address"
                                            value="Customer Address"
                                        />
                                    </div>
                                    <TextInput
                                        id="c_address"
                                        required
                                        value={data.customer_address}
                                        onChange={(e) => {
                                            setData(
                                                "customer_address",
                                                e.target.value
                                            );
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="payment_method"
                                            value="Payment Mode"
                                        />
                                    </div>
                                    <Select
                                        id="payment_method"
                                        required
                                        value={data.payment_method}
                                        onChange={(e) => {
                                            setData(
                                                "payment_method",
                                                e.target.value
                                            );
                                        }}
                                        color={
                                            errors.payment_method && "failure"
                                        }
                                        helperText={errors.payment_method}
                                    >
                                        <option value="">
                                            Select Payment Method
                                        </option>
                                        <option value="cash">Cash</option>
                                        <option value="gcash">Gcash</option>
                                        <option value="cheque">Cheque</option>
                                        <option value="account_receivable">
                                            Account Receivable
                                        </option>
                                    </Select>
                                </div>
                                {(data.payment_method == "gcash" ||
                                    data.payment_method == "cheque") && (
                                    <div className="mb-2">
                                        <div className="block">
                                            <Label
                                                htmlFor="reference_no"
                                                value="Reference No / Cheque No"
                                            />
                                        </div>
                                        <TextInput
                                            id="reference_no"
                                            required
                                            value={data.reference_no}
                                            onChange={(e) => {
                                                setData(
                                                    "reference_no",
                                                    e.target.value
                                                );
                                            }}
                                            color={
                                                errors.reference_no && "failure"
                                            }
                                            helperText={errors.reference_no}
                                        />
                                    </div>
                                )}

                                {data.payment_method ==
                                    "account_receivable" && (
                                    <div className="mb-2">
                                        <div className="block">
                                            <Label
                                                htmlFor="due_date"
                                                value="Due Date"
                                            />
                                        </div>
                                        <TextInput
                                            type="date"
                                            id="due_date"
                                            required
                                            value={data.due_date}
                                            onChange={(e) => {
                                                setData(
                                                    "due_date",
                                                    e.target.value
                                                );
                                            }}
                                            color={errors.due_date && "failure"}
                                            helperText={errors.due_date}
                                        />
                                    </div>
                                )}

                                <div className="mb-2">
                                    <div className="block">
                                        <Label
                                            htmlFor="cash_received"
                                            value="Payment Received"
                                        />
                                    </div>
                                    <TextInput
                                        id="cash_received"
                                        type="number"
                                        required
                                        min={0}
                                        value={data.cash_received}
                                        onChange={(e) => {
                                            const cc =
                                                e.target.value - totalAmount;
                                            setData({
                                                ...data,
                                                cash_received: e.target.value,
                                                change_amount: cc,
                                            });
                                            setChange(cc);
                                        }}
                                        color={
                                            errors.cash_received && "failure"
                                        }
                                        helperText={errors.cash_received}
                                    />
                                </div>
                                <div className="mb-2">
                                    <div className="block">
                                        <Label htmlFor="cc" value="Change" />
                                    </div>
                                    <TextInput
                                        id="cc"
                                        type="number"
                                        required
                                        value={change}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div className="flex justify-end space-x-2 mt-2">
                            <Button
                                type="button"
                                color="light"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={submit}
                                disabled={orders.length < 1 || processing}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
