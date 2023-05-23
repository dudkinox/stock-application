import HeaderPageCommon from "../../common/HeaderPageCommon";
import LoadingCommon from "../../common/Loading";
import ChartMainContent from "../../layouts/dashboard/ChartMainContent";
import HeaderMainContent from "../../layouts/dashboard/HeaderMainContent";

export default function Dashboard() {
  return (
    <div className="content-wrapper">
      <HeaderPageCommon title="สรุปผล" />
      <HeaderMainContent />
      <ChartMainContent />
    </div>
  );
}
