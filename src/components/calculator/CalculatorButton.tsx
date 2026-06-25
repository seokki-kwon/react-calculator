type Props = {
  label: string;
  onClick?: () => void;
};

export default function CalculatorButton({
  label,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        h-16
        rounded-xl
        border
        border-slate-200
        bg-white
        text-xl
        font-medium
        transition
        hover:bg-slate-100
        active:scale-95
      "
    >
      {label}
    </button>
  );
}