import { cn } from "@/lib/utils";
import * as RadixDialog from "@radix-ui/react-dialog";

const Dialog = ({
  trigger,
  children,
  classNames,
}: {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  classNames?: {
    content?: string;
  };
}) => {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black/40 fixed inset-0 animate-overlay-show" />
        <RadixDialog.Content
          className={cn(
            "bg-white rounded-lg fixed shadow animate-dialog-content-show overflow-y-auto top-[58.5%] left-1/2 -translate-x-1/2 -translate-y-1/2",
            classNames?.content,
          )}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
