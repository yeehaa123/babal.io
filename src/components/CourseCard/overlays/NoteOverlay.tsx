import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"


import type { Overlay } from "./index";

const formSchema = z.object({
  note: z.string().min(10).max(500),
})

export default function NoteOverlay({ onCancel, onConfirm }: Overlay) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    return onConfirm(values);
  }

  return <>
    <CardHeader>
      <CardTitle className="flex">
        NOTE
      </CardTitle>
    </CardHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col justify-between grow">
        <CardContent className="space-y-4 grow flex flex-col justify-center">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="leave your notes here"
                    className="resize-none"
                    {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex w-full justify-between gap-x-2">
          <Button type="submit" className="w-full">Submit</Button>
          <Button onClick={onCancel} className="w-full">Cancel</Button>
        </CardFooter>
      </form>
    </Form >
  </>
}
