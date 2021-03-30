import FileNode from "@components/fileNode";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Home() {
	const [files, setFiles] = useState([]);
	const [selectedFile, setSelectedFile] = useState({});

	useEffect(() => {
		(async () => {
			const fileTree = await fetch("/api/files/list?path_name=/").then(res => res.json());
			setFiles(fileTree);
		})();
	}, []);

	console.log({ files });

	const handleSelectFile = async name => {
		const file = await fetch(`/api/files/read?path_name=${name}`).then(res => res.json());
		setSelectedFile(file);
	};

	return (
		<StyledHome>
			<div>
				{files.map(file => (
					<FileNode file={file} key={file.name} onSelectFile={handleSelectFile} />
				))}
			</div>
			<div>{selectedFile.content}</div>
		</StyledHome>
	);
}

const StyledHome = styled.main`
	padding: 5rem;
	width: 100%;
	max-width: 1200px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 2rem;

	& > div:first-of-type {
		border-right: 1px solid ${({ theme }) => theme.colors.text};
	}
`;
