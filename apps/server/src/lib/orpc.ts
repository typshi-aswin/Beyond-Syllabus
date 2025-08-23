import { os } from "@orpc/server";
import type { Context } from "@/lib/context";

export const o = os.$context<Context>();

export const publicProcedure = o;

