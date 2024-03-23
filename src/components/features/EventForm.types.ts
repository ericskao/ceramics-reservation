export type ConfirmedTimeType = {
  date: Date;
  startTime: Date;
  endTime?: Date | null;
  id?: number;
};

export type ChunkedTimesType = {
  [isoKeys: string]: ConfirmedTimeType[];
};
