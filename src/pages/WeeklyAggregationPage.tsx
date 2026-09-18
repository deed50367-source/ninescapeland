import { StableSolutionPage } from "./StableSolutionPage";
import { weeklyAggregationPages, type WeeklyAggregationPageKey } from "@/config/weeklyAggregationPages";

interface WeeklyAggregationPageProps {
  pageKey: WeeklyAggregationPageKey;
}

const WeeklyAggregationPage = ({ pageKey }: WeeklyAggregationPageProps) => {
  const page = weeklyAggregationPages[pageKey];
  if (!page) return null;
  return <StableSolutionPage {...page} />;
};

export default WeeklyAggregationPage;
