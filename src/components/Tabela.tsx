import Cliente from "../core/Cliente"
import { IconeEdit, IconeTrash } from "./Icones"

interface TabelaProps {
  clientes: Cliente[]
  clienteSelecionado?: (cliente: Cliente) => void
  clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

  const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

  function renderizarCabecalho() {
    const thClass = "text-left p-4"
    return (
      <tr>
        <th className={thClass}>Código</th>
        <th className={thClass}>Nome</th>
        <th className={thClass}>Ação</th>
        {exibirAcoes ? <th className="p-4">Ações</th> : false}
      </tr>
    )
  }

  function renderizarDados() {
    return props.clientes?.map((cliente, i) => {
      const tdClass = "text-left p-4"
      return (
        <tr key={cliente.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
          <td className={tdClass}>{cliente.id}</td>
          <td className={tdClass}>{cliente.nome}</td>
          <td className={tdClass}>{cliente.idade}</td>
          {exibirAcoes ? renderizarAcoes(cliente) : false}
        </tr>
      )
    })
  }

  function renderizarAcoes(cliente: Cliente) {
    const style = `
      flex justify-center- items-center
      rounded-full p-2 m-1
      hover: bg-purple-50
    `
    return (
      <td className="flex justify-center">
        {props.clienteSelecionado ? (
          <button onClick={() => props.clienteSelecionado?.(cliente)} className={`text-green-600 ${style}`}>{IconeEdit}</button>
        ) : false}
        {props.clienteExcluido ? (
          <button onClick={() => props.clienteExcluido?.(cliente)} className={`text-red-500 ${style}`}>{IconeTrash}</button>
        ) : false}
      </td>
    )
  }

  return (
    <table className="w-full rounded-xl overflow-hidden">
      <thead className={`
        bg-gradient-to-r from-purple-500 to-purple-800
        text-gray-100
      `}>{renderizarCabecalho()}</thead>
      <tbody>{renderizarDados()}</tbody>

    </table>
  )


}