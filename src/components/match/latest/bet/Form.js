import { gql, useApolloClient } from "@apollo/client";
import { Backdrop, CircularProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useOnChainContext } from "../../../../providers/OnChainProvider";
import { useTournament } from "../../../../providers/TournamentProvider";
import {
  useTournamentContract,
  useWallet,
} from "../../../../providers/WalletProvider";
import {
  isRejectedByUser,
  moralisWeb3,
  parseErrorMessage,
} from "../../../../web3";
import localStorage from "../../../../localstorage";
import CryptoInput from "./CryptoInput";
import ScoreInput from "./ScoreInput";
import SubmitButton from "./SubmitButton";

import ActionButton from "../labs/ActionButton";

// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBack";

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
  const {
    connect,
    account,
    weiBalance = new moralisWeb3.utils.BN("0"),
  } = useWallet();
  const { notifyNewTransaction, notifyTransactionStatus } = useOnChainContext();
  const { minBetAmount = 0 } = useTournament();
  const web3Tournament = useTournamentContract();
  const apolloClient = useApolloClient();

  const [validBet, setValidBet] = useState(false);
  const [bet, setBet] = useState({
    score: match.matchDetails.placeHolderScore,
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
      try {
        if (rawInput !== undefined) {
          if (isNaN(rawInput) || rawInput.trim().length === 0) {
            setBet((b) => ({
              ...b,
              rawInput,
            }));
            return;
          }

          let amount = parseFloat(rawInput);

          setBet((b) => ({
            ...b,
            percentage:
              weiBalance > 0
                ? parseFloat(
                    moralisWeb3.utils
                      .toBN(moralisWeb3.utils.toWei(amount + ""))
                      .mul(moralisWeb3.utils.toBN("100"))
                      .div(weiBalance)
                      .toString()
                  ).toFixed(2)
                : 0,
            amount,
            rawAmount: moralisWeb3.utils.toWei(rawInput + ""),
            rawInput,
          }));
        }

        if (percentage !== undefined) {
          setBet((b) => ({
            ...b,
            percentage,
            amount: parseFloat(
              weiBalance
                .mul(moralisWeb3.utils.toBN(percentage))
                .div(moralisWeb3.utils.toBN("100"))
                .toString() / 1e18
            ).toFixed(2),
            rawAmount: weiBalance
              .mul(moralisWeb3.utils.toBN(percentage))
              .div(moralisWeb3.utils.toBN("100")),
            rawInput: parseFloat(
              weiBalance
                .mul(moralisWeb3.utils.toBN(percentage))
                .div(moralisWeb3.utils.toBN("100"))
                .toString() / 1e18
            ).toFixed(3),
          }));
        }
      } catch (e) {
        console.log(e);
      }
    },
    [setBet, weiBalance]
  );
  useEffect(() => {
    setValidBet(
      bet.score >= match.minScore &&
        bet.score % match.scoreMultiple === 0 &&
        bet.amount >= minBetAmount &&
        moralisWeb3.utils.toBN(bet.rawAmount ?? "0").lte(weiBalance)
    );
  }, [bet, match, minBetAmount, weiBalance]);

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
        .estimateGas({ from: account, value: bet.rawAmount });
      const ethSend = web3Tournament.methods
        .betScore(match.id, bet.score)
        .send({ from: account, value: bet.rawAmount });
      ethSend.on("transactionHash", (hash) =>
        notifyNewTransaction(
          `Transaction submitted for Match #${parseInt(match.id)}`,
          hash
        )
      );
      const tx = await ethSend;
      updateOptimisticResponse(match, bet, account);
      onClose();

      if (tx.status === false) {
        notifyTransactionStatus(
          `Failed to place bet for Match #${parseInt(match.id)}`,
          "error",
          tx.transactionHash
        );
      } else {
        notifyTransactionStatus(
          `Placed bet for Match #${parseInt(match.id)}`,
          "success",
          tx.transactionHash
        );
      }
      localStorage.set("crycto-hide-new-user-banner", true);
    } catch (e) {
      !isRejectedByUser(e) &&
        notifyTransactionStatus(
          parseErrorMessage(e)?.indexOf("DEADLINE_PASSED") !== -1
            ? `Aw snap! Bets closed for Match #${parseInt(match.id)}`
            : `Failed to place bet for Match #${parseInt(match.id)}`,
          "error",
          e?.hash
        );
      console.error(e);
    }
    setSubmitting(false);
  }, [
    web3Tournament,
    account,
    bet,
    match,
    notifyNewTransaction,
    notifyTransactionStatus,
    updateOptimisticResponse,
    onClose,
  ]);

  return (
    <div className="crycto-card--blk-back bet-screen">
      <ArrowBackIosIcon className="back-icon" onClick={onClose} />
      <div className="crycto-card-top-container">
        <div>
          <span>#{parseInt(match.id)}</span>
        </div>
        <div>
          <span>
            #{`${match.matchDetails.team1}vs${match.matchDetails.team2}`}
          </span>
        </div>
        <div>
          <span>#{match.matchDetails.venue}</span>
        </div>
      </div>

      <ScoreInput
        matchDescription={match.matchDetails.matchDescription}
        minScore={match.minScore}
        scoreMultiple={match.scoreMultiple}
        value={bet.score}
        onChange={setScore}
      />
      <div className="crycto-card--maincontent bottom-container">
        <CryptoInput bet={bet} onChange={setAmount} />

        <SubmitButton
          account={account}
          connect={connect}
          valid={validBet}
          insufficientBalance={moralisWeb3.utils
            .toBN(bet.rawAmount ?? "0")
            .gt(weiBalance)}
          onSubmit={placeBet}
        />
      </div>
      {submitting && (
        <Backdrop open appear style={{ zIndex: 9999999, color: "#fff" }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

export default Form;
