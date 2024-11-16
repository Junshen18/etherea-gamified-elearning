"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "./bottom-nav";
import {
  DynamicContextProvider,
  DynamicEmbeddedWidget,
  DynamicWidget,
  getAuthToken,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

interface LayoutContextType {
  showNav: boolean;
  setShowNav: (show: boolean) => void;
}


const LayoutContext = createContext<LayoutContextType>({
  showNav: false,
  setShowNav: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const hiddenNavPaths = ["/", "/register", "/login"];
  const router = useRouter();
  useEffect(() => {
    setShowNav(!hiddenNavPaths.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true" && !hiddenNavPaths.includes(pathname)) {
      setShowNav(true);
    }
  }, [pathname]);

  const isAuthPath = !hiddenNavPaths.includes(pathname);

  return (
    <LayoutContext.Provider value={{ showNav, setShowNav }}>
      <DynamicContextProvider
        settings={{
          environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID || "",
          walletConnectors: [EthereumWalletConnectors],
          events: {
            onAuthFlowCancel: () => {
              console.log("Auth flow cancelled");
            },
            onAuthFlowClose: () => {
              console.log("Auth flow closed");
            },
            onAuthFailure: (error) => {
              console.log("Access denied", error);
            },
            onAuthSuccess: (args) => {
                console.log('onAuthSuccess was called', args);
                // you can get the jwt by calling the getAuthToken helper function
                const authToken = getAuthToken();
                console.log('authToken', authToken);
                localStorage.setItem("isAuthenticated", "true");
                router.push("/authenticated-pages/home");
            },
            onLogout: (args) => {
                console.log('onLogout was called', args);
                localStorage.removeItem("isAuthenticated");
                router.push("/");
              }
          },
        }}

      >
        <div className="hidden">
            <DynamicWidget />
        </div>
          {/* <DynamicEmbeddedWidget /> */}

        {isAuthPath ? (
          <div className="max-h-screen bg-[url('/EthereaMap.png')] bg-cover bg-center bg-no-repeat ">
            <div className="mx-auto max-w-[428px] max-h-screen h-full bg-primary relative flex flex-col">
              <div className="overflow-y-scroll h-full">
                {children}
              </div>
              {showNav && <BottomNav />}
            </div>
          </div>
        ) : (
          <>
            {children}
            {showNav && <BottomNav />}
          </>
        )}
      </DynamicContextProvider>
    </LayoutContext.Provider>
  );
}
