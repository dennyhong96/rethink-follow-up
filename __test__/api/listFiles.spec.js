import { promises as fs } from "fs";
import path from "path";

import getFileTree from "@pages/api/files/list";

const NONE_EXIST_PATH = { path_name: "/abcde12345" };
const FILE_PATH = { path_name: "/folder1/file2.txt" };
const DIR_PATH = { path_name: "/folder1" };
const ROOT_DIR = "_drive";

describe("List files API", () => {
	let numFilesFolders;
	beforeEach(async () => {
		numFilesFolders = await fs.readdir(path.join(ROOT_DIR, DIR_PATH.path_name));
	});

	test("Sould error given a directory path that does not exist", async () => {
		const res = await getFileTree(
			{ query: NONE_EXIST_PATH },
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

		expect(message).toMatch(NONE_EXIST_PATH.path_name);
		expect(message).toMatch("not found");
	});

	test("Sould error when given a file path instead of a directory path", async () => {
		const res = await getFileTree(
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

		const { message } = JSON.parse(res);

		expect(message).toMatch(FILE_PATH.path_name);
		expect(message).toMatch("valid path to a directory");
	});

	test("Should return the correct number of top level files/folders, in correct shape.", async () => {
		const res = await getFileTree(
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

		const filesFolders = JSON.parse(res);

		expect(filesFolders).toHaveLength(numFilesFolders.length);

		expect(filesFolders).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					type: expect.any(String),
					name: expect.any(String),
					path: expect.any(String),
					children: expect.any(Array),
				}),
			]),
		);
	});
});
