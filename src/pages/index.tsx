import type { GetServerSidePropsContext, NextPage } from "next";
import PosHeader from "@/components/Modules/Pos/Header";
import PosSection from "@/components/Modules/Pos";
import Head from "next/head";


const POS: NextPage = () => {
   return (
      <>
         <Head>
            <title>Buymore App</title>
            <meta name="description" content="Buymore App" />
         </Head>

         <PosHeader />
         <PosSection />
      </>
   );
};

export default POS;
