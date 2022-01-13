export const HollowButton = ({
  text,
  onClick = () => {},
}: {
  text: string;
  onClick?: () => void;
}) => (
  <div
    className="h-10 w-20 min-w-[5rem] rounded-full border-2 border-white cursor-pointer flex justify-center items-center pb-1 font-bold transition select-none hover:bg-white hover:text-slate-800 active:bg-blue-400 active:border-blue-400"
    onClick={onClick}
  >
    {text}
  </div>
);
