import { LogginProvider } from "@/context/logginContext";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { getProducts } from "@/helpers/product.helper";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ShowComponent from "@/components/ShowComponent/ShowComponent";
import "./globals.css";
import AsideList from "@/components/AsideList/AsideList";
import { AppointmentForm } from "@/components/AddApp/AddApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Soluciones JhonDay",
  description: "Creative Commons",
};

async function getNavBarData() {
  try {
    const products = await getProducts();
    return products.map((product) => ({
      src: product.image,
      link: `/product/${product.id}`,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const images = await getNavBarData();

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col h-full w-full`}
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dgsk4faek/image/upload/v1728084021/categorias/zquryjcqhau6pdrnutow.jpg')", // Cambia la URL por la de tu imagen
          backgroundSize: "cover", 
          backgroundPosition: "center", 
          backgroundRepeat: "no-repeat", 
        }}
      >
        <LogginProvider>
          <ShowComponent>
            <NavBar images={images} />

            <div className="flex flex-col items-center mb-4">
            <AsideList />
            </div>

            <div className="flex-1 flex justify-center">
              {children}
            </div>
          </ShowComponent>
          <Footer />
        </LogginProvider>
      </body>
    </html>
  );
}
