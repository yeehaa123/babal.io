import Checkpoint from "@/components/Checkpoint";

type Checkpoint = {
  task: string,
  href: string
}

interface Props {
  checkpoints: Checkpoint[],
  toggleComplete: () => void
}

export default function Checkpoints({ checkpoints, toggleComplete }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {checkpoints.map((cp, index) => (
        <Checkpoint toggleCheck={toggleComplete} key={index} {...cp} index={index} />
      ))
      }
    </ul>
  )
}
