import { Inter } from "next/font/google";
import "./globals.css";

import Menu from "@/app/common/menu";
import Footer from "@/app/common/footer";
import Providers from "@/app/redux/provider";
import Script from "next/script";
import ModalSideBar from "@/app/common/modalSideBar";
import ModalOrderConfirmed from "@/app/common/modalOrderConfirmed";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "prosadhoni",
    description: "prosadhoni ecommerce",
};


const getCategory = async () => {
    const AppURL = process.env.NEXT_PUBLIC_BASE_URL;
    const url = AppURL + "category";
    const result = await fetch(url, {
        next: { revalidate: 1200 },
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Origin": "https://babshahi.com",
            "Referer": "https://babshahi.com",
            "User-Agent": "Mozilla/5.0"
        },
        body: JSON.stringify({
            ClientService: "frontend-client",
            AuthKey: "Babshahi",
            ContentType: "application/json",
            shop_name: "prosadhoni",
        }),
    });
    if (result.status === 200) return result.json();
    else throw new Error("Internal server error");
};

export default async function RootLayout({ children }) {
    const response = await getCategory();

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/logo/favicon.ico" />
            </head>
            <body className={inter.className}>
                {/* Google Tag Manager */}
                <Script
                    id="gtm"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                            })(window,document,'script','dataLayer','GTM-M3HGXV4P');`,
                    }}
                />
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-M3HGXV4P" height="0" width="0"
                        style={{ display: "none", visibility: "hidden" }}>
                    </iframe>
                </noscript>
                {/* End GTM */}

                <Providers>
                    <Menu category={response?.category} />
                    {children}
                    <Footer />
                    <ModalSideBar />
                    <ModalOrderConfirmed />
                </Providers>
            </body>
        </html>
    );
}

