import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { RPCHandler } from "@orpc/server/fetch";
import { ORPCError, onError, os } from "@orpc/server";
import path from "node:path";
import { file } from "bun";
import fs from "fs";
import matter from "gray-matter";
import "dotenv/config";
import { z } from "zod";
import serverTiming from "@elysiajs/server-timing";

//#region src/lib/orpc.ts
const o = os.$context();
const publicProcedure = o;
const requireAuth = publicProcedure.middleware(async ({ context, next }) => {
	if (!context.session) throw new ORPCError("UNAUTHORIZED");
	return next({ context: { session: context.session } });
});
const protectedProcedure = publicProcedure.use(requireAuth);

//#endregion
//#region src/routes/index.ts
const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	syllabus: publicProcedure.handler(async () => {
		return await file(path.join(process.cwd(), "src/routes/syllabus/university.json")).json();
	})
};

//#endregion
//#region src/lib/context.ts
async function createContext({ context }) {
	return { session: null };
}

//#endregion
//#region src/routes/syllabus/index.ts
const universitiesDir = path.join(process.cwd(), "universities");
async function readSyllabusData() {
	const data = {};
	try {
		if (!fs.existsSync(universitiesDir)) throw new Error("University data directory not found. Please ensure the `universities` folder exists at the root of your project.");
		const moduleRegex = /^#{0,6}\s*\*{0,2}\s*(Module|Weeks?|MODULE|WEEKS?)\s*(?:[-–—]?\s*)?((?:\d+(?:\s*-\s*\d+)?)|(?:I{1,4}V?|V(?:I{1,3})?|IX|X))\s*\*{0,2}\s*(?:[-–—:()]\s*(.*?))?\s*\*{0,2}$/i;
		const universities = await fs.promises.readdir(universitiesDir);
		for (const universityId of universities) {
			const universityPath = path.join(universitiesDir, universityId);
			if (!(await fs.promises.lstat(universityPath)).isDirectory()) continue;
			const programDirs = await fs.promises.readdir(universityPath);
			data[universityId] = {};
			for (const programId of programDirs) {
				const programPath = path.join(universityPath, programId);
				if (!(await fs.promises.lstat(programPath)).isDirectory()) continue;
				const schemeDirs = await fs.promises.readdir(programPath);
				data[universityId][programId] = {};
				for (const schemeId of schemeDirs) {
					const schemePath = path.join(programPath, schemeId);
					if (!(await fs.promises.lstat(schemePath)).isDirectory()) continue;
					const semesterDirs = await fs.promises.readdir(schemePath);
					data[universityId][programId][schemeId] = {};
					for (const semesterId of semesterDirs) {
						const semesterPath = path.join(schemePath, semesterId);
						if (!(await fs.promises.lstat(semesterPath)).isDirectory()) continue;
						const subjectFiles = await fs.promises.readdir(semesterPath);
						data[universityId][programId][schemeId][semesterId] = { subjects: [] };
						for (const subjectFile of subjectFiles) if (subjectFile.endsWith(".md")) {
							const subjectFilePath = path.join(semesterPath, subjectFile);
							const fileContent = await fs.promises.readFile(subjectFilePath, "utf-8");
							const { data: frontmatter, content } = matter(fileContent);
							const moduleItems = [];
							const lines = content.split("\n");
							let currentModule = null;
							for (const line of lines) {
								const moduleMatch = line.match(moduleRegex);
								if (moduleMatch) {
									if (currentModule) moduleItems.push({
										title: currentModule.title,
										content: currentModule.content.join("\n").trim()
									});
									const typeLabelRaw = moduleMatch[1];
									const numberOrRange = moduleMatch[2];
									let titleText = moduleMatch[3] || "";
									if (titleText) {
										titleText = titleText.replace(/^\*{0,2}/, "").replace(/\*{0,2}$/, "").trim();
										titleText = titleText.replace(/^[-–—:]\s*/, "");
										titleText = titleText.replace(/\s*[-–—:]\s*$/, "");
										if (titleText.startsWith("(") && titleText.endsWith(")")) {
											const inner = titleText.slice(1, -1);
											if (!inner.includes("(") && !inner.includes(")")) titleText = inner.trim();
										} else if (titleText.startsWith("(") && !titleText.endsWith(")")) titleText = titleText.slice(1).trim();
										else if (!titleText.startsWith("(") && titleText.endsWith(")")) {
											if (!/\s+\([A-Z]{2,5}\)$/.test(titleText)) titleText = titleText.slice(0, -1).trim();
										}
										titleText = titleText.trim();
									}
									const normalizedType = /^week/i.test(typeLabelRaw) ? /-/.test(numberOrRange) ? "Weeks" : "Week" : "Module";
									currentModule = {
										title: titleText || `${normalizedType} ${numberOrRange}`,
										content: []
									};
								} else if (currentModule && line.trim()) currentModule.content.push(line.replace(/^- /, "• "));
							}
							if (currentModule) moduleItems.push({
								title: currentModule.title,
								content: currentModule.content.join("\n").trim()
							});
							const subjectData = {
								id: subjectFile.replace(".md", ""),
								code: frontmatter.course_code || "N/A",
								name: frontmatter.course_title || "N/A",
								fullSyllabus: content.trim(),
								modules: moduleItems,
								university: frontmatter.university || "N/A",
								program: frontmatter.branch || "N/A",
								scheme: frontmatter.version || "N/A",
								semester: frontmatter.semester || "N/A"
							};
							data[universityId][programId][schemeId][semesterId].subjects.push(subjectData);
						}
					}
				}
			}
		}
		await Bun.write(path.join(process.cwd(), "src/routes/syllabus/university.json"), JSON.stringify(data));
	} catch (error) {
		throw error;
	}
}

