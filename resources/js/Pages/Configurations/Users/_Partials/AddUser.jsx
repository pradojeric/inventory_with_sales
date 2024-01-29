import Modal from "@/Components/Modal";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Button,
    Checkbox,
    Label,
    Select,
    Textarea,
    TextInput,
} from "flowbite-react";
import { HiTrash } from "react-icons/hi";

export default function AddUser({ show = false, onClose = () => {} }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
            role: "",
            password: "",
            password_confirmation: "",
        });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("users.store"), {
            onSuccess: () => [onClose()],
        });
    };

    return (
        <>
            <Modal show={show} onClose={onClose} closeable={false}>
                <div className="p-6 text-gray-900">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                        Add Users
                    </h3>

                    <hr />

                    <form onSubmit={submit}>
                        <div>
                            <Label htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                color={errors.name && "failure"}
                                helperText={errors.name}
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                color={errors.email && "failure"}
                                helperText={errors.email}
                            />
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="role" value="Role" />

                            <Select
                                id="role"
                                value={data.role}
                                className="mt-1 block w-full"
                                onChange={(e) => {
                                    setData("role", e.target.value);
                                }}
                                required
                                color={errors.role && "failure"}
                                helperText={errors.role}
                            >
                                <option value="">Select Role</option>
                                <option value="admin">Administrator</option>
                                <option value="manager">Manager</option>
                                <option value="sales">
                                    Sales Representative
                                </option>
                                <option value="inventory_manager">
                                    Inventory Manager
                                </option>
                            </Select>
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                                color={errors.password && "failure"}
                                helperText={errors.password}
                            />
                        </div>

                        <div className="mt-4">
                            <Label
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                                color={
                                    errors.password_confirmation && "failure"
                                }
                                helperText={errors.password_confirmation}
                            />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <Button
                                type="button"
                                color="light"
                                onClick={onClose}
                            >
                                Close
                            </Button>

                            <Button
                                type="submit"
                                className="ms-4"
                                disabled={processing}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
