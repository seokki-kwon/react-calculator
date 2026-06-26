interface Props {
  value: string
}

export default function DescriptionPanel({value}: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="">
        <p className="mt-2 text-slate-500 left">
          {value}
        </p>
      </div>
    </div>
  );
}