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

export default function ViewStatus({
    sale = null,
    show = false,
    onClose = () => {},
    onSave = () => {},
}) {
    const { data, setData, reset, clearErrors, put, errors, processing } =
        useForm({
            status: sale?.status,
        });

    const submit = (e) => {
        e.preventDefault();

        put(route("sales.update-status", sale?.id), {
            preserveState: false,
            onSuccess: () => {
                reset();
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
                <div className="w-screen"></div>
                <form>
                    <div className="p-6 text-gray-900">
                        {sale?.order_no}

                        <div className="mb-2">
                            <Select
                                defaultValue={sale?.status}
                                value={data.status}
                                onChange={(e) => {
                                    setData("status", e.target.value);
                                }}
                                color={errors.cash_received && "failure"}
                                helperText={errors.cash_received}
                            >
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="on_delivery">On Delivery</option>
                                <option value="on_hold">On Hold</option>
                                <option value="waiting_for_payment">
                                    Waiting for Payment
                                </option>
                                <option value="delivered">Delivered</option>
                            </Select>
                        </div>

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
