import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { noteFormSchema } from "./schemas";

export type Props = {
  onConfirm: (v: any) => void,

}

export default function NoteOverlay({ onConfirm }: Props) {
  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      note: "",
    },
  })

  function onSubmit(values: z.infer<typeof noteFormSchema>) {
    return onConfirm(values);
  }
  const formId = "note"

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-between min-h-[100px]">
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="flex flex-col grow">
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="leave your notes here"
                  className="grow resize-none"
                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
