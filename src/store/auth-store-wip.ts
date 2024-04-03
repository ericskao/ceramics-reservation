import { JwtPayload, jwtDecode } from "jwt-decode";
import { create, useStore } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AuthStore = {
  accessToken: string | undefined;
  accessTokenData: JwtPayload | undefined;
  actions: {
    setAccessToken: (accessToken: string | undefined) => void;
    init: () => void;
    clearTokens: () => void;
  };
};

export const authStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        accessToken: undefined,
        accessTokenData: undefined,
        actions: {
          setAccessToken: (accessToken: string | undefined) => {
            const accessTokenData = accessToken
              ? jwtDecode(accessToken)
              : undefined;
            console.log("atd", accessTokenData);
            set({
              accessToken,
              accessTokenData,
            });
          },
          init: () => {
            const { setAccessToken } = get().actions;
            console.log("init happening", document.cookie);
            setAccessToken(document.cookie);
          },
          clearTokens: () =>
            set({
              accessToken: undefined,
              accessTokenData: undefined,
            }),
        },
      }),
      {
        name: "auth-store",
      },
    ),
  ),
);

export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) =>
  state.accessToken;
const accessTokenDataSelector = (state: ExtractState<typeof authStore>) =>
  state.accessTokenData;
const actionsSelector = (state: ExtractState<typeof authStore>) =>
  state.actions;

// getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getAccessTokenData = () =>
  accessTokenDataSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStore(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useAccessTokenData = () => useAuthStore(accessTokenDataSelector);
export const useActions = () => useAuthStore(actionsSelector);
