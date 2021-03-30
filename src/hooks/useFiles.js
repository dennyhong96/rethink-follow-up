import { useEffect, useState } from "react";

import { getFile, getFileTree } from "@lib/api";

const useFiles = () => {
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		(async () => {
			const fileTree = await getFileTree();
			setFiles(fileTree);
		})();
	}, []);

	const handleSelectFile = async pathName => {
		const file = await getFile(pathName);
		setSelectedFile(file);
	};

	const handleDeSelect = () => {
		setSelectedFile(null);
	};

	return {
		files,
		selectedFile,
		handleSelectFile,
		handleDeSelect,
	};
};

export default useFiles;
