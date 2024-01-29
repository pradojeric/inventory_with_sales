import Modal from "@/Components/Modal";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { HiTrash } from "react-icons/hi";

export default function AddCategory({ show = false, onClose = () => {} }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            category: "",
            variants: [],
        });

    const [property, setProperty] = useState({ name: "" });
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        clearErrors();
        setProperties([]);
    }, [show]);

    const submit = (e) => {
        e.preventDefault();

        post(route("categories.store"), {
            onSuccess: () => [onClose()],
        });
    };

    const addVariant = (value) => {
        if (!value.name) return;
        setProperties([...properties, value]);

        setData("variants", [...properties, value]);

        setProperty({ name: "" });
    };

    return (
        <>
            <Modal show={show} onClose={onClose} closeable={false}>
                <div className="p-6 text-gray-900">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                        Category
                    </h3>

                    <hr />

                    <div className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Category Name" />
                            </div>
                            <TextInput
                                id="name"
                                type="text"
                                required
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                color={errors.name && "failure"}
                                helperText={errors.name}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="description"
                                    value="Description"
                                />
                            </div>
                            <Textarea
                                id="description"
                                required
                                rows={2}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                color={errors.description && "failure"}
                                helperText={errors.description}
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="properties" value="Variants" />
                            </div>
                            <div className="flex space-x-2 mb-2">
                                <TextInput
                                    id="properties"
                                    className="w-full"
                                    placeholder="Small/3mg/pcs"
                                    value={property.name}
                                    onChange={(e) =>
                                        setProperty({ name: e.target.value })
                                    }
                                ></TextInput>
                                <Button
                                    type="button"
                                    disabled={!property.name}
                                    onClick={() => addVariant(property)}
                                >
                                    Add
                                </Button>
                            </div>

                            {properties.map((prop, index) => {
                                return (
                                    <div
                                        className="flex items-center"
                                        key={`prop` + index}
                                    >
                                        <button
                                            className="mr-4 text-red-700"
                                            onClick={() => {
                                                const newProps =
                                                    properties.filter(
                                                        (p, i) => i != index
                                                    );
                                                setProperties(newProps);
                                            }}
                                        >
                                            <HiTrash className="w-5 h-5" />
                                        </button>
                                        {prop.name}
                                    </div>
                                );
                            })}
                        </div>

                        <hr />

                        <div className="flex justify-end space-x-2">
                            <Button
                                type="button"
                                color="light"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                            <Button
                                type="button"
                                onClick={submit}
                                disabled={processing}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
