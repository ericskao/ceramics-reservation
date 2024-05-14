import apiClient from "@/api/apiClient";
import { ReservationType } from "@/hooks/useReservations";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";

type AxiosErrorType = {
  response: {
    data: {
      error: string;
    };
  };
};

const reserveWheel = async ({
  wheelId,
  userId,
}: {
  wheelId: number;
  userId: string;
}) => {
  const { data } = await apiClient().post(`/reservations/${wheelId}`, {
    userId,
  });
  return data;
};

const removeReservation = async ({ wheelId }: { wheelId: number }) => {
  const { data } = await apiClient().put(`/reservations/${wheelId}`, {
    userId: null,
  });
  return data;
};

export const useReserveWheel = () => {
  const queryClient = useQueryClient();
  const reserveMutation = useMutation({
    mutationFn: reserveWheel,
    onSuccess: (data: ReservationType) => {
      const previousReservations:
        | { reservations: ReservationType[] }
        | undefined = queryClient.getQueryData(["reservations"]);
      if (!!previousReservations) {
        const newReservations = {
          reservations: [...previousReservations.reservations],
        };
        const reservationIndex = previousReservations.reservations.findIndex(
          (res) => res.id === data.id,
        );
        newReservations.reservations[reservationIndex] = data;
        queryClient.setQueryData(["reservations"], () => newReservations);
      }
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Wheel reserved.",
      });
    },
    onError: (error: AxiosErrorType) => {
      notifications.show({
        color: "red",
        title: "Failed to reserve wheel!",
        message: error.response.data.error,
      });
    },
  });
  const removeMutation = useMutation({
    mutationFn: removeReservation,
    onSuccess: (data) => {
      const previousReservations:
        | { reservations: ReservationType[] }
        | undefined = queryClient.getQueryData(["reservations"]);

      if (!!previousReservations) {
        const newReservations = {
          reservations: [...previousReservations.reservations],
        };
        const reservationIndex = previousReservations.reservations.findIndex(
          (res) => res.id === data.id,
        );
        newReservations.reservations[reservationIndex] = data;
        queryClient.setQueryData(["reservations"], () => newReservations);
      }

      notifications.show({
        color: "green",
        title: "Success!",
        message: "Reservation removed.",
      });
    },
    onError: (error: AxiosErrorType) => {
      notifications.show({
        color: "red",
        title: "Failed to remove reservation!",
        message: error.response.data.error,
      });
    },
  });

  const reserveWheelMutation = async (params: any, onSuccess?: () => void) => {
    try {
      await reserveMutation.mutateAsync(params);
      if (onSuccess) {
      }
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const removeReservationMutation = async (params: any) => {
    try {
      await removeMutation.mutateAsync(params);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    reserveWheelMutation,
    removeReservationMutation,
  };
};
