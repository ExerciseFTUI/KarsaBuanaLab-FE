"use client"

import React, { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 

 
const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})
 
interface VerticalCheckboxProps {
    formLabel: string;
    items: { id: string; label: string }[];
}

const VerticalCheckbox: FC<VerticalCheckboxProps> = ({ formLabel, items }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })
 
  function onSubmit(data: z.infer<typeof FormSchema>) {
    
  }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 mt-4 m-10">
                <FormField
                control={form.control}
                name="items"
                render={() => (
                    <FormItem className="space-y-0">
                    <div className="mb-4">
                        <FormLabel className="text-2xl font-bold">{`${formLabel}`}</FormLabel>
                        <div className="bg-[#bbbabf] w-full h-0.5 m-2"/>
                    </div>
                    {items.map((item) => (
                        <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                            return (
                            <FormItem
                                key={item.id}
                                className="flex flex-col space-y-4  "
                            >
                                <div className="absolute z-0 h-16 w-[1px] mx-3 bg-[#bbbabf]"/>
                                <div className="flex flex-row items-center space-x-3 space-y-0 z-10">
                                    <FormControl>
                                    <Checkbox
                                        className="h-6 w-6 bg-ghost_white"
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...field.value, item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <FormLabel className={`text-lg font-normal ${field.value?.includes(item.id) ? '' : 'text-moss_green'}`}>
                                    {item.label}
                                    </FormLabel>
                                </div>
                            </FormItem>
                            )
                        }}
                        />
                    ))}
                    <FormMessage className="translate-y-5" />
                    </FormItem>
                )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default VerticalCheckbox;
