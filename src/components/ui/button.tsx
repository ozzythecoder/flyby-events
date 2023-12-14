"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const buttonClasses = cva(
  "p-2 min-w-[100px] inline-flex justify-around align-center",
  {
    variants: {
      intent: {
        primary: [
          "bg-primary-600",
          "text-text-100",
          "outline",
          "outline-background-transparent/30",
        ],
        secondary: [
          "bg-secondary-300",
          "text-text-900",
          "outline",
          "outline-background-transparent/30",
        ],
      },
      shape: {
        square: ["rounded-none"],
        rounded: ["rounded-md"],
      },
      text: {
        stylized: ["font-heading", "text-3xl"],
        plain: ["font-body", "text-2xl"],
      },
      hover: {
        static: [],
        highlight: ["hover:scale-[1.15] transition-all"],
      },
    },
    defaultVariants: {
      intent: "primary",
      text: "plain",
      shape: "rounded",
      hover: "static",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  intent,
  text,
  hover,
  className,
  ...props
}) => (
  <button
    role="button"
    className={cn(buttonClasses({ intent, text, hover }), className)}
    {...props}
  >
    {children}
  </button>
);

export interface ButtonAsLinkProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  className?: string;
  href: string;
}

export const ButtonAsLink: React.FC<ButtonAsLinkProps> = ({
  children,
  intent,
  text,
  hover,
  className,
  href,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      role="link"
      className={cn(buttonClasses({ intent, text, hover }), className)}
      onClick={() => router.push(href)}
      {...props}
    >
      {children}
    </button>
  );
};
