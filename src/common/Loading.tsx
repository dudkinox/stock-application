import LoadingGift from "../assets/loading.gif";

export default function LoadingCommon() {
  return (
    <>
      <div className="gif">
        <img src={LoadingGift} alt="กำลังโหลด" />
      </div>
      <div className="loading"></div>
    </>
  );
}
