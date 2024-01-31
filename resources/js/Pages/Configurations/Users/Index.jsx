import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddProduct from "@/Pages/Configurations/Products/_Partials/AddProduct";
import EditProduct from "@/Pages/Configurations/Products/_Partials/EditProduct";
import AddUser from "@/Pages/Configurations/Users/_Partials/AddUser";
import EditUser from "@/Pages/Configurations/Users/_Partials/EditUser";
import { formatNumber } from "@/Pages/Utilities/Util";
import { Head } from "@inertiajs/react";
import { Alert, Table, Button, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";

export default function Index({ auth, flash, users }) {
    const [addUser, setAddUser] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState();

    const handleAddUserClick = () => {
        setAddUser((prev) => (prev = !prev));
    };

    const handleEditUserClick = () => {
        setEditUser((prev) => (prev = !prev));
    };

    const edit = (user) => {
        setSelectedUser(user);
        handleEditUserClick();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg overflow-y-auto md:max-h-[70vh]">
                        <div className="p-6 text-gray-900 md:w-auto w-screen">
                            {flash.message && (
                                <Alert color="success">{flash.message}</Alert>
                            )}
                            <AddUser
                                show={addUser}
                                onClose={handleAddUserClick}
                            />

                            <EditUser
                                user={selectedUser}
                                show={editUser}
                                onClose={handleEditUserClick}
                            />

                            <div className="flex justify-end mb-2">
                                <Button
                                    type="button"
                                    onClick={handleAddUserClick}
                                >
                                    Add User
                                </Button>
                            </div>

                            <div className="overflow-x-auto">
                                <Table striped>
                                    <Table.Head className="top-0 sticky">
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Email</Table.HeadCell>
                                        <Table.HeadCell>Role</Table.HeadCell>
                                        <Table.HeadCell>
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {users.map((user) => {
                                            return (
                                                <Table.Row key={user.id}>
                                                    <Table.Cell>
                                                        {user.name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {user.email}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {user.role}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                edit(user);
                                                            }}
                                                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                                                        >
                                                            Edit
                                                        </button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
