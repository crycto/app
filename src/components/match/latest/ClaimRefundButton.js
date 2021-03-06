import { gql, useApolloClient } from "@apollo/client";
import Spinner from "../../utils/Spinner";
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
          `Claim requested for Round #${parseInt(match.id)}`,
          hash
        )
      );
      const tx = await ethSend;

      updateOptimisticResponse(match, account, "claimed");
      notifyTransactionStatus(
        `Claimed successfully for Round #${parseInt(match.id)}`,
        "success",
        tx.transactionHash
      );
    } catch (e) {
      console.log(e);
      !isRejectedByUser(e) &&
        notify(
          `Unable to claim rewards for Round #${parseInt(match.id)}`,
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
          `Refund requested for Round #${parseInt(match.id)}`,
          hash
        )
      );
      const tx = await ethSend;

      updateOptimisticResponse(match, account, "refunded");
      notifyTransactionStatus(
        `Refunded successfully for Round #${parseInt(match.id)}`,
        "success",
        tx.transactionHash
      );
    } catch (e) {
      console.log(e);
      !isRejectedByUser(e) &&
        notify(`Unable to refund for Round #${parseInt(match.id)}`, "error");
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
    <div
      className={`action-button ${refund ? "_refund" : "_claim"}`}
      onClick={refund ? handleRefund : handleClaim}
    >
      <span className={`${loading && "active"}`}>
        {loading ? <Spinner /> : refund ? "Refund " : "Claim"}
      </span>
    </div>
  );
}

export default ClaimRefundButton;
