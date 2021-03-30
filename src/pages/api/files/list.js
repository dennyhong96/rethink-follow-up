import path from "path";
import { promises as fs } from "fs";

const ROOT_DIR = "_drive";

export default async function handler(req, res) {
	const pathName = req.query.path_name;

	try {
		if (!pathName) throw new Error("Please provide a pathname.");

		const parts = pathName.split("/").filter(part => !!part);

		const files = await listFiles(path.join(ROOT_DIR, ...parts));
		return res.status(200).json(files);
	} catch (error) {
		switch (error.code) {
			case "ENOENT": {
				return res.status(400).json({
					message: `Directory not found at given path - ${pathName}`,
				});
			}
			case "ENOTDIR": {
				return res.status(400).json({
					message: `Please provide a valid path to a directory, the given path ${pathName} points to a file.`,
				});
			}

			default: {
				return res
					.status(500)
					.json({ message: error.message ?? `Something went wrong, try again later.` });
			}
		}
	}
}

async function listFiles(startDir) {
	const parentDir = await fs.readdir(startDir, { encoding: "utf-8", withFileTypes: true });

	return await Promise.all(
		parentDir.map(async child => {
			const fullPath = path.resolve(startDir, child.name);
			const isDir = child.isDirectory();

			return {
				type: isDir ? "FOLDER" : "FILE",
				name: child.name,
				fullPath,
				...(isDir && { children: await listFiles(fullPath) }),
			};
		}),
	);
}
