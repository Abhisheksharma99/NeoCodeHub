'use client'
export const Button = (props: {
    type?: "submit" | "reset" | "button" | undefined;
  text: string;
  btnClass?: string;
  disabled?: boolean;
}) => {
  return (
    <div>
      <button
      type={props.type}
      disabled ={props.disabled}

        className={`${props.disabled ? 'bg-gray-400 cursor-not-allowed' : ''} shining-button px-6 py-2 text-white bg-black font-bold transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full flex items-center ${props.btnClass}`}
      >
        <span className='whitespace-nowrap'>{props.text}</span>
      </button>
    </div>
  );
};
