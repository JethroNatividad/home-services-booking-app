import ManageServices from "@/components/manage-services";
import Layout from "@/layouts/Layout";
import type { Category, Service } from "@/types";
import React from "react";

type Props = {
    services: Service[];
    categories: Category[];
};
const Dashboard = ({ services, categories }: Props) => {
    return (
        <Layout>
            <div>
                <h1 className="text-xl">Manage Services</h1>
                <ManageServices services={services} categories={categories} />
            </div>
        </Layout>
    );
};

export default Dashboard;
