import React, { FC } from "react";

interface IButtonLoading {
  loading?: boolean;
  name?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ButtonLoading: FC<IButtonLoading> = ({
  loading = false,
  name = "button",
  className = "btn btn-primary",
  onClick,
  disabled,
}) => {
  return (
    <>
      <button
        className={className}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {loading && !disabled && (
          <span
            className="spinner-border spinner-border-sm me-2"
            role="status"
          />
        )}
        {name}
      </button>
    </>
  );
};
