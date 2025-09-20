import React from "react";

const PageDown: React.FC = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-down" title="เลื่อนลง">
      <button
        className="fab-btn page-down-btn"
        type="button"
        onClick={scrollToBottom}
      >
        <i className="fas fa-arrow-down" aria-hidden="true" />
        <span className="sr-only">เลื่อนลง</span>
      </button>
    </div>
  );
};

export default PageDown;
