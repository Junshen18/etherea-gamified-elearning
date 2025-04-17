"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "./bottom-nav";
import {
  DynamicContextProvider,
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

const hiddenNavPaths = ["/", "/register", "/login"];

const getIsAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("isAuthenticated") === "true";
  }
  return false;
};

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [showNav, setShowNav] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    setShowNav(!hiddenNavPaths.includes(pathname));
  }, [pathname]);

  useEffect(() => {
    const isAuthenticated = getIsAuthenticated();
    if (isAuthenticated && !hiddenNavPaths.includes(pathname)) {
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
                if (typeof window !== 'undefined') {
                  localStorage.setItem("isAuthenticated", "true");
                  localStorage.setItem("user_address", args.user.verifiedCredentials[0].address ?? "");
                }
                if(args.user.newUser == true) {
                  router.push("/register");
                } else {
                  router.push("/authenticated-pages/home");
                }
            },
            onLogout: (args) => {
                console.log('onLogout was called', args);
                if (typeof window !== 'undefined') {
                  localStorage.removeItem("isAuthenticated");
                }
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
              <div className="overflow-y-scroll h-full relative">
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
