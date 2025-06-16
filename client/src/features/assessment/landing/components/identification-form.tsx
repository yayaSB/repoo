"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nom requis" }),
  email: z.string().email({ message: "Email invalide" }),
});

export default function IdentificationForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      name: values.name,
    });

    if (res?.ok) {
      router.push("/assessment");
    } else {
      setError("Erreur lors de l'identification.");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex-grow md:basis-2/3 px-6 py-10 md:px-10 lg:px-16 flex flex-col justify-center">
      <div className="w-full md:mx-0">
        <h3 className="text-[20px] font-semibold text-[#1C5DF3] mb-2">
          Identification
        </h3>
        <p className="text-[#4c4d4d] mb-20 text-[20px]">
          Veuillez entrer vos informations pour accéder aux <br/> résultats de
          l&apos;évaluation.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] text-[#4c4d4d] ">Nom complet*</FormLabel>
                  <FormControl>
                    <Input
  placeholder="ex: Doha Tahir"
  className="w-[508px] h-[56px] px-[12px]  mt-[8px] border border-gray-300 rounded-[6px] text-base"
  {...field}
/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-6">
                  <FormLabel className="text-[16px] text-[#4c4d4d]">Adresse e-mail*</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ex: you@gmail.com"
                      className="w-[508px] h-[56px] px-[12px] mt-[8px] border border-gray-300 rounded-[6px] text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="shadow-[0_3px_12px_0_#0000001A] w-full mt-20 md:w-auto bg-[#1c5df3] hover:bg-[#1c5df3]/90 text-white px-8 py-6 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg"
            >
              <span>Commencer l&apos;évaluation</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
