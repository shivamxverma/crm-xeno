"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import {
  FiBox,
  FiChevronsRight,
  FiHome,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useIsMobile from "../hooks/useMobile";
import useAuthStore from "../store/useAuthStore";
import { FaLessThan } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";

export default function Example({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <>{children}</>;
  }
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">{children}</div>
    </div>
  );
}

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { logout } = useAuthStore();
  const router = useRouter();

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 bg-gray-200 text-gray-800 p-4 shadow-lg"
      style={{
        width: open ? "280px" : "80px",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-2">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard"
          activeColor="bg-indigo-500/20 text-indigo-600"
          hoverColor="hover:from-indigo-500/10 hover:to-gray-300"
        />
        <Option
          Icon={FiUser}
          title="Customers"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/customers"
          activeColor="bg-teal-500/20 text-teal-600"
          hoverColor="hover:from-teal-500/10 hover:to-gray-300"
        />
        <Option
          Icon={FiBox}
          title="Orders"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/orders"
          activeColor="bg-emerald-500/20 text-emerald-600"
          hoverColor="hover:from-emerald-500/10 hover:to-gray-300"
        />
        <Option
          Icon={FaLessThan}
          title="Segment Rules"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/segment-rules"
          activeColor="bg-purple-500/20 text-purple-600"
          hoverColor="hover:from-purple-500/10 hover:to-gray-300"
        />
        <Option
          Icon={HiSpeakerphone}
          title="Campaign"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/campaign"
          activeColor="bg-orange-500/20 text-orange-600"
          hoverColor="hover:from-orange-500/10 hover:to-gray-300"
        />
        <Option
          Icon={HiSpeakerphone}
          title="Campaign History"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard/campaigns"
          activeColor="bg-amber-500/20 text-amber-600"
          hoverColor="hover:from-amber-500/10 hover:to-gray-300"
        />
        <Option
          Icon={FiLogOut}
          title="Logout"
          selected={selected}
          setSelected={setSelected}
          open={open}
          onClick={() => {
            logout();
            router.push("/");
          }}
          activeColor="bg-red-500/20 text-red-600"
          hoverColor="hover:from-red-500/10 hover:to-gray-300"
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  href,
  onClick,
  activeColor,
  hoverColor,
}: {
  Icon: IconType;
  title: string;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  open: boolean;
  href?: string;
  onClick?: () => void;
  activeColor: string;
  hoverColor: string;
}) => {
  return (
    <>
      {title === "Logout" ? (
        <motion.button
          layout
          onClick={onClick}
          className={`relative flex h-12 w-full items-center rounded-lg transition-all duration-300 ${
            selected === title ? activeColor : `text-gray-600 ${hoverColor}`
          }`}
        >
          <motion.div
            layout
            className="grid h-full w-12 place-content-center text-xl"
          >
            <Icon />
          </motion.div>
          {open && (
            <motion.span
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm font-semibold"
            >
              {title}
            </motion.span>
          )}
        </motion.button>
      ) : (
        <Link href={href as string}>
          <motion.button
            layout
            onClick={() => setSelected(title)}
            className={`relative flex h-12 w-full items-center rounded-lg transition-all duration-300 ${
              selected === title ? activeColor : `text-gray-600 ${hoverColor}`
            }`}
          >
            <motion.div
              layout
              className="grid h-full w-12 place-content-center text-xl"
            >
              <Icon />
            </motion.div>
            {open && (
              <motion.span
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-semibold"
              >
                {title}
              </motion.span>
            )}
          </motion.button>
        </Link>
      )}
    </>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-4 border-b border-gray-300 pb-4">
      <div className="flex items-center justify-center gap-2">
        <motion.div
          layout
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          CRM
        </motion.div>
      </div>
    </div>
  );
};

const ToggleClose = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-300 transition-all hover:bg-gray-300 p-3"
    >
      <div className="flex items-center">
        <motion.div
          layout
          className="grid size-12 place-content-center text-xl text-gray-600"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold text-gray-600"
          >
            Hide
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};