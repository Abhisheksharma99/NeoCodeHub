'use client'

export const Button = (props: {
  type?: "submit" | "reset" | "button" | undefined;
  text: string;
  btnClass?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
}) => {
  return (
    <div>
      <button
        type={props.type}
        disabled={props.disabled}
        onClick={props.onClick}
        aria-label={props.ariaLabel}
        aria-busy={props.disabled && props.type === 'submit' ? true : undefined}
        className={`${
          props.disabled
            ? "bg-neutral-300 cursor-not-allowed text-neutral-500"
            : "bg-neutral-900 hover:bg-neutral-800"
        } shining-button px-7 py-3 text-white font-heading font-semibold tracking-tight transition-all duration-300 ease-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded-full flex items-center gap-2 text-sm ${
          props.btnClass
        }`}
      >
        <span className="whitespace-nowrap">{props.text}</span>
      </button>
    </div>
  );
};
