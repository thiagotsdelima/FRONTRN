import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 25rem auto;
  grid-template-rows: 10.5rem 12.8rem auto 6.4rem;
  grid-template-areas:
    "Brand header"
    "Menu Search"
    "Menu Content"
    "NewNote Content";
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
`;

export const Brand = styled.div`
  grid-area: Brand;
  
  display:flex;
  justify-content: center;
  align-items:center;

  border-bottom-width: .1rem;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  > h1 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;

export const Menu = styled.ul`
  grid-area: Menu;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  padding-top: 6.4rem;
  text-align: center;

  > li {
    margin-bottom: 2.4rem;
  }

`;

export const Search = styled.div`
  grid-area: Search;
  padding: 6.4rem 6.4rem 0;
`;

export const Content = styled.div`
  grid-area: Content;
  padding: 0 6.4rem;
  overflow-y: auto;
`;

export const NewNote = styled(Link)`
  grid-area: NewNote;
  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    margin-right: .8rem;
  }
`;
