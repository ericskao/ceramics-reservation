interface GuestInterface {
  id: number;
  name: string;
  status: string;
}

export const useGuests = (id: string) => {
  const guests: GuestInterface[] = [
    { name: "Eric Kao", status: "GOING", id: 1 },
  ];
  return {
    guests,
  };
};
