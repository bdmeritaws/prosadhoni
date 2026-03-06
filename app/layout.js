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
    try {
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
                institute_id: 10,
            }),
        });

        // Check if response is OK
        if (!result.ok) {
            // console.error(`Category API Error: ${result.status} ${result.statusText}`);
            return null;
        }

        // Check content-type to ensure it's JSON
        const contentType = result.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            // console.error("Category API Error: Response is not JSON, possibly HTML error page");
            const text = await result.text();
            // console.error("Response preview:", text.substring(0, 200));
            return null;
        }

        return result.json();
    } catch (error) {
        console.error("Category API Fetch Error:", error);
        return null;
    }
};

export default async function RootLayout({ children }) {
    const response = await getCategory();
    // API returns { data: { category: [...] } } or { data: { status: 405, message: ... } }
    const categories = response?.data?.category || [];

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
                    <Menu category={categories} />
                    {children}
                    <Footer />
                    <ModalSideBar />
                    <ModalOrderConfirmed />
                </Providers>
            </body>
        </html>
    );
}

