import { ErrorResponse, SuccessResponse } from "@/common/response";
import { filterMessage } from "@/utils/functions";

import type { Elysia } from "elysia";

export const useSuccessResponseMiddleware = (app: Elysia) => {
  return app.onAfterHandle(async ({ set, request, response }): Promise<SuccessResponse> => {
    const timeStamp = new Date().toISOString();
    const status = set.status ?? 200;
    const message = "success";
    const path = request.url;
    const data = response;
    return {
      timeStamp,
      message,
      status,
      path,
      data,
    };
  });
};

export const useErrorMiddleware = (app: Elysia) => {
  return app.onError(async ({ code, error, request, set }): Promise<ErrorResponse> => {
    const status = set.status ?? (error as Error).message ?? 500;
    const message = filterMessage((error as Error).message);
    const timeStamp = new Date().toISOString();
    const path = request.url;
    const data = null;
    return {
      timeStamp,
      message,
      status,
      path,
      data,
      code,
    };
  });
};
