import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    Label,
    Table,
    Button,
    Select,
    TextInput,
    ListGroup,
    Sidebar,
    Breadcrumb,
    BreadcrumbItem,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import AddItem from "@/Pages/Sale/_Partials/AddItem";
import { HiHome, HiPlus, HiX } from "react-icons/hi";
import OrderList from "@/Pages/Sale/_Partials/OrderList";
import Checkout from "@/Pages/Sale/_Partials/Checkout";
import { formatNumber } from "@/Pages/Utilities/Util";

export default function SaleCreate({
    auth,
    flash,
    categories,
    products,
    order_no,
}) {
    const [allProductLists, setAllProductLists] = useState(products);
    const [productLists, setProductLists] = useState(categories[0].products);
    const [active, setActive] = useState(0);
    const [addItem, setAddItem] = useState(false);
    const [item, setItem] = useState();
    const [addedItems, setAddedItems] = useState([]);
    const [clickedCategory, setClickedCategory] = useState(categories[0].id);
    const [checkOut, setCheckOut] = useState(false);

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        computeTotalPrice();
        computeTotalQuantity();
    }, [addedItems]);

    const handleClickCategory = (id) => {
        const prods = allProductLists.filter((p) => p.category_id == id);
        setProductLists(prods);
    };

    const handleAddItemClick = () => {
        setAddItem((prev) => (prev = !prev));
    };

    const handleCheckOutClick = () => {
        setCheckOut((prev) => (prev = !prev));
    };

    const handleOnClose = (newItem) => {
        // const newAddedItems = [...addedItems];
        // const pos = newAddedItems.map((item) => item.id).indexOf(newItem.id);

        // if (pos > -1) {
        //     newAddedItems[pos] = {
        //         ...newItem,
        //         totalQuantity:
        //             Number(newItem.totalQuantity) +
        //             Number(newAddedItems[pos].totalQuantity),
        //     };
        //     setAddedItems(newAddedItems);
        // } else {
        //     setAddedItems([...addedItems, newItem]);

        // }
        setAddedItems([...addedItems, newItem]);

        const newList = [...allProductLists];
        const posNewList = newList.map((item) => item.id).indexOf(newItem.id);

        newList[posNewList] = {
            ...newList[posNewList],
            quantity: Number(
                newList[posNewList].quantity - newItem.totalQuantity
            ),
        };

        setAllProductLists(newList);

        const prods = newList.filter((p) => p.category_id == clickedCategory);
        setProductLists(prods);
        setAddItem((prev) => (prev = !prev));
    };

    const handleRemoveOrder = (newItem, index) => () => {
        setAddedItems(addedItems.filter((t, i) => i != index));

        const newList = [...allProductLists];
        const posNewList = newList.map((item) => item.id).indexOf(newItem.id);

        const findProduct = products.find((p) => p.id == newItem.id);

        newList[posNewList] = findProduct;

        setAllProductLists(newList);

        const prods = newList.filter((p) => p.category_id == clickedCategory);
        setProductLists(prods);
    };

    const computeTotalPrice = () => {
        const totalPrice = addedItems.reduce(
            (prev, curr) => prev + curr.newPrice * curr.totalQuantity,
            0
        );

        const discountedPrice = addedItems.reduce(
            (prev, curr) =>
                prev +
                curr.quantityDiscounted *
                    (curr.newPrice - curr.discountPerItem),
            0
        );

        const total = discountedPrice
            ? totalPrice - discountedPrice
            : totalPrice;
        setTotalAmount(total);
    };

    const computeTotalQuantity = () => {
        const q = addedItems.reduce(
            (prev, curr) => prev + curr.totalQuantity,
            0
        );
        setTotalQuantity(q);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Sales
                </h2>
            }
        >
            <Head title="Sales" />

            <div className="py-12">
                <AddItem
                    item={item}
                    show={addItem}
                    onClose={handleAddItemClick}
                    onSave={handleOnClose}
                ></AddItem>
                <Checkout
                    totalAmount={totalAmount}
                    totalQuantity={totalQuantity}
                    order_no={order_no}
                    orders={addedItems}
                    show={checkOut}
                    onClose={handleCheckOutClick}
                ></Checkout>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <Breadcrumb aria-label="Default breadcrumb example">
                                <Breadcrumb.Item
                                    href={route("sales.index")}
                                    icon={HiHome}
                                >
                                    Orders
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>Create</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="mb-3 flex justify-end">
                                <Button
                                    type="button"
                                    onClick={handleCheckOutClick}
                                >
                                    Check out
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="border rounded shadow-sm col-span-2">
                                    <div className="flex bg-gray-200 max-h-96 h-screen">
                                        <div className="flex flex-col divide-y">
                                            {categories.map((cat, index) => {
                                                return (
                                                    <div key={cat.name}>
                                                        <button
                                                            className={
                                                                `p-4 uppercase tracking-tighter text-lg w-full ` +
                                                                (active == index
                                                                    ? " font-semibold underline bg-white"
                                                                    : "bg-gray-200 border-r")
                                                            }
                                                            onClick={() => {
                                                                handleClickCategory(
                                                                    cat.id
                                                                );
                                                                setActive(
                                                                    index
                                                                );
                                                                setClickedCategory(
                                                                    cat.id
                                                                );
                                                            }}
                                                        >
                                                            {cat.name}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex flex-col grow divide-y overflow-y-auto p-2 bg-white">
                                            {productLists.map((item) => {
                                                return (
                                                    <div
                                                        key={item.product_name}
                                                        className="p-2 flex justify-between w-full items-center"
                                                    >
                                                        <div>
                                                            <div className="font-semibold">
                                                                {
                                                                    item.product_name
                                                                }
                                                            </div>
                                                            <div className="text-sm">
                                                                {
                                                                    item.description
                                                                }
                                                            </div>
                                                            <div className="text-sm">
                                                                {item.quantity +
                                                                    ` remaining`}
                                                            </div>
                                                            <div className="text-sm">
                                                                {formatNumber(
                                                                    item.price
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleAddItemClick();
                                                                    setItem(
                                                                        item
                                                                    );
                                                                }}
                                                            >
                                                                <HiPlus color="green"></HiPlus>
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <OrderList
                                    totalPrice={totalAmount}
                                    totalQuantity={totalQuantity}
                                    products={addedItems}
                                    handleRemoveOrder={handleRemoveOrder}
                                    canRemove={true}
                                ></OrderList>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
