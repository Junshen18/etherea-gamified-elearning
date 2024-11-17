"use client";
import { motion } from "framer-motion";
import CustomCursor from "@/components/custom-cursor";
import { useScramble } from "use-scramble";
import { useState } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import FuturisticInput from "@/components/futuristic-input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward} from '@fortawesome/free-solid-svg-icons'
import NotificationModel from "@/components/notification-model";
import RewardPanel from "@/components/reward-panel";
import { useRouter } from "next/navigation";
;


export default function Start() {
  const [count, setCount] = useState(0);
  const router = useRouter();


  const handleClick = () => {
    setCount(count + 1);
  };

  const handleSubmit = (name: string) => {
    console.log(`Welcome, ${name}!`);
    // setUserName(name);
    handleClick();
  };

  // const [userName, setUserName] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [showRewards, setShowRewards] = useState(false);
  const user_address = localStorage.getItem("user_address");
  const rewardsExample = [
    // { type: "exp" as const, amount: 100 },
    // { type: "coin" as const, amount: 50 },
    {
      type: "nft" as const,
      name: "Rare Collector Card",
      image: "/male-main-character-1.png",
    },
  ];

  const { ref: system } = useScramble({
    text: "Welcome to ETHEREA… a world shaped by knowledge, and knowledge that awaits its seekers.",
    range: [65, 125],
    speed: 2,
    tick: 5,
    step: 3,
    scramble: 5,
    seed: 2,
    chance: 1,
    overdrive: false,
    overflow: false,
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="bg-black text-white w-screen h-screen font-grotesk font-semibold text-sm tablet:text-xl"
      
    >
      <CustomCursor />
      <div className="fixed z-[1] inset-0 m-5 tablet:m-10 border-2 border-white rounded-2xl pointer-events-none"></div>
      {count == 0 && (
        <div className="absolute z-0 bg-[url('/intro-scene.png')] bg-center bg-cover h-screen w-screen" onClick={handleClick}>
          <div className="h-full w-full flex flex-col justify-end items-center px-10 py-5 tablet:px-16 tablet:py-10  bg-black bg-opacity-30">
            <span className="mb-5 laptop:w-[800px]">
              <div className="font-bold text-xl">System:</div>
              <span ref={system} />
            </span>
          </div>
        </div>
      )}
      {count == 1 && (
        <div className="absolute z-0 bg-[url('/intro-scene.png')] bg-center bg-cover w-screen h-screen">
          <motion.div
            className="h-full w-full relative flex flex-col justify-end"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            <Image
              src="/sage.png"
              height="500"
              width="500"
              alt="sage"
              className="w-[600px] z-0"
            />
            <div className="h-64 tablet:h-60 flex flex-col gap-2 bg-black bg-opacity-60 px-10 tablet:px-16 tablet:text-lg laptop:text-xl laptop:px-16 z-[1] pt-2 pb-8">
              <div className="flex flex-col h-48 tablet:h-36">
                <div className="font-bold text-xl">Sage</div>
                <TypeAnimation
                  sequence={[
                    "Ah, you've arrived! Welcome, young Seeker. I am Sage, your guide through Etherea's hidden pathways and untold truths. For too long, this world has been held captive by The Authority — an oppressive force that thrives on ignorance, keeping people bound to outdated systems and centralized power.",
                  ]}
                  wrapper="span"
                  speed={90}
                  repeat={0}
                />
              </div>
              <a className="text-base tablet:text-lg flex animate-pulse justify-end items-center gap-2" onClick={handleClick}>Next <FontAwesomeIcon icon={faForward} /></a>
            </div>
          </motion.div>
        </div>
      )}
      {count == 2 && (
        <div className="absolute z-0 bg-[url('/web2.png')] bg-center bg-cover w-screen h-screen">
          <motion.div
            className="h-full w-full relative flex flex-col justify-end"
          >
            <Image
              src="/sage.png"
              height="500"
              width="500"
              alt="sage"
              className="w-[600px] z-0"
            />
            <div className="h-64 tablet:h-60 flex flex-col gap-2 bg-black bg-opacity-60 px-10 tablet:px-16 tablet:text-lg laptop:text-xl laptop:px-16 z-[1] pt-2 pb-8">
            <div className="flex flex-col h-48 tablet:h-36">
              <div className="font-bold text-xl">Sage</div>
              <TypeAnimation
                sequence={[
                  "Etherea was not always like this. We once shared a vision of openness, where everyone could build, trade, and connect freely. But that knowledge has been hidden… until now. Together, we will uncover the principles of Web3, the decentralized power of blockchain, and the strength of Ethereum.",
                ]}
                wrapper="span"
                speed={90}
                repeat={0}
              />
              </div>
              <a className="text-base tablet:text-lg flex animate-pulse justify-end items-center gap-2" onClick={handleClick}>Next <FontAwesomeIcon icon={faForward} /></a>
            </div>
          </motion.div>
        </div>
      )}
      {count == 3 && (
        <div className="absolute z-0 bg-black bg-center bg-cover w-screen h-screen">
          <motion.div
            className="h-full w-full relative flex flex-col justify-end"
          >
            <FuturisticInput onSubmit={handleSubmit} className="top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[1]" />
            <Image
              src="/sage.png"
              height="500"
              width="500"
              alt="sage"
              className="w-[600px] z-0"
            />
            <div className="h-64 tablet:h-72 flex flex-col gap-2 bg-black bg-opacity-60 px-10 tablet:px-16 tablet:text-lg laptop:text-xl laptop:px-16 z-[1] pt-2 pb-8">
            <div className="flex flex-col h-48 tablet:h-36">
              <div className="font-bold text-xl">Sage</div>
              <TypeAnimation
                sequence={[
                  "But understand, Seeker, this is not just a journey of knowledge — it is a journey of empowerment. As we explore, I will guide you step by step. With each lesson, you'll unlock the tools needed to reshape Etherea. Are you ready to begin?",
                ]}
                wrapper="span"
                speed={90}
                repeat={0}
              />
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {count == 4 && (
        <div className="absolute z-0 bg-[url('/EthereaMap.png')] bg-center bg-cover w-screen h-screen">
          <motion.div
            className="h-full w-full relative flex flex-col justify-end"
          >

            <Image
              src="/sage.png"
              height="500"
              width="500"
              alt="sage"
              className="w-[600px] z-0"
            />
            <div className="h-64 tablet:h-72 flex flex-col gap-2 bg-black bg-opacity-60 px-10 tablet:px-16 tablet:text-lg laptop:text-xl laptop:px-16 z-[1] pt-2 pb-8">
            <div className="flex flex-col h-48 tablet:h-36">
              <div className="font-bold text-xl">Sage</div>
              <TypeAnimation
                sequence={[
                  `Well met, ${user_address}. From this moment, you are a Seeker of Truth and Freedom. I will walk alongside you, teaching, guiding, and answering your questions as we navigate Etherea together.`,
                ]}
                wrapper="span"
                speed={90}
                repeat={0}
              />
              </div>
              <a className="text-base tablet:text-lg flex animate-pulse justify-end items-center gap-2" onClick={handleClick}>Next <FontAwesomeIcon icon={faForward} /></a>
            </div>
          </motion.div>
        </div>
      )}
      {count == 5 && (
        <div className="absolute z-0 bg-[url('/EthereaMap.png')] bg-center bg-cover w-screen h-screen">
          <motion.div
            className="h-full w-full relative flex flex-col justify-end"
          >
            <NotificationModel
              isOpen={isNotificationOpen}
              buttonText="Start"
              buttonOnClick={() => {
                setIsNotificationOpen(false);
                setShowRewards(true);
              }}
              type="info"
              title="Get Your Character"
              message="Your action has been processed successfully!"
            />
            <RewardPanel
              isOpen={showRewards}
              onClose={() => {
                setShowRewards(false);
                router.push('/authenticated-pages/home');
              }}
              rewards={rewardsExample}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
