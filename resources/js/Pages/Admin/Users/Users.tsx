import Layout from "@/layouts/Layout";
import { User } from "@/types";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
    users: User[];
};

const Users = ({ users }: Props) => {
    return (
        <Layout>
            <div>
                <h1 className="text-xl mb-4">Users</h1>
                <div>
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </Layout>
    );
};

export default Users;
