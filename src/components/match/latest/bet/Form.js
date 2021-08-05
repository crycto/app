import { gql, useApolloClient } from "@apollo/client";
import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useTournament } from "../../../../providers/TournamentProvider";
import {
  useTournamentContract,
  useWallet,
} from "../../../../providers/WalletProvider";
import { moralisWeb3 } from "../../../../web3";

import CryptoInput from "./CryptoInput";
import ScoreInput from "./ScoreInput";
import SubmitButton from "./SubmitButton";

const fragment = gql`
  fragment matchBets on Match {
    totalBets
    totalAmount
    bets(where: { sender: $connectedUser }) {
      id
      score
      amount
      claimed
      refunded
    }
  }
`;

function Form({ match, onClose }) {
  const { connect, account, balance = 0 } = useWallet();
  const { minBetAmount = 0 } = useTournament();
  const web3Tournament = useTournamentContract();
  const apolloClient = useApolloClient();

  const [validBet, setValidBet] = useState(false);
  const [bet, setBet] = useState({
    score: match.placeHolderScore,
    amount: 0,
    rawAmount: 0,
    rawInput: "0.00",
  });
  const [submitting, setSubmitting] = useState(false);
  const setScore = useCallback(
    (score) => {
      setBet((b) => ({ ...b, score }));
    },
    [setBet]
  );
  const setAmount = useCallback(
    ({ percentage, rawInput }) => {
      if (rawInput !== undefined) {
        if (isNaN(rawInput) || rawInput.trim().length === 0) {
          setBet((b) => ({
            ...b,
            rawInput,
          }));
          return;
        }
        let amount = Math.min(parseFloat(rawInput), balance);
        setBet((b) => ({
          ...b,
          percentage:
            balance > 0 ? parseFloat((amount * 1e2) / balance).toFixed(2) : 0,
          amount,
          rawAmount: moralisWeb3.utils.toWei(rawInput + ""),
          rawInput,
        }));
      }

      if (percentage !== undefined) {
        setBet((b) => ({
          ...b,
          percentage,
          amount: parseFloat((balance * percentage) / 1e2).toFixed(2),
          rawAmount: moralisWeb3.utils.toWei(
            parseFloat((balance * percentage) / 1e2) + ""
          ),
          rawInput: parseFloat((balance * percentage) / 1e2).toFixed(3),
        }));
      }
    },
    [setBet, balance]
  );
  useEffect(() => {
    setValidBet(
      bet.score >= match.minScore &&
        bet.score % match.scoreMultiple === 0 &&
        bet.amount >= minBetAmount
    );
  }, [bet, match, minBetAmount]);

  const updateOptimisticResponse = useCallback(
    (match, bet, account) => {
      const newBetObject = {
        id: `${account}-${match.id}`,
        score: bet.score,
        amount: bet.rawInput,
        claimed: false,
        refunded: false,
        __typename: "Bet",
      };
      const cachedMatch = apolloClient.readFragment({
        id: `Match:${match.id}`,
        fragment,
        variables: { connectedUser: account },
      });
      apolloClient.writeFragment({
        id: `Match:${match.id}`,
        fragment,
        variables: { connectedUser: account },
        data: {
          bets: [newBetObject],
          totalBets: +cachedMatch.totalBets + 1,
          totalAmount:
            parseFloat(cachedMatch.totalAmount) + parseFloat(bet.rawInput),
        },
      });
    },
    [apolloClient]
  );

  const placeBet = useCallback(async () => {
    try {
      setSubmitting(true);
      await web3Tournament.methods
        .betScore(match.id, bet.score)
        .send({ from: account, value: bet.rawAmount });
      updateOptimisticResponse(match, bet, account);
      onClose();
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  }, [web3Tournament, account, bet, match, updateOptimisticResponse, onClose]);

  return (
    <div className="crycto-card--blk-back">
      <p class="crycto-contest--text mb20">{match.contestDescription}</p>
      <ScoreInput
        minScore={match.minScore}
        scoreMultiple={match.scoreMultiple}
        value={bet.score}
        onChange={setScore}
      />
      <CryptoInput bet={bet} onChange={setAmount} />
      <SubmitButton
        account={account}
        connect={connect}
        valid={validBet}
        onSubmit={placeBet}
      />
      {submitting && (
        <Backdrop open appear style={{ zIndex: 9999999, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Form;
