import { z } from "zod"
import { nanoid } from 'nanoid'
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
import type { Course, CourseNote } from "@/offcourse/types"

export type Props = {
  courseId: Course['courseId'],
  onConfirm: (v: CourseNote) => void,
  formId: string;

}

export function NoteForm({ onConfirm, formId, courseId }: Props) {
  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      note: "",
    },
  })

  function onSubmit({ note }: z.infer<typeof noteFormSchema>) {
    form.reset();
    const noteId = nanoid();
    return onConfirm({ noteId, courseId, message: note, createdAt: new Date });
  }

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
