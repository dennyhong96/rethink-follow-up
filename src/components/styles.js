import styled, { css } from "styled-components";

export const StyledFileNode = styled.div`
	margin-left: 2rem;
	cursor: pointer;

	&:focus {
		outline: none;
		outline: ${({ theme }) => `1px solid ${theme.colors.background}`};
	}

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

	& > div:first-of-type {
		display: flex;
		align-items: center;
		justify-content: space-between;

		& > div {
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

		& > svg {
			height: 2rem;
			height: 2rem;
			transition: 0.2s ease-out;

			${({ isOpen }) =>
				isOpen &&
				css`
					transform: rotate(180deg);
				`}
		}
	}
`;
