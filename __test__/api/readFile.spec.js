import { promises as fs } from "fs";
import path from "path";

import readFile from "@pages/api/files/read";

const NONE_EXIST_FILE_PATH = { path_name: "/abcde12345.txt" };
const DIR_PATH = { path_name: "/folder1" };
const FILE_PATH = { path_name: "/folder1/file2.txt" };
const ROOT_DIR = "_drive";

describe("Read file API", () => {
	let fileContent;
	beforeEach(async () => {
		fileContent = (await fs.readFile(path.join(ROOT_DIR, FILE_PATH.path_name))).toString();
	});

	test("Sould error given a file path that does not exist", async () => {
		const res = await readFile(
			{ query: NONE_EXIST_FILE_PATH },
			{
				status() {
					return this;
				},
				json(obj) {
					return JSON.stringify(obj);
				},
			},
		);

		const { message } = JSON.parse(res);

		expect(message).toMatch(NONE_EXIST_FILE_PATH.path_name);
		expect(message).toMatch("not found");
	});

	test("Sould error when given a directory path instead of a file path", async () => {
		const res = await readFile(
			{ query: DIR_PATH },
			{
				status() {
					return this;
				},
				json(obj) {
					return JSON.stringify(obj);
				},
			},
		);

		const { message } = JSON.parse(res);

		expect(message).toMatch(DIR_PATH.path_name);
		expect(message).toMatch("provide a valid path to a file");
	});

	test("Should return the correct file content and path name.", async () => {
		const res = await readFile(
			{ query: FILE_PATH },
			{
				status() {
					return this;
				},
				json(obj) {
					return JSON.stringify(obj);
				},
			},
		);

		const fileInfo = JSON.parse(res);

		expect(fileInfo).toEqual(
			expect.objectContaining({
				path: FILE_PATH.path_name,
				content: fileContent,
			}),
		);
	});
});
