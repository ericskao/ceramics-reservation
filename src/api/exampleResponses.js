const getEvent = {
  id: 17,
  location: "Frank's place",
  name: "Soju Night",
  host: {
    id: 3,
    name: "Frank",
    userImg: "image-url",
  },
  description: "Soju night at my place!",
  image: "event-image-here",
  availableTimes: [
    {
      id: 1,
      date: "Sat Mar 23 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      startTime: "Sat Mar 23 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      endTime: "Sun Mar 24 2024 12:00:00 GMT-0700 (Pacific Daylight Time)",
    },
    {
      id: 2,
      date: "Sat Mar 23 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      startTime: "Sat Mar 23 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      endTime: "Sat Mar 23 2024 11:59:50 GMT-0700 (Pacific Daylight Time)",
    },
    {
      id: 3,
      date: "Sun Mar 24 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      startTime: "Sun Mar 24 2024 11:54:50 GMT-0700 (Pacific Daylight Time)",
      endTime: "Sun Mar 24 2024 11:59:50 GMT-0700 (Pacific Daylight Time)",
    },
  ],
  isGuest: true, // false if not logged in or userId is not invited to event
};

const getGuestList = [
  {
    id: 3,
    name: "Frank",
    userImg: "image-url",
  },
  {
    id: 4,
    name: "Eric",
    userImg: "image-url",
  },
  {
    id: 5,
    name: "Yang",
    userImg: "image-url",
  },
];
