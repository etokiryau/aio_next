import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { NextPage } from "next";
import Image from "next/image";

const NotFound: NextPage = () => {
  return (
    <MainLayout title="Not found">
        <div style={{textAlign: 'center'}}>
            <Image src="/404.jpg" alt="not found" width={450} height={300} priority />
        </div>
        
    </MainLayout>
  )
}

export default NotFound;