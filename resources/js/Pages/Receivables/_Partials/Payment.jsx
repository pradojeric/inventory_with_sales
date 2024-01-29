import Modal from "@/Components/Modal";
import {
    Button,
    Label,
    Checkbox,
    TextInput,
    Textarea,
    Select,
} from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { formatNumber } from "@/Pages/Utilities/Util";
import { useForm } from "@inertiajs/react";

export default function Payment({
    sale = null,
    show = false,
    onClose = () => {},
}) {
    const { data, setData, reset, clearErrors, put, errors, processing } =
        useForm({
            payment_method: "",
            reference_no: "",
        });

    useEffect(() => {
        console.log(sale);
    }, [show]);

    const submit = (e) => {
        e.preventDefault();

        put(route("receivables.update", sale.id), {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <>
            <Modal
                show={show}
                onClose={onClose}
                closeable={false}
                maxWidth="md"
            >
                <form>
                    <div className="p-6 text-gray-900">
                        {sale?.order_no}

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
                                    setData("payment_method", e.target.value);
                                }}
                                color={errors.payment_method && "failure"}
                                helperText={errors.payment_method}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="cash">Cash</option>
                                <option value="gcash">Gcash</option>
                                <option value="cheque">Cheque</option>
                            </Select>
                        </div>
                        {(data.payment_method == "gcash" ||
                            data.payment_method == "cheque") && (
                            <div className="mb-2">
                                <div className="block">
                                    <Label
                                        htmlFor="c_address"
                                        value="Reference No / Cheque No"
                                    />
                                </div>
                                <TextInput
                                    id="reference_no"
                                    required
                                    value={data.reference_no}
                                    onChange={(e) => {
                                        setData("reference_no", e.target.value);
                                    }}
                                    color={errors.reference_no && "failure"}
                                    helperText={errors.reference_no}
                                />
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                color="light"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={submit}
                                type="button"
                                disabled={processing}
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
