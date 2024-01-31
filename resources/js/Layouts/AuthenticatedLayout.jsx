import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { Navbar, Sidebar } from "flowbite-react";
import {
    HiChartPie,
    HiShoppingBag,
    HiTruck,
    HiUser,
    HiLogout,
    HiClipboardList,
} from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaBoxes, FaUserEdit } from "react-icons/fa";

export default function Authenticated({ user, header, children }) {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar((prev) => (prev = !prev));
    };

    return (
        <div className="bg-gray-100 ">
            <Navbar
                fluid
                rounded
                className="sticky top-0 z-40 bg-[#6a0c96] rounded-none shadow-sm"
            >
                <Navbar.Brand>
                    <ApplicationLogo className="mr-3 h-6 md:h-9" />

                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
                        Inventory
                    </span>
                </Navbar.Brand>

                <div className="md:order-2 text-right">
                    <Navbar.Toggle
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpenSidebar();
                        }}
                    >
                        <div>{user.name}</div>
                        <div>{user.email}</div>
                    </Navbar.Toggle>
                </div>
            </Navbar>
            <div className="flex w-full">
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className={
                        "h-lvh absolute sm:relative z-30 rounded-none sm:block " +
                        (openSidebar ? "" : "hidden")
                    }
                >
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item
                                active={route().current("dashboard")}
                                href="/dashboard"
                                icon={HiChartPie}
                            >
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Collapse
                                icon={HiClipboardList}
                                label="Reports"
                            >
                                {(user.role == "admin" ||
                                    user.role == "manager" ||
                                    user.role == "inventory_manager") && (
                                    <Sidebar.Item
                                        href={route("reports.stocks")}
                                        active={route().current(
                                            "reports.stocks"
                                        )}
                                    >
                                        Stocks
                                    </Sidebar.Item>
                                )}
                                {(user.role == "admin" ||
                                    user.role == "manager" ||
                                    user.role == "sales") && (
                                    <Sidebar.Item
                                        href={route("reports.sales")}
                                        active={route().current(
                                            "reports.sales"
                                        )}
                                    >
                                        Sales
                                    </Sidebar.Item>
                                )}
                            </Sidebar.Collapse>
                            {(user.role == "admin" ||
                                user.role == "inventory_manager") && (
                                <Sidebar.Item
                                    href={route("stocks.index")}
                                    active={route().current("stocks.*")}
                                    icon={HiTruck}
                                >
                                    Deliveries
                                </Sidebar.Item>
                            )}
                            {(user.role == "admin" || user.role == "sales") && (
                                <>
                                    <Sidebar.Item
                                        href={route("sales.index")}
                                        active={route().current("sales.*")}
                                        icon={HiShoppingBag}
                                    >
                                        Orders
                                    </Sidebar.Item>
                                    <Sidebar.Item
                                        href={route("receivables")}
                                        active={route().current("receivables")}
                                        icon={GiReceiveMoney}
                                    >
                                        Receivables
                                    </Sidebar.Item>
                                </>
                            )}
                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            {(user.role == "admin" ||
                                user.role == "inventory_manager") && (
                                <Sidebar.Item
                                    href={route("products.index")}
                                    active={route().current("products.index")}
                                    icon={FaBoxes}
                                >
                                    Products List
                                </Sidebar.Item>
                            )}

                            {user.role == "admin" && (
                                <Sidebar.Item
                                    href={route("users.index")}
                                    active={route().current("users.*")}
                                    icon={HiUser}
                                >
                                    Users
                                </Sidebar.Item>
                            )}
                            <Sidebar.Item
                                as={Link}
                                href={route("profile.edit")}
                                icon={FaUserEdit}
                            >
                                Profile
                            </Sidebar.Item>
                            <Sidebar.Item as="div">
                                <Link
                                    className="w-full text-start flex items-center"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <HiLogout className="-ml-3 mr-3 h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    Sign out
                                </Link>
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
                <div className="grow">
                    {header && (
                        <header className="bg-white shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}

                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
