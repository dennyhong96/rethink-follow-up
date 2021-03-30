import path from "path";
import { promises as fs } from "fs";

const ROOT_DIR = "_drive";

export default async function handler(req, res) {
	const pathName = req.query.path_name;

	try {
		if (!pathName) throw new Error("Please provide a pathname.");

		const parts = pathName.split("/").filter(part => !!part);

		const file = await fs.readFile(path.join(ROOT_DIR, ...parts), { encoding: "utf-8" });

		return res.status(200).json({
			pathName,
			fullPath: path.resolve(ROOT_DIR, ...parts),
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
