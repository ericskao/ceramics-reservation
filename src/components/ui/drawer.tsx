import { cn } from "@/lib/utils";
import * as RadixDialog from "@radix-ui/react-dialog";

const Drawer = ({
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
            "bg-white rounded-lg fixed shadow animate-content-show overflow-y-auto",
            classNames?.content,
          )}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Drawer;
