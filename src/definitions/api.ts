export type FlybyApiResponse<T> = Promise<
  | {
    data: T;
    error: null;
  }
  | {
    data: null;
    error: string;
  }
>;
