import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPagesB10, type WeeklyAggregationPageB10Key } from "@/config/weeklyAggregationPagesB10";

const WeeklyAggregationPageB10 = ({ pageKey }: { pageKey: WeeklyAggregationPageB10Key }) => {
  const page = weeklyAggregationPagesB10[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPageB10;
