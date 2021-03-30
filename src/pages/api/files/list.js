import path from "path";
import { promises as fs } from "fs";

const ROOT_DIR = "_drive";

export default async function handler(req, res) {
	const pathName = req.query.path_name;

	try {
		if (!pathName) throw new Error("Please provide a pathname to the directory.");

		const parts = pathName.split("/").filter(part => !!part); // part may be empty string, need to filter those out

		const files = await getFileTree(path.join(ROOT_DIR, ...parts));

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

// Recursively read directory, returns an array of objects with file/folder info
async function getFileTree(startDir) {
	const parentDir = await fs.readdir(startDir, { encoding: "utf-8", withFileTypes: true });

	return await Promise.all(
		parentDir.map(async childDir => {
			const pathFromRoot = path.join(startDir, childDir.name);
			const isDir = childDir.isDirectory();

			return {
				type: isDir ? "FOLDER" : "FILE",
				name: childDir.name,
				path: pathFromRoot.replace(ROOT_DIR, ""), // Need to get rid of 'ROOT_DIR'(_drive) because in actual file system the files live in '/_drive'

				// If child is a directory, call getFileTree recursively to get it's children
				...(isDir && { children: await getFileTree(pathFromRoot) }),
			};
		}),
	);
}
