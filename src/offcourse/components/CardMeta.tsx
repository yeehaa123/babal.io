interface Props {
  id: string,
  onClick: () => void
}

export function CardMeta({ id, onClick, }: Props) {
  return (
    <dl className="px-2 grid grid-cols-[10%_90%] text-gray-500 text-xs" onClick={onClick} >
      <dt>ID</dt>
      <dd>{id}</dd>
      <dt>Site URL</dt>
      <dd>{id}</dd>
    </dl>
  )
}
