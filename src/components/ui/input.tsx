"use client";

import { cn } from "@/lib/utils";
import * as RadixLabel from "@radix-ui/react-label";
import { ChangeEventHandler, KeyboardEventHandler, useRef } from "react";

const Input = ({
  id,
  defaultValue,
  labelText,
  inputPlaceholder,
  className,
  autoFocus,
  inputType = "text",
  inputRequired,
  maxLength,
  value,
  onInputChange,
  onKeyDown,
}: {
  autoFocus?: boolean;
  labelText?: string;
  className?: { root?: string; input?: string };
  id?: string;
  defaultValue?: string;
  inputPlaceholder?: string;
  children?: React.ReactNode;
  inputType?: "text" | "textarea" | "number";
  inputRequired?: boolean;
  maxLength?: number;
  value?: string | number;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  onInputChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={cn(
        "shadow-inner-secondary flex flex-col-reverse rounded-lg px-3 py-2 focus-within:shadow-inner-focused",
        className?.root,
      )}
    >
      {(inputType === "text" || inputType === "number") && (
        <input
          ref={inputRef}
          maxLength={maxLength}
          className={cn("outline-none peer", className?.input)}
          id={id}
          autoFocus={autoFocus}
          type={inputType}
          defaultValue={defaultValue}
          placeholder={inputPlaceholder}
          required={inputRequired}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      )}
      {inputType === "textarea" && (
        <textarea
          onChange={onInputChange}
          className={cn("outline-none peer", className?.input)}
          id={id}
        />
      )}
      <RadixLabel.Root
        className={cn(
          "text-secondary-text leading-3 translate-y-3 peer-focus:scale-75 peer-focus:translate-y-0.5  origin-top-left transition-all cursor-text",
          { "scale-75 translate-y-0.5": value !== "" },
        )}
        htmlFor={id}
        onClick={() => {
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        {labelText}
      </RadixLabel.Root>
    </div>
  );
};

export { Input };
