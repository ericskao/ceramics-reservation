import * as RadixAvatar from "@radix-ui/react-avatar";

const Avatar = () => {
  return (
    <>
      <RadixAvatar.Root className="AvatarRoot inline-flex justify-center items-center align-middle w-11 h-11 rounded-full overflow-hidden border-2 border-solid border-gray-200">
        <RadixAvatar.Image
          className="AvatarImage object-cover w-full h-full"
          src=""
          alt="Colm Tuite"
        />
        <RadixAvatar.Fallback
          className="AvatarFallback bg-slate-300 p-3"
          delayMs={600}
        >
          CT
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    </>
  );
};

export default Avatar;
