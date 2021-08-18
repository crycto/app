import React, { useState, useCallback } from "react";
import firebase from "firebase";
import { firestore } from "../../firebase";
import { moralisWeb3 } from "../../web3";
import Spinner from "./Spinner";
import localStorage from "../../localstorage";

const ref = firestore.collection("earlysupport");

function EarlySupport() {
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    localStorage.get("crycto-v1-early-supporter") === "true"
  );
  const [error, setError] = useState();
  const handleChange = useCallback(
    ({ target: { value } }) => setAddress(value),
    [setAddress]
  );
  const handleSumbit = useCallback(async () => {
    setError();
    try {
      if (isSubmitted || address.trim().length === 0) {
        return;
      }
      if (!moralisWeb3.utils.isAddress(address)) {
        setError("Provide a valid ethereum address");
        return;
      }
      setIsSubmitting(true);
      await ref.doc(address).set({
        address,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setIsSubmitted(true);
      localStorage.set("crycto-v1-early-supporter", true);
    } catch (e) {
      setError("Try again after sometime !");
      console.log(e);
    }
    setIsSubmitting(false);
  }, [address, isSubmitted]);
  return (
    <section className="crycto-early-section">
      <span className="crycto-early-section-content">
        Show us your early support and get a chance to win <b>5 MATIC</b> to get
        you started with once we go live
      </span>
      {!isSubmitted && (
        <input
          className="crycto-early-section-input"
          type="text"
          placeholder="Paste your wallet address here..."
          spellcheck="false"
          value={address}
          onChange={handleChange}
        />
      )}
      <div
        className={`crycto-early-section-submit ${isSubmitting && "active"} ${
          isSubmitted && "success checkmark-animation"
        } `}
        onClick={handleSumbit}
      >
        {isSubmitted ? (
          <>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 130.2 130.2"
            >
              <circle
                class="path circle"
                fill="none"
                stroke="teal"
                stroke-width="6"
                stroke-miterlimit="10"
                cx="65.1"
                cy="65.1"
                r="62.1"
              />
              <polyline
                class="path check"
                fill="none"
                stroke="teal"
                stroke-width="6"
                stroke-linecap="round"
                stroke-miterlimit="10"
                points="100.2,40.2 51.5,88.8 29.8,67.5 "
              />
            </svg>
            <span>Thank you for your support&nbsp;!</span>
            {/* <InsertEmoticonIcon
              fontSize="inherit"
              color="white"
              // className="crycto-early-section-success"
            />
           */}
          </>
        ) : isSubmitting ? (
          <Spinner />
        ) : (
          "Submit"
        )}
      </div>

      {error && (
        <div className="crycto-early-section-submit-error">{error}</div>
      )}
    </section>
  );
}

export default EarlySupport;
