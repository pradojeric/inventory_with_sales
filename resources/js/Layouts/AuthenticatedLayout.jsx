import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { Sidebar } from "flowbite-react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiShoppingBag,
    HiTable,
    HiViewBoards,
    HiTruck,
    HiUser,
    HiLogout,
    HiClipboardList,
    HiCog,
} from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import { FaBoxes } from "react-icons/fa";

export default function Authenticated({ user, header, children }) {
    return (
        <div className="bg-gray-100 max-h-screen overflow-hidden">
            <Navbar fluid rounded className="sticky top-0">
                <Navbar.Brand href="https://flowbite-react.com">
                    <ApplicationLogo className="mr-3 h-6 sm:h-9" />

                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Inventory with Sales
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={<ApplicationLogo className="mr-3 h-6 sm:h-9" />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.name}</span>
                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Item href={route("dashboard")}>
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Item href={route("profile.edit")}>
                            Profile
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="div">
                            <Link
                                className="block w-full text-start"
                                href={route("logout")}
                                method="post"
                                as="button"
                            >
                                Sign Out
                            </Link>
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
            </Navbar>
            <div className="flex w-full">
                <Sidebar
                    aria-label="Sidebar with multi-level dropdown example"
                    className="h-svh"
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
                                    Stock Up
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
