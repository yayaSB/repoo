"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { z, ZodTypeAny, TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path } from "react-hook-form";

interface Field {
  id: string; // <-- Make sure each field has a unique id for DnD
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select" | "number" | "checkbox";
  options?: { label: string; value: string }[];
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
  placeholder?: string;
}

interface BaseFormProps<T extends ZodTypeAny> {
  schema: T;
  fields: Field[];
  onSubmit: (values: z.infer<T>) => void;
  className?: string;
  submitButtonText?: string;
  submitButtonClassName?: string;
  showSubmitButton?: boolean;
  formRef?: React.RefObject<HTMLFormElement>;
}

export default function BaseFormComponent<T extends ZodTypeAny>({
  schema,
  fields,
  onSubmit,
  className = "p-4 bg-white shadow-md rounded-lg w-full max-w-lg mx-auto",
  submitButtonText = "Envoyer",
  submitButtonClassName = "bg-[#1C5DF3] text-white py-3 px-6 rounded-lg mx-auto block",
  showSubmitButton = true,
  formRef,
}: BaseFormProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  // Compute default values based on fields
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name as keyof z.infer<T>] =
      field.type === "checkbox" ? false : "";
    return acc;
  }, {} as z.infer<T>);

  // Use useForm and reset when fields change (for DnD)
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "all",
  });

  useEffect(() => {
    form.reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.map((f) => f.id).join(",")]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 flex flex-col gap-3 mt-5 ${className}`}
      >
        {fields.map((field) => (
          <FormField
            key={field.id} // Use unique id for stable keys
            control={form.control}
            name={field.name as Path<TypeOf<T>>}
            render={({ field: rf }) => (
              <FormItem
                className={`${
                  field.type === "checkbox"
                    ? "flex flex-row items-center"
                    : "flex flex-col"
                } ${field.wrapperClassName || ""}`}
              >
                <FormLabel
                  className={`text-gray-700 font-medium mb-3  ${
                    field.labelClassName || ""
                  }`}
                >
                  {field.label}
                </FormLabel>

                <FormControl>
                  {field.type === "select" ? (
                    <Select onValueChange={rf.onChange} defaultValue={rf.value}>
                      <SelectTrigger
                        className={`border rounded-md px-3 py-2 ${field.inputClassName || ""}`}
                      >
                        <SelectValue
                          placeholder={field.placeholder || `Sélectionnez ${field.label}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "checkbox" ? (
                    <Checkbox
                      checked={rf.value}
                      onCheckedChange={rf.onChange}
                      className={`ml-2 ${field.inputClassName || ""}`}
                    />
                  ) : field.type === "password" ? (
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        {...rf}
                        placeholder={field.placeholder}
                        className={`border rounded-md px-3 py-2 pr-10 ${field.inputClassName || ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <Eye className="w-5 h-5 cursor-pointer" />
                        ) : (
                          <EyeOff className="w-5 h-5 cursor-pointer" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      {...rf}
                      placeholder={field.placeholder}
                      className={`border rounded-md px-3 py-2 ${field.inputClassName || ""}`}
                    />
                  )}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        {showSubmitButton && (
          <input
            type="submit"
            value={submitButtonText}
            className={`${submitButtonClassName} cursor-pointer`}
          />
        )}
      </form>
    </Form>
  );
}
