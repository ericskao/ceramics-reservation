export interface EventInterface {
  attributes: {
    code: string;
    description: string;
    expires_on: string;
    title: string;
  };
  id: string;
  relationships: {
    user: UserInterface;
    // event_availabilities: any
    // participants: any
  };
  type: "event";
}

export interface UserInterface {
  data: {
    id: string;
    type: "user";
  };
}
