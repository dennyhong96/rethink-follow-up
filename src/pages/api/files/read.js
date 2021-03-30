import path from "path";
import { promises as fs } from "fs";

const ROOT_DIR = "_drive";

// Read that can read and return the content of a file for a given pathname
export default async function handler(req, res) {
	const pathName = req.query.path_name;

	try {
		if (!pathName) throw new Error("Please provide a pathname to the file.");

		const parts = pathName.split("/").filter(part => !!part); // part may be empty string, need to filter those out

		const pathFromRoot = path.join(ROOT_DIR, ...parts);
		const file = await fs.readFile(pathFromRoot, { encoding: "utf-8" });

		return res.status(200).json({
			path: pathFromRoot.replace(ROOT_DIR, ""), // Need to get rid of 'ROOT_DIR'(_drive) because in actual file system the files live in '/_drive'
			content: file,
		});
	} catch (error) {
		switch (error.code) {
			case "EISDIR": {
				return res.status(400).json({
					message: `Please provide a valid path to a file, the given path ${pathName} points to a directory.`,
				});
			}

			case "ENOENT": {
				return res.status(400).json({
					message: `File not found at given path - ${pathName}`,
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
