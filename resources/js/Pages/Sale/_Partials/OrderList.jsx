import { formatNumber } from "@/Pages/Utilities/Util";
import { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";

export default function OrderList({
    products,
    handleRemoveOrder = () => {},
    canRemove = false,
    totalPrice,
    totalQuantity,
}) {
    const getTotal = (item) => {
        let total = item.newPrice * item.totalQuantity;
        let discount = 0;

        if (item.hasDiscount) {
            discount =
                item.quantityDiscounted *
                (item.newPrice - item.discountPerItem);
        }

        const finalPrice = total - discount;

        return formatNumber(finalPrice);
    };

    return (
        <div className="border rounded shadow-sm flex flex-col justify-between h-full">
            <div className="border-b p-2 uppercase">Order List</div>
            <div className="overflow-y-auto grow divide-y">
                {products.map((item, index) => {
                    return (
                        <div key={item.name + `` + index}>
                            <div className="flex justify-between space-x-4 items-center px-3 py-1 text-sm">
                                <div className="grow">
                                    <span>
                                        {item.product_name} X{" "}
                                        {item.totalQuantity}
                                    </span>
                                    <div className="text-xs italic">
                                        {formatNumber(item.newPrice) +
                                            ` per item`}
                                    </div>
                                    {item.hasDiscount && (
                                        <div className="text-xs italic">
                                            {item.quantityDiscounted} per{" "}
                                            {formatNumber(
                                                Number(item.discountPerItem)
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <span>{getTotal(item)}</span>
                                    <div>
                                        {item.hasDiscount && (
                                            <div className="text-xs text-red-500"></div>
                                        )}
                                    </div>
                                </div>

                                {canRemove && (
                                    <span className="shrink">
                                        <button
                                            type="button"
                                            onClick={handleRemoveOrder(
                                                item,
                                                index
                                            )}
                                        >
                                            <HiX color="red"></HiX>
                                        </button>
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="border-t p-2 text-right">
                <div>{`Total Quantity: ` + totalQuantity}</div>
                <div className="uppercase font-bold text-lg">
                    {"Total Price: " + formatNumber(totalPrice)}
                </div>
            </div>
        </div>
    );
}
