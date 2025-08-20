"use client";

import ChessboardComponent from "@/components/Chessboard";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "50px",
    padding: "2rem",
    flexWrap: "wrap",
  };

  const characterContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "300px",
  };

  const characterImageStyle: React.CSSProperties = {
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  };

  const characterNameStyle: React.CSSProperties = {
    marginTop: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#ecf0f1"
  };

  return (
    <main>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("title")}
      </motion.h1>
      <motion.div
        style={containerStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          style={characterContainerStyle}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://thumbs.dreamstime.com/b/cartoon-squirrel-icon-vector-royalty-free-cute-squirrel-illustration-cartoon-squirrel-detailed-character-design-style-291117116.jpg"
            alt="Chess Mascot"
            width={250}
            height={250}
            style={characterImageStyle}
            priority
          />
          <p style={characterNameStyle}>{t("characterName")}</p>
        </motion.div>
        <ChessboardComponent />
      </motion.div>
    </main>
  );
}
