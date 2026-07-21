function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        px-5
        py-3
        rounded-2xl
        font-medium
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${styles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;