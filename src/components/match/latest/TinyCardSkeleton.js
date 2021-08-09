import React from "react";

function TinyCardSkeleton() {
  return (
    <div
      className={`crycto-card--blk _small`}
      style={{
        height: "28rem",
        background: "linear-gradient(45deg, #ae8f53, #bb8110)",
      }}
    >
      <div className="crycto-card--blk--visible"></div>
    </div>
  );
}

export default TinyCardSkeleton;
