import { AssayResult, AssayResultsCarousel } from "./AssayResultsCarousel";
import { HollowButton } from "./Buttons";

export interface Compound {
  compound_id: number;
  smiles: string;
  molecular_weight: number;
  ALogP: number;
  molecular_formula: string;
  num_rings: number;
  image: string;
  assay_results_details: Array<AssayResult>;
}

const CompoundDetails = ({ compound }: { compound: Compound }) => (
  <div className="w-full flex flex-col items-center mb-10">
    <img
      src={compound.image}
      alt={`Compound ${compound.compound_id}`}
      className="mb-8 rounded-xl w-10/12 max-w-[14rem]"
    />
    <div className="text-left w-full">
      <ul className="space-y-3">
        <li>
          <b>Compound ID:</b>
          <br />
          {compound.compound_id}
        </li>
        <li className="break-words">
          <b>Smiles:</b>
          <br />
          {compound.smiles}
        </li>
        <li>
          <b>Molecular_weight:</b>
          <br />
          {compound.molecular_weight}
        </li>
        <li>
          <b>ALogP:</b>
          <br />
          {compound.ALogP}
        </li>
        <li>
          <b>Molecular formula:</b>
          <br />
          {compound.molecular_formula}
        </li>
        <li>
          <b>Number of rings:</b>
          <br />
          {compound.num_rings}
        </li>
      </ul>
    </div>
  </div>
);

export const CompoundInfo = ({
  compound,
  currentCompoundId,
  numCompounds,
  updateCompoundId,
}: {
  compound: Compound;
  currentCompoundId: number;
  numCompounds: number;
  updateCompoundId: (delta: number) => void;
}) => (
  <div
    className={`flex flex-col justify-center items-center w-11/12 max-w-2xl transition duration-200 delay-75 border-t-2 pt-8 mb-20 ${
      compound ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`}
  >
    {compound ? (
      <>
        <div className="flex flex-row justify-between items-center w-full pb-8">
          <HollowButton text="Prev" onClick={() => updateCompoundId(-1)} />
          <b>
            {currentCompoundId + 1} of {numCompounds}
          </b>
          <HollowButton text="Next" onClick={() => updateCompoundId(+1)} />
        </div>
        <CompoundDetails compound={compound} />
        <AssayResultsCarousel assayResultsDetails={compound.assay_results_details} />
      </>
    ) : (
      <></>
    )}
  </div>
);
