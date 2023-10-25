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
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
 

 
const FormSchema = z.object({
  items: z.array(z.string())
})
 
interface VerticalCheckboxProps {
    formLabel: string;
    items: { id: string; label: string }[];
    defaultValue: string[];
}

const VerticalCheckbox: FC<VerticalCheckboxProps> = ({ formLabel, items, defaultValue }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: defaultValue,
    },
  })
 
  
    return (
        <Form {...form}>
            <form className="space-y-12 mt-4 m-10">
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
                                        className="h-6 w-6 bg-ghost_white cursor-default"
                                        checked={field.value?.includes(item.id)}
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
                    </FormItem>
                )}
                />
            </form>
        </Form>
    );
};

export default VerticalCheckbox;
