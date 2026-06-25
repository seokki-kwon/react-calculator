type Props = {
  value: string;
};

export default function CalculatorDisplay({ value }: Props) {
  return (
    <div className="flex h-24 items-center justify-end rounded-xl bg-slate-900 px-6">
      <span className="text-4xl font-semibold text-white">
        {value || "0"}
      </span>
    </div>
  );
}