import FileNode from "@components/fileNode";
import { Close } from "@components/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);

	useEffect(() => {
		(async () => {
			const fileTree = await fetch("/api/files/list?path_name=/").then(res => res.json());
			setFiles(fileTree);
		})();
	}, []);

	const handleSelectFile = async name => {
		const file = await fetch(`/api/files/read?path_name=${name}`).then(res => res.json());
		setSelectedFile(file);
	};

	const handleDeSelect = () => {
		setSelectedFile(null);
	};

	return (
		<StyledHome>
			{/* Side bar file tree */}
			<aside>
				{files.map(file => (
					<FileNode file={file} key={file.path} onSelectFile={handleSelectFile} />
				))}
			</aside>

			{/* File content */}
			<div>
				<pre>
					{selectedFile && (selectedFile.content ? selectedFile.content : "This file is empty.")}
					{!selectedFile && "Click on a file to read it's content, click on a folder to expand it."}
				</pre>

				<button onClick={handleDeSelect}>
					<Close />
				</button>
			</div>
		</StyledHome>
	);
}

const StyledHome = styled.div`
	padding: 5rem;
	width: 100%;
	max-width: 1300px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 2rem;
	min-height: 90vh;

	& > div {
		position: relative;

		& > pre:last-of-type {
			width: 100%;
			height: 100%;
			border-left: 1px solid ${({ theme }) => theme.colors.text};
			padding-left: 2rem;
			white-space: pre-wrap;
			word-wrap: break-word;
		}

		& > button {
			position: absolute;
			right: 0;
			top: 0;
			display: flex;
			place-items: center;

			& > svg {
				height: 3rem;
				width: 3rem;
			}
		}
	}
`;
