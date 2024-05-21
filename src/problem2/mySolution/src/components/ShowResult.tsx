import { Avatar } from "@nextui-org/react";
import { motion } from "framer-motion";
import React from "react";
import { TypeCurrency } from "../mock/api";
import { formatDate } from "../utils/formatDate";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export type ShowResultProps = {
  coinAmount?: TypeCurrency | null | undefined;
  coinReceived?: TypeCurrency | null | undefined;
  numberCoinReceived: number;
};

const ShowResult: React.FC<ShowResultProps> = ({
  coinAmount,
  coinReceived,
  numberCoinReceived,
}) => {
  return (
    <>
      <motion.div className="w-full p-8 min-h-[10rem]  bg-slate-100 rounded-lg shadow-xl ">
        <motion.h1
          variants={item}
          className="flex w-full items-center justify-around "
        >
          <div className="flex text-center text-2xl font-extrabold items-center ">
            <Avatar
              alt={coinAmount?.currency}
              className="w-10 h-10 mr-4"
              src={`/public/tokens/${coinAmount?.currency}.svg`}
            ></Avatar>

            <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {coinAmount?.currency}
            </p>
          </div>
          <div className="text-2xl bg-gradient-to-r via-purple-500 from-indigo-500  to-pink-500 bg-clip-text text-transparent font-bold ">
            to
          </div>
          <div className="flex text-center text-2xl font-extrabold items-center">
            <Avatar
              alt={coinReceived?.currency}
              className="w-10 h-10 mr-4"
              src={`/public/tokens/${coinReceived?.currency}.svg`}
            ></Avatar>

            <p className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {coinReceived?.currency}
            </p>
          </div>
        </motion.h1>
        <motion.ul
          className="h-auto grid overflow-hidden m-0 list-none p-[15px]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.li
            className=" rounded-full h-10 text-lg font-bold"
            variants={item}
          >
            Number coin convert:{" "}
            <span className="text-sm font-normal">{numberCoinReceived}</span>
          </motion.li>
          <motion.li
            className=" rounded-full h-10 text-lg font-bold"
            variants={item}
          >
            Price:{" "}
            <span className="text-sm font-normal">{coinReceived?.price}</span>
          </motion.li>
          <motion.li
            className=" rounded-full h-10 text-lg font-bold"
            variants={item}
          >
            Date:{" "}
            <span className="text-sm font-normal">
              {formatDate(coinReceived?.date || "")}
            </span>
          </motion.li>
        </motion.ul>
      </motion.div>
    </>
  );
};

export default ShowResult;
