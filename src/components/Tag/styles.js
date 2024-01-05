import styled from 'styled-components';

export const Container = styled.span`
font-size: 1.2rem;
padding: .5rem 1.4rem;
border-radius: .5rem;
margin-right: .6rem;
background-color: ${({ theme }) => theme.COLORS.ORANGE};
color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
`;