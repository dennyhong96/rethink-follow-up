import styled from "styled-components";

export const StyledHome = styled.div`
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
