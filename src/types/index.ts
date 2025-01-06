export type MetaDataResponse = {
  data: Array<any>;
  metadata: {
    total: number;
    totalPages: number;
    totalRegisters: number;
    currentCursor: number;
    totalPerPage: number;
    prev: number;
    next: number;
  };
};


export interface ICommonError {
  code: 200 | 401 | 404 | 500;
  reason?: string | Error | unknown;
}

/** Async Tuple based Response => ATBR */
export type ATBR<G> = Promise<[G | undefined, ICommonError | undefined]>;

export type TDhandler = {
  fullDate?: Date | number;
  minutes?: number;
  hours?: number;
};

/** Login Returnbale User */
export type LRU = {
  id: number;
  email: string;
  username: string;
  last_name: string | null;
  first_name: string | null;
};

export type TUR = {
  email: string;
  username: string;
  verified_email: boolean | null;
};
