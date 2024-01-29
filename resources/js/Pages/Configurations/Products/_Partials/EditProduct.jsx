import AddCategory from "@/Pages/Configurations/Products/_Partials/AddCategory";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import {
    Button,
    Checkbox,
    Label,
    Select,
    TextInput,
    Textarea,
} from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import { BiSolidEdit } from "react-icons/bi";
import { useEffect } from "react";
import EditCategory from "@/Pages/Configurations/Products/_Partials/EditCategory";

export default function EditProduct({
    product = null,
    categories,
    show = false,
    onClose = () => {},
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: product?.name,
            category_id: product?.category_id,
            description: product?.description,
            variant_id: product?.variant_id,
            quantity: product?.quantity,
            price: product?.price,
            retail_price: product?.retail_price,
            wholesale_price: product?.wholesale_price,
        });

    const [showCategory, setShowCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [variants, setVariants] = useState([]);

    const handleCategoryClick = () => {
        setShowCategory((prev) => (prev = !prev));
    };

    const handleEditCategoryClick = () => {
        setEditCategory((prev) => (prev = !prev));
    };

    useEffect(() => {
        clearErrors();
    }, [data]);

    useEffect(() => {
        setData({
            name: product?.name,
            category_id: product?.category_id,
            description: product?.description,
            variant_id: product?.variant_id,
            quantity: product?.quantity,
            price: product?.price,
            retail_price: product?.retail_price,
            wholesale_price: product?.wholesale_price,
        });

        setSelectedCategory(product.category);
        const bar = categories.find((c) => c.id == product.category_id);

        if (bar) {
            setVariants(bar.variants);
        } else {
            setVariants([]);
        }
    }, [categories, product]);

    const submit = (e) => {
        e.preventDefault();

        post(
            route("products.update", {
                product: product?.id,
            }),
            {
                only: ["products"],
                onSuccess: () => [onClose()],
            }
        );
    };

    const getVariants = (cat) => {
        setData("category_id", cat);
        setSelectedCategory(categories.find((c) => c.id == cat));

        console.log(selectedCategory);
        const bar = categories.find((c) => c.id == cat);

        // console.log(bar);
        if (bar) {
            setVariants(bar.variants);
        } else {
            setVariants([]);
        }
    };

    return (
        <>
            <Modal show={show} onClose={onClose} closeable={false}>
                <AddCategory
                    show={showCategory}
                    onClose={handleCategoryClick}
                ></AddCategory>
                {selectedCategory && (
                    <EditCategory
                        category={selectedCategory}
                        show={editCategory}
                        onClose={handleEditCategoryClick}
                    ></EditCategory>
                )}
                <div className="p-6 text-gray-900">
                    <h3 className="text-lg font-semibold text-gray-800 uppercase">
                        Products
                    </h3>
                    <div className="flex flex-col gap-2">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Category" />
                            </div>
                            <div className="flex space-x-2">
                                <Select
                                    className="w-full"
                                    id="category"
                                    required
                                    value={data.category_id}
                                    onChange={(e) =>
                                        getVariants(e.target.value)
                                    }
                                    color={errors.category_id && "failure"}
                                >
                                    <option value="">Select One</option>
                                    {categories.map((category) => (
                                        <option
                                            value={category.id}
                                            key={`cat` + category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>

                                <Button
                                    type="button"
                                    onClick={handleCategoryClick}
                                >
                                    <HiPlus />
                                </Button>
                                <Button
                                    disabled={!selectedCategory}
                                    type="button"
                                    color="green"
                                    onClick={handleEditCategoryClick}
                                >
                                    <BiSolidEdit />
                                </Button>
                            </div>

                            {errors.category_id && (
                                <p className="mt-2 text-sm text-red-700">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex space-x-2">
                                <div className="block w-full">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="product"
                                            value="Product"
                                        />
                                    </div>
                                    <TextInput
                                        id="product"
                                        value={data.name}
                                        className="w-full"
                                        required
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        color={errors.name && "failure"}
                                        helperText={errors.name}
                                    />
                                </div>
                                <div className="shrink-0">
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="variant_id"
                                            value="Variant"
                                        />
                                    </div>
                                    <Select
                                        className="w-full"
                                        id="variant_id"
                                        required
                                        value={data.variant_id}
                                        onChange={(e) =>
                                            setData(
                                                "variant_id",
                                                e.target.value
                                            )
                                        }
                                        color={errors.category_id && "failure"}
                                    >
                                        <option value="">N/A</option>
                                        {variants.map((v) => (
                                            <option
                                                value={v.id}
                                                key={`cat` + v.id}
                                            >
                                                {v.name}
                                            </option>
                                        ))}
                                    </Select>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="quantity"
                                            value="Quantity"
                                        />
                                    </div>
                                    <TextInput
                                        type="number"
                                        id="quantity"
                                        min="0"
                                        defaultValue={data.quantity}
                                        required
                                        onChange={(e) =>
                                            setData("quantity", e.target.value)
                                        }
                                        color={errors.quantity && "failure"}
                                        helperText={errors.quantity}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex space-x-2">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="price" value="Price" />
                                    </div>
                                    <TextInput
                                        type="number"
                                        id="price"
                                        min="0"
                                        defaultValue={data.price}
                                        required
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        color={errors.price && "failure"}
                                        helperText={errors.price}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="retail_price"
                                            value="Retail Price"
                                        />
                                    </div>
                                    <TextInput
                                        type="number"
                                        id="retail_price"
                                        min="0"
                                        defaultValue={data.retail_price}
                                        required
                                        onChange={(e) =>
                                            setData(
                                                "retail_price",
                                                e.target.value
                                            )
                                        }
                                        color={errors.retail_price && "failure"}
                                        helperText={errors.retail_price}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label
                                            htmlFor="wholesale_price"
                                            value="WholeSale Price"
                                        />
                                    </div>
                                    <TextInput
                                        type="number"
                                        id="wholesale_price"
                                        min="0"
                                        defaultValue={data.wholesale_price}
                                        required
                                        onChange={(e) =>
                                            setData(
                                                "wholesale_price",
                                                e.target.value
                                            )
                                        }
                                        color={
                                            errors.wholesale_price && "failure"
                                        }
                                        helperText={errors.wholesale_price}
                                    />
                                </div>
                            </div>
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
                                value={data.description}
                                rows={2}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                color={errors.description && "failure"}
                                helperText={errors.description}
                            />
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
                                type="button"
                                disabled={processing}
                                onClick={submit}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}
