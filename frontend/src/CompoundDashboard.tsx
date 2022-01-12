import axios from "axios";
import { useEffect, useState } from "react";

import { BACKEND_URL } from "./constants";
import arrow from "./icons/arrow.svg";
import { positiveModulus } from "./utils";

interface AssayResult {
  compound_id: number;
  result_id: number;
  target: string;
  result: string;
  operator: string;
  value: number;
  unit: string;
}

interface Compound {
  compound_id: number;
  smiles: string;
  molecular_weight: number;
  ALogP: number;
  molecular_formula: string;
  num_rings: number;
  image: string;
  assay_results_details: Array<AssayResult>;
}

const Arrow = ({
  direction,
  onClick = () => {},
}: {
  direction: "left" | "right";
  onClick?: () => void;
}) => (
  <img
    className={`h-10 w-10 cursor-pointer ${direction === "left" ? "rotate-180" : ""}`}
    src={arrow}
    alt={`${direction} arrow`}
    onClick={onClick}
  />
);

const CompoundInfo = ({
  compound,
  updateCompoundId,
}: {
  compound: Compound;
  updateCompoundId: (delta: number) => void;
}) => {
  if (!compound) return <></>;

  return (
    <div className="flex flex-row justify-center items-center">
      <Arrow direction="left" onClick={() => updateCompoundId(-1)} />
      <div className="px-3">{compound.compound_id}</div>
      <Arrow direction="right" onClick={() => updateCompoundId(+1)} />
    </div>
  );
};

export const CompoundDashboard = () => {
  const [compoundsData, setCompoundsData] = useState<Array<Compound>>([]);
  const [currentCompoundId, setCurrentCompoundId] = useState(0);

  useEffect(() => {
    const getInitialData = async () => {
      const response = await axios.get(`${BACKEND_URL}/compounds`);
      const responseCompoundsData: Array<Compound> = response.data;
      console.log("responseCompoundsData", responseCompoundsData);
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
    <div className="bg-slate-800 w-full min-h-screen flex flex-col items-center text-white">
      <div>
        <h1 className="text-3xl font-bold py-10">Compounds dashboard</h1>
      </div>
      <CompoundInfo compound={currentCompound} updateCompoundId={updateCompoundId} />
    </div>
  );
};
