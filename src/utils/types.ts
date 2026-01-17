export type GameData = {
  [key: string]:
    | {
        [key: string]: string;
      }
    | string
    | {};
};
