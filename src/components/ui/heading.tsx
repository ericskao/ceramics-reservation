import { cn } from "@/lib/utils";

type HeadingElements = "h1" | "h2" | "h3" | "h4";

const Heading = ({
  children,
  as,
  className = "",
}: {
  children: React.ReactNode;
  as: HeadingElements;
  className?: string;
}) => {
  switch (as) {
    case "h1":
      return (
        <h1
          className={cn(
            "scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl",
            className,
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={cn(
            "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
            className,
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={cn(
            "scroll-m-20 text-2xl font-semibold tracking-tight",
            className,
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {children}
        </h4>
      );
    default:
      return (
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {children}
        </h1>
      );
  }
};

export default Heading;
