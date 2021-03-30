import { memo, useState } from "react";
import { Folder, File, Arrow } from "./icons";
import { StyledFileNode } from "./styles";

const FileNode = ({ file, onSelectFile }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<StyledFileNode
			tabIndex={0}
			type={file.type}
			isOpen={isOpen}
			onClick={
				file.type === "FILE"
					? evt => {
							evt.stopPropagation();
							onSelectFile(file.path);
					  }
					: evt => {
							evt.stopPropagation();
							setIsOpen(prev => !prev);
					  }
			}
		>
			{/* Filename */}
			<div>
				<div className="">
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
