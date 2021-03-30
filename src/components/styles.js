import styled, { css } from "styled-components";

export const StyledFileNode = styled.div`
	p {
		display: flex;
		align-items: center;
		font-size: 1.6rem;
		padding: 0.5rem 1rem;

		svg {
			height: 2rem;
			width: 2rem;
			margin-right: 0.5rem;
		}
	}

	& > div {
		padding-left: 3rem;
	}

	${({ type }) =>
		type === "FILE" &&
		css`
			cursor: pointer;
			&:hover {
				background-color: rgba(0, 0, 0, 0.15);
			}
		`}
`;
