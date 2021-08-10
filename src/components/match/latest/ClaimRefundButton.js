import { gql, useApolloClient } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useOnChainContext } from "../../../providers/OnChainProvider";
import {
  useTournamentContract,
  useWallet,
} from "../../../providers/WalletProvider";
import { isRejectedByUser } from "../../../web3";

function ClaimRefundButton({ match, refund }) {
  const [loading, setLoading] = useState(false);
  const { account } = useWallet();
  const web3Tournament = useTournamentContract();
  const { notify, notifyNewTransaction, notifyTransactionStatus } =
    useOnChainContext();
  const apolloClient = useApolloClient();
  const updateOptimisticResponse = useCallback(
    (match, account, key) => {
      apolloClient.writeFragment({
        id: `Bet:${account?.toLowerCase()}-${match.id}`,
        fragment:
          key === "claimed"
            ? gql`
                fragment userBet on Bet {
                  claimed
                }
              `
            : gql`
                fragment userBet on Bet {
                  refunded
                }
              `,
        variables: { connectedUser: account },
        data: {
          [key]: true,
        },
      });
    },
    [apolloClient]
  );
  const handleClaim = useCallback(async () => {
    try {
      setLoading(true);

      await web3Tournament.methods
        .claim(match.id)
        .estimateGas({ from: account });
      const ethSend = web3Tournament.methods
        .claim(match.id)
        .send({ from: account });
      ethSend.on("transactionHash", (hash) =>
        notifyNewTransaction(
          `Claim requested for Match #${parseInt(match.id)}`,
          hash
        )
      );
      const tx = await ethSend;

      updateOptimisticResponse(match, account, "claimed");
      notifyTransactionStatus(
        `Claimed successfully for Match #${parseInt(match.id)}`,
        "success",
        tx.transactionHash
      );
    } catch (e) {
      console.log(e);
      !isRejectedByUser(e) &&
        notify(
          `Unable to claim rewards for Match #${parseInt(match.id)}`,
          "error"
        );
    }
    setLoading(false);
  }, [
    match,
    account,
    web3Tournament,
    setLoading,
    notify,
    notifyNewTransaction,
    notifyTransactionStatus,
    updateOptimisticResponse,
  ]);
  const handleRefund = useCallback(async () => {
    try {
      setLoading(true);
      await web3Tournament.methods
        .refund(match.id)
        .estimateGas({ from: account });
      const ethSend = web3Tournament.methods
        .refund(match.id)
        .send({ from: account });
      ethSend.on("transactionHash", (hash) =>
        notifyNewTransaction(
          `Refund requested for Match #${parseInt(match.id)}`,
          hash
        )
      );
      const tx = await ethSend;

      updateOptimisticResponse(match, account, "refunded");
      notifyTransactionStatus(
        `Refunded successfully for Match #${parseInt(match.id)}`,
        "success",
        tx.transactionHash
      );
    } catch (e) {
      console.log(e);
      notify(`Unable to refund for Match #${parseInt(match.id)}`, "error");
    }
    setLoading(false);
  }, [
    match,
    account,
    web3Tournament,
    setLoading,
    notify,
    notifyNewTransaction,
    notifyTransactionStatus,
    updateOptimisticResponse,
  ]);

  return (
    <label
      className="crycto-card--cta f-drop-shadow"
      onClick={refund ? handleRefund : handleClaim}
    >
      {loading ? <Spinner /> : refund ? "Refund " : "Claim"}
    </label>
  );
}

const Spinner = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      color: "white",
    }}
  >
    <CircularProgress size="1.5rem" color="inherit" />
  </div>
);

export default ClaimRefundButton;
