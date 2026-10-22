import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPagesB12, type WeeklyAggregationPageB12Key } from "@/config/weeklyAggregationPagesB12";

const WeeklyAggregationPageB12 = ({ pageKey }: { pageKey: WeeklyAggregationPageB12Key }) => {
  const page = weeklyAggregationPagesB12[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPageB12;
