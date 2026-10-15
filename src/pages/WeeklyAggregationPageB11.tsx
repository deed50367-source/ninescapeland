import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPagesB11, type WeeklyAggregationPageB11Key } from "@/config/weeklyAggregationPagesB11";

const WeeklyAggregationPageB11 = ({ pageKey }: { pageKey: WeeklyAggregationPageB11Key }) => {
  const page = weeklyAggregationPagesB11[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPageB11;