//#endregion
//#region src/config/env.ts
console.log("🔐 Loading environment variables...");
const _serverEnv = z.object({
	NODE_ENV: z.string(),
	CORS_ORIGIN: z.string().optional()
}).safeParse(process.env);
if (!_serverEnv.success) {
	console.error("❌ Invalid environment variables:\n");
	_serverEnv.error.issues.forEach((issue) => {
		console.error(issue);
	});
	throw new Error("Invalid environment variables");
}
const { NODE_ENV, CORS_ORIGIN } = _serverEnv.data;
const env = {
	NODE_ENV,
	CORS_ORIGIN
};
console.log("✅ Environment variables loaded");

//#endregion
//#region src/index.ts
await readSyllabusData();
const rpcHandler = new RPCHandler(appRouter, { interceptors: [onError((error) => {
	console.error(error);
})] });
const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [new OpenAPIReferencePlugin({ schemaConverters: [new ZodToJsonSchemaConverter()] })],
	interceptors: [onError((error) => {
		console.error(error);
	})]
});
var src_default = new Elysia().use(cors({
	origin: env.CORS_ORIGIN,
	methods: [
		"GET",
		"POST",
		"OPTIONS"
	],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"]
})).use(serverTiming()).options("/rpc*", () => new Response(null, { status: 204 })).all("/rpc*", async (context) => {
	const { response } = await rpcHandler.handle(context.request, {
		prefix: "/rpc",
		context: await createContext({ context })
	});
	return response ?? new Response("Not Found", { status: 404 });
}).all("/api*", async (context) => {
	const { response } = await apiHandler.handle(context.request, {
		prefix: "/api",
		context: await createContext({ context })
	});
	return response ?? new Response("Not Found", { status: 404 });
}).get("/", () => "OK").post("/", ({ body }) => body, { body: t.Object({ name: t.String() }) }).get("/syllabus", async () => {
	return await file(path.join(process.cwd(), "src/routes/syllabus/university.json")).json();
});

//#endregion
export { src_default as default };