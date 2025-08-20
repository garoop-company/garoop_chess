"use client";

import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square } from "chess.js";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function ChessboardComponent() {
  const t = useTranslations("Chessboard");
  const [game, setGame] = useState(new Chess());
  const [moveOptions, setMoveOptions] = useState({});
  const [selectedPiece, setSelectedPiece] = useState<{ type: string; square: string } | null>(null);

  function onDrop(sourceSquare: string, targetSquare: string) {
    const gameCopy = new Chess(game.fen());
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) {
      return false;
    }

    setGame(gameCopy);
    setMoveOptions({});
    setSelectedPiece(null);
    return true;
  }

  function onSquareClick(square: Square) {
    const piece = game.get(square);

    if (!piece || (selectedPiece && selectedPiece.square === square)) {
      setMoveOptions({});
      setSelectedPiece(null);
      return;
    }

    const moves = game.moves({ square, verbose: true });
    const options: { [key: string]: any } = {};
    moves.forEach((move) => {
      options[move.to] = {
        background: "rgba(0, 255, 0, 0.4)",
        borderRadius: "50%",
      };
    });
    setMoveOptions(options);
    setSelectedPiece({ type: piece.type, square });
  }

  return (
    <div>
      <Chessboard
        id="Chessboard"
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        customSquareStyles={moveOptions}
      />
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#34495e', borderRadius: '8px', width: '400px' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h3>
              {t("pieceOn", {
                pieceName: t(`pieceNames.${selectedPiece.type}`),
                square: selectedPiece.square,
              })}
            </h3>
            <p>{t(`pieceDescriptions.${selectedPiece.type}`)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
