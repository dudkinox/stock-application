import React from "react";

const PageUp: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page-up" title="เลื่อนขึ้น">
      <button
        className="fab-btn page-up-btn"
        type="button"
        onClick={scrollToTop}
      >
        <i className="fas fa-arrow-up" aria-hidden="true" />
        <span className="sr-only">เลื่อนขึ้น</span>
      </button>
    </div>
  );
};

export default PageUp;
