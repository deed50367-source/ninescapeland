import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPagesB8, type WeeklyAggregationPageB8Key } from "@/config/weeklyAggregationPagesB8";

interface WeeklyAggregationPageB8Props {
  pageKey: WeeklyAggregationPageB8Key;
}

const WeeklyAggregationPageB8 = ({ pageKey }: WeeklyAggregationPageB8Props) => {
  const page = weeklyAggregationPagesB8[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPageB8;
