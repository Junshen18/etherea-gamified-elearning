"use client";
// import { TypeAnimation } from 'react-type-animation';
import { useScramble } from "use-scramble";
import Image from "next/image";
import { useEffect, useState } from "react";
import CustomCursor from "@/components/custom-cursor";
import { motion, AnimatePresence } from "framer-motion";
import { DynamicConnectButton } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "next/navigation";

export default function Home() {
  const { ref: title } = useScramble({
    text: "UNLOCK THE SECRETS OF WEB3",
    range: [65, 125],
    speed: 1,
    tick: 5,
    step: 3,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  const [subText, setSubText] = useState("");

  const { ref: sub } = useScramble({
    text: subText,
    range: [65, 125],
    speed: 2,
    tick: 5,
    step: 3,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
    playOnMount: false,
  });

  // const [showSub, setShowSub] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      setSubText(
        "Enter a Digital Frontier, Where Knowledge is Power, and Power is Yours to Claim."
      );
    }, 1500);

    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated === "true") {
      router.push("/authenticated-pages/home");
    }

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      <motion.div
        className="relative min-h-screen flex items-center justify-center bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.5 } }}
        exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.5 } }}
      >
        <CustomCursor />
        <div className="fixed inset-0 m-10 border-2 border-white rounded-2xl pointer-events-none z-[2]" />
        <Image
          src="etherea.svg"
          height="100"
          width="150"
          alt="Etherea"
          className="top-[9%] left-1/2 laptop:left-[9%] -translate-x-[50%] -translate-y-[60%]  absolute"
        />
        <div className="fixed h-screen w-screen bg-black z-0" />
        <div className="flex flex-col bg-[url('/hero-bg.png')] bg-opacity-70 tablet:bg-opacity-0 bg-[center_bottom_20%] bg-cover z-[1]">
          {/* <div className="h-screen w-screen bg-black/50  "/> */}
          <div className=" h-screen w-screen flex flex-col justify-center items-center p-10">
            <div className="h-1/4"></div>
            <div className="h-2/4 flex justify-center items-center">
              {/* <TypeAnimation className="font-grotesk font-black text-7xl text-white"  sequence={["UNLOCK THE SECRETS OF WEB3"]}/> */}
              <p
                className="font-grotesk font-black tablet:text-7xl text-5xl text-white text-center"
                ref={title}
              />
            </div>
            <div className="flex flex-row w-full justify-between font-grotesk font-regular text-xl text-white h-1/4 pb-10 items-end z-10">
              <div className="w-80 ml-10 h-24 items-start hidden tablet:block">
                <p ref={sub} />
                {/* {showSub && <p ref={sub}/>} */}
              </div>
              <div className="flex flex-row tablet:mr-10 gap-2 justify-center tablet:bg-transparent w-full tablet:w-auto cursor-pointer transition-all animate-pulse hover:translate-x-2 z-[2]">
                <DynamicConnectButton>
                  <a>Into the Unknown</a>
                </DynamicConnectButton>
                {/* <button onClick={() => setShowModal(true)}>Into the Unknown</button> */}

                <Image src="/arrow.svg" height="50" width="50" alt="arrow" className="hidden tablet:block" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
          </div>
        </div>
        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
                className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-sm z-40"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%] z-50"
              >
                <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg p-8 w-[400px]">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-2xl text-cyan-500 font-grotesk text-center mb-6">
                      Choose Your Path
                    </h2>

                    <button
                      onClick={() => (window.location.href = "/login")}
                      className="w-full bg-cyan-500/20 border border-cyan-500 text-cyan-500 py-3 rounded-lg
                             hover:bg-cyan-500/30 transition-colors duration-300 font-mono"
                    >
                      LOGIN
                    </button>

                    <button
                      onClick={() => (window.location.href = "/register")}
                      className="w-full bg-transparent border border-cyan-500 text-cyan-500 py-3 rounded-lg
                             hover:bg-cyan-500/10 transition-colors duration-300 font-mono"
                    >
                      CREATE NEW ACCOUNT
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
