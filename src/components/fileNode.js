import { memo, useState } from "react";
import { Folder, File, Arrow } from "./icons";
import { StyledFileNode } from "./styles";

const FileNode = ({ file, onSelectFile }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = evt => {
		evt.stopPropagation();
		file.type === "FILE" ? onSelectFile(file.path) : setIsOpen(prev => !prev);
	};

	return (
		<StyledFileNode tabIndex={0} type={file.type} isOpen={isOpen} onClick={handleClick}>
			{/* Filename */}
			<div>
				<div>
					{file.type === "FOLDER" ? <Folder /> : <File />} {file.name}
				</div>
				{file.type === "FOLDER" && <Arrow />}
			</div>

			{/* Children of the folder */}
			{isOpen && (
				<div>
					{file.type === "FOLDER" &&
						file.children.map(childFile => (
							<FileNode key={childFile.path} file={childFile} onSelectFile={onSelectFile} />
						))}
				</div>
			)}
		</StyledFileNode>
	);
};

export default memo(FileNode);
