import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPagesB9, type WeeklyAggregationPageB9Key } from "@/config/weeklyAggregationPagesB9";

const WeeklyAggregationPageB9 = ({ pageKey }: { pageKey: WeeklyAggregationPageB9Key }) => {
  const page = weeklyAggregationPagesB9[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPageB9;
