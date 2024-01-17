import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./insights.css";

export const Insights = () => {
  const { genererte, nedlastninger, generertMedBilde, isLoading } =
    useFetchInsights();
  return (
    <>
      <div className="insights-container">
        <h2>Statistikk</h2>
        <div className="insights-sliding-text">
          <span>Genererte QR koder: {isLoading ? "⏳" : genererte} </span>
          <span>Nedlastninger: {isLoading ? "⏳" : nedlastninger}</span>
          <span>
            Unike genereringer med bilde: {isLoading ? "⏳" : generertMedBilde}
          </span>
        </div>
      </div>
    </>
  );
};

const useFetchInsights = (): UseFetchInsights => {
  const query = useQuery<Insights>({
    queryKey: ["insights"],
    queryFn: async () => getInsights(),
  });
  return {
    genererte: query.data?.generated || 0,
    nedlastninger: query.data?.downloads || 0,
    generertMedBilde: query.data?.addedLogo || 0,
    isLoading: query.isLoading,
  };
};

const getInsights = async (): Promise<Insights> => {
  const insightsQuery = doc(db, "qr-kode", "insights");
  const insightsSnapshot = await getDoc(insightsQuery);
  const insights = insightsSnapshot.data() as Insights;
  return insights;
};

interface UseFetchInsights {
  genererte: number;
  nedlastninger: number;
  generertMedBilde: number;
  isLoading: boolean;
}

interface Insights {
  generated: number;
  downloads: number;
  addedLogo: number;
}
