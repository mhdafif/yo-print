interface FloatingBackButtonProps {
  onBack: () => void;
}

export function FloatingBackButton({ onBack }: FloatingBackButtonProps) {
  return (
    <div
      onClick={onBack}
      className="fixed top-4 left-4 w-10 h-10 bg-slate-600 text-white rounded-md shadow-lg hover:bg-slate-700 transition-all duration-300 z-50 flex items-center justify-center md:hidden cursor-pointer"
      aria-label="Back to Search"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
  );
}
