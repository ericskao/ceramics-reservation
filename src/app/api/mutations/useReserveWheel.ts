import apiClient from "@/api/apiClient";
import { useMutation } from "react-query";

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
  const reserveMutation = useMutation(reserveWheel);
  const removeMutation = useMutation(removeReservation);

  const reserveWheelMutation = async (params: any) => {
    try {
      await reserveMutation.mutateAsync(params);
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
