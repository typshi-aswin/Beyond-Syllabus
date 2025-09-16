import { Elysia } from "elysia";

//#region src/index.d.ts
declare const app: Elysia<"", {
  decorator: {};
  store: {};
  derive: {};
  resolve: {};
}, {
  typebox: {};
  error: {};
}, {
  schema: {};
  standaloneSchema: {};
  macro: {};
  macroFn: {};
  parser: {};
  response: {};
}, {
  "rpc*": {
    options: {
      body: unknown;
      params: {};
      query: unknown;
      headers: unknown;
      response: {
        200: Response;
      };
    };
  };
} & {
  "rpc*": {
    [x: string]: {
      body: unknown;
      params: {};
      query: unknown;
      headers: unknown;
      response: {
        200: Response;
      };
    };
  };
} & {
  "api*": {
    [x: string]: {
      body: unknown;
      params: {};
      query: unknown;
      headers: unknown;
      response: {
        200: Response;
      };
    };
  };
} & {
  get: {
    body: unknown;
    params: {};
    query: unknown;
    headers: unknown;
    response: {
      200: string;
    };
  };
} & {
  syllabus: {
    get: {
      body: unknown;
      params: {};
      query: unknown;
      headers: unknown;
      response: {};
    };
  };
}, {
  derive: {};
  resolve: {};
  schema: {};
  standaloneSchema: {};
  response: {};
}, {
  derive: {};
  resolve: {};
  schema: {};
  standaloneSchema: {};
  response: {};
}>;
//#endregion
export { app };