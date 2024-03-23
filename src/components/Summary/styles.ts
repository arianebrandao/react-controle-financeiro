import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); //3 colunas de tamanhos iguais. 1f, 1f, 1f
  gap: 2rem;
  margin-top: -10rem;

  @media(max-width: 720px){
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  div{
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.25rem;
    color: var(--text-title);

    @media(max-width: 992px){
      padding: 1.5rem 1rem;
    }

    header{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong{
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
      font-weight: 500;
      line-height: 3rem;
    }

    &.hightlight-background{
      background-color: var(--green);
      color: #ffffff;
    }
  }
`;
