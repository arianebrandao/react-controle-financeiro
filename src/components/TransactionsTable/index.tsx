import { Container } from "./styles";

export function TransactionsTable(){
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de website</td>
            <td className="deposit">R$12000,00</td>
            <td>Desenvolvimento</td>
            <td>19/07/2021</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">- R$1000,00</td>
            <td>Casa</td>
            <td>19/07/2021</td>
          </tr>
          <tr>
            <td>Desenvolvimento de website</td>
            <td>R$12000,00</td>
            <td>Desenvolvimento</td>
            <td>19/07/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}