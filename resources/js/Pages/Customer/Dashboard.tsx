import ServiceCard from "@/components/service-card";
import Services from "@/components/Services";
import Layout from "@/layouts/Layout";
import { Category, Service } from "@/types";

type Props = {
    services: Service[];
    categories: Category[];
};

const Dashboard = ({ services, categories }: Props) => {
    return (
        <Layout>
            <div>
                <h1 className="text-xl">Services</h1>
                <Services services={services} categories={categories} />
            </div>
        </Layout>
    );
};

export default Dashboard;
