import Layout from "@/layouts/Layout";
import { Booking } from "@/types";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
    bookings: Booking[];
};

const Bookings = ({ bookings }: Props) => {
    return (
        <Layout>
            <div>
                <h1 className="text-xl mb-4">Bookings</h1>
                <div>
                    <DataTable columns={columns} data={bookings} />
                </div>
            </div>
        </Layout>
    );
};

export default Bookings;
