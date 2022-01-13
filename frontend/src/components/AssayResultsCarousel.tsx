import { useState } from "react";
import { HollowButton } from "./Buttons";
import { positiveModulus } from "../utils";

export interface AssayResult {
  compound_id: number;
  result_id: number;
  target: string;
  result: string;
  operator: string;
  value: number;
  unit: string;
}

const AssayResultInfo = ({ assayResult }: { assayResult: AssayResult }) => (
  <div className="text-left w-full">
    <ul className="space-y-3">
      <li>
        <b>Result ID:</b>
        <br />
        {assayResult.result_id}
      </li>
      <li>
        <b>Target:</b>
        <br />
        {assayResult.target}
      </li>
      <li>
        <b>Result:</b>
        <br />
        {assayResult.result}
      </li>
      <li>
        <b>Operator:</b>
        <br />
        {assayResult.operator}
      </li>
      <li>
        <b>Value:</b>
        <br />
        {assayResult.value}
      </li>
      <li>
        <b>Unit:</b>
        <br />
        {assayResult.unit}
      </li>
    </ul>
  </div>
);

export const AssayResultsCarousel = ({
  assayResultsDetails,
}: {
  assayResultsDetails: Array<AssayResult>;
}) => {
  const [currentAssayResultIdx, setCurrentAssayResultIdx] = useState(0);

  const numResults = assayResultsDetails.length;

  return (
    <>
      <div className="mb-3">
        <h2 className="font-bold text-xl">Assay results</h2>
      </div>
      <div className="border-2 border-white rounded-md w-full p-8">
        {assayResultsDetails.length === 0 ? (
          <>None found</>
        ) : (
          <>
            <AssayResultInfo
              assayResult={assayResultsDetails[currentAssayResultIdx]}
              key={assayResultsDetails[currentAssayResultIdx].result_id}
            />
            <div className="flex flex-row justify-between items-center w-full pt-8">
              <HollowButton
                text="Prev"
                onClick={() =>
                  setCurrentAssayResultIdx((currentAssayResultIdx) =>
                    positiveModulus(currentAssayResultIdx - 1, numResults)
                  )
                }
              />
              <b>
                {currentAssayResultIdx + 1} of {numResults}
              </b>
              <HollowButton
                text="Next"
                onClick={() =>
                  setCurrentAssayResultIdx((currentAssayResultIdx) =>
                    positiveModulus(currentAssayResultIdx + 1, numResults)
                  )
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
