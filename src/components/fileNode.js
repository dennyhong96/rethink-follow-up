import { Folder, File } from "./icons";
import { StyledFileNode } from "./styles";

const FileNode = ({ file, onSelectFile }) => {
	return (
		<StyledFileNode type={file.type} onClick={() => onSelectFile(file.name)}>
			{/* Filename */}
			<p>
				{file.type === "FOLDER" ? <Folder /> : <File />} {file.name}
			</p>

			{/* Children of the folder */}
			<div>
				{file.type === "FOLDER" &&
					file.children.map(childFile => (
						<FileNode key={childFile.name} file={childFile} onSelectFile={onSelectFile} />
					))}
			</div>
		</StyledFileNode>
	);
};

export default FileNode;
