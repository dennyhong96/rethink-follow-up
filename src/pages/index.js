import useFiles from "@hooks/useFiles";
import FileNode from "@components/fileNode";
import { Close } from "@components/icons";
import { StyledHome } from "@styles/pages";

export default function Home() {
	const { files, handleDeSelect, handleSelectFile, selectedFile } = useFiles();

	return (
		<StyledHome>
			{/* Side bar filetree */}
			<aside>
				{files.map(file => (
					<FileNode file={file} key={file.path} onSelectFile={handleSelectFile} />
				))}
			</aside>

			{/* File content preview */}
			<div>
				<pre>
					{selectedFile && (selectedFile.content ? selectedFile.content : "This file is empty.")}
					{!selectedFile &&
						"Click on a file to preview its content, click on a folder to expand it."}
				</pre>

				{/* Deselect file button */}
				<button onClick={handleDeSelect}>
					<Close />
				</button>
			</div>
		</StyledHome>
	);
}
