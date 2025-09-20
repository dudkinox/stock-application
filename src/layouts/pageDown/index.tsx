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
        className="page-down-btn"
        onClick={scrollToBottom}
        title="เลื่อนลง"
        type="button"
      >
        <i className="fas fa-arrow-down" aria-hidden="true" />
        <span className="sr-only">เลื่อนลง</span>
      </button>
    </div>
  );
};

export default PageDown;
