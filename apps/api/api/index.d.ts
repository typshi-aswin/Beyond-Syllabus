import { Elysia } from "elysia";

//#region src/index.d.ts
declare const _default: Elysia<"", {
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
  post: {
    body: {
      name: string;
    };
    params: {};
    query: unknown;
    headers: unknown;
    response: {
      200: {
        name: string;
      };
      422: {
        type: "validation";
        on: string;
        summary?: string;
        message?: string;
        found?: unknown;
        property?: string;
        expected?: string;
      };
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
export { _default as default };