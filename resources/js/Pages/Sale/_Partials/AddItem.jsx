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

export default function AddItem({
    item = null,
    show = false,
    onClose = () => {},
    onSave = () => {},
}) {
    const [discountEnabled, setDiscountEnabled] = useState(false);
    const [newItem, setNewItem] = useState();
    const [quantity, setQuantity] = useState(1);
    const [discountedQuantity, setDiscountedQuantity] = useState(1);
    const [customPrice, setCustomPrice] = useState(0);
    const [selectedPrice, setSelectedPrice] = useState(0);

    useEffect(() => {
        setNewItem({
            ...item,
            newPrice: item?.retail_price,
            totalQuantity: 1,
        });
        setSelectedPrice(item?.retail_price);
        // setDiscountEnabled(false);
        // setDiscountedQuantity(1);
        setQuantity(1);
    }, [show]);

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
                        <h3 className="text-lg font-semibold text-gray-800 uppercase">
                            Add Item
                        </h3>

                        <hr />

                        <div className="uppercase text-xl font-semibold mt-2">
                            {newItem?.product_name}
                        </div>
                        <div className="text-gray-700 text-sm">
                            {newItem?.quantity} items left
                        </div>
                        <div className="text-xs">
                            {`SRP: ` + formatNumber(newItem?.price)}
                        </div>
                        <div className="text-xs">
                            {`Retail: ` + formatNumber(newItem?.retail_price)}
                        </div>
                        <div className="text-xs">
                            {`Wholesale: ` +
                                formatNumber(newItem?.wholesale_price)}
                        </div>

                        <div className="mb-2">
                            <div className="mb-2 block">
                                <Label htmlFor="quantity" value="Quantity" />
                            </div>
                            <TextInput
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => {
                                    const q = Math.min(
                                        item?.quantity,
                                        Math.max(0, e.target.value)
                                    );
                                    const remaining = Math.max(
                                        0,
                                        Math.min(
                                            item?.quantity,
                                            item?.quantity - q
                                        )
                                    );
                                    setQuantity(q);

                                    setNewItem({
                                        ...newItem,
                                        quantity: remaining,
                                        totalQuantity: q,
                                    });
                                }}
                                required
                            />
                        </div>

                        <div className="mb-2 w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="price" value="Price" />
                            </div>
                            <div className="flex space-x-2">
                                {selectedPrice == "custom" && (
                                    <TextInput
                                        type="number"
                                        id="quantity"
                                        value={customPrice}
                                        min="0"
                                        onChange={(e) => {
                                            setCustomPrice(e.target.value);
                                            setNewItem({
                                                ...newItem,
                                                newPrice: e.target.value,
                                            });
                                        }}
                                        required
                                    />
                                )}
                                <Select
                                    className="w-full"
                                    value={selectedPrice}
                                    onChange={(e) => {
                                        setSelectedPrice(e.target.value);

                                        if (e.target.value != "custom")
                                            setNewItem({
                                                ...newItem,
                                                newPrice: Number(
                                                    e.target.value
                                                ),
                                            });
                                    }}
                                >
                                    <option value={item?.price}>
                                        {`SRP - ` + item?.price}
                                    </option>
                                    <option value={item?.retail_price}>
                                        {`Retail - ` + item?.retail_price}
                                    </option>
                                    <option value={item?.wholesale_price}>
                                        {`Wholesale - ` + item?.wholesale_price}
                                    </option>
                                    <option value="custom">Custom</option>
                                </Select>
                            </div>
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
                                onClick={() => {
                                    onSave(newItem);
                                    setQuantity("");
                                }}
                                type="button"
                                disabled={quantity < 1}
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
