import React, { useEffect, useRef } from "react";

const isThresholdReached = (x, y, z) => x * 1.75 + y >= z;
function InfiniteScroll({
  children,
  loadMore,
  onLoadMore,
  horizontal,
  className,
}) {
  const scrollRef = useRef();

  useEffect(() => {
    if (!loadMore) {
      return;
    }
    const onScroll = (e) => {
      loadMore &&
        (horizontal
          ? isThresholdReached(
              e.target.clientWidth,
              e.target.scrollLeft,
              e.target.scrollWidth
            )
          : isThresholdReached(
              e.target.clientHeight,
              e.target.scrollTop,
              e.target.scrollHeight
            )) &&
        onLoadMore();
    };
    const ele = horizontal
      ? scrollRef.current
      : document.getElementsByTagName("body")[0];
    ele.addEventListener("scroll", onScroll);
    return () => ele.removeEventListener("scroll", onScroll);
  }, [scrollRef, horizontal, loadMore, onLoadMore]);
  return horizontal ? (
    <ul ref={scrollRef} className={`crycto-instruction ${className}`}>
      {children}
    </ul>
  ) : (
    <div ref={scrollRef} className={`crycto-instruction ${className}`}>
      {children}
    </div>
  );
}

export default InfiniteScroll;
