import axios from "axios";
import { useEffect, useState } from "react";
import { Compound, CompoundInfo } from "./CompoundInfo";

import { BACKEND_URL } from "../constants";
import { positiveModulus } from "../utils";

export const CompoundDashboard = () => {
  const [compoundsData, setCompoundsData] = useState<Array<Compound>>([]);
  const [currentCompoundId, setCurrentCompoundId] = useState(0);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await axios.get(`${BACKEND_URL}/compounds`);
      const responseCompoundsData: Array<Compound> = response.data;
      setCompoundsData(responseCompoundsData);
    };
    getInitialData();
  }, []);

  const updateCompoundId = (delta: number) => {
    const numCompounds = compoundsData.length;
    setCurrentCompoundId((currentCompoundId) =>
      positiveModulus(currentCompoundId + delta, numCompounds)
    );
  };

  const currentCompound = compoundsData[currentCompoundId];

  return (
    <div className="bg-slate-800 w-full min-h-screen flex flex-col items-center text-white text-center">
      <h1 className="text-3xl font-bold py-8">Compounds dashboard</h1>
      <CompoundInfo
        compound={currentCompound}
        currentCompoundId={currentCompoundId}
        numCompounds={compoundsData.length}
        updateCompoundId={updateCompoundId}
      />
    </div>
  );
};
