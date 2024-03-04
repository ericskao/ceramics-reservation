import { useMutation } from "react-query";

async function simulateDelayAsync() {
  await new Promise((resolve) => {
    console.log("starting timeout");
    setTimeout(() => {
      console.log("finished timeout");
      resolve(true);
    }, 4000);
  });
}

export const useLogin = () => {
  const {
    mutate: login,
    isLoading,
    isSuccess,
    error,
  } = useMutation(
    async (phoneNumber: string) => {
      await simulateDelayAsync();
    },
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log("error!", error);
      },
    },
  );
  return {
    login,
    isLoading,
    loginSuccess: isSuccess,
    error,
  };
};
