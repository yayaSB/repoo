"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(4, { message: "Mot de passe requis" }),
});

type SignInFormProps = {
  role: "creator" | "evaluator";
};

export default function SignInForm({ role }: SignInFormProps) { 
  const isEvaluator = role === "evaluator";
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.ok) {
      router.push(isEvaluator ? "/evaluator/dashboard" : "/creator/dashboard");
    } else {
      setError("Identifiants incorrects");
    }
  };

  return (
    <Form {...form}>
    <div className="flex justify-center px-4 sm:px-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-[508px]" 
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-3">
              <FormLabel className="text-[16px] text-[#4C4D4D]">Email *</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  {...field}
                  className="h-[56px] border border-[#B9BBBC] text-[16px] w-[508px] mt-3"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="text-[16px] text-[#4C4D4D]">Mot de passe *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Votre mot de passe"
                    {...field}
                    className="pr-10 mt-3 border border-[#B9BBBC] text-[16px] h-[56px] w-[508px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <div className="flex mt-5 items-center justify-between text-sm">
          <div className="flex items-center space-x-2 sm:pl-1 leading-none">
            <Checkbox
              id="keep-logged-in"
              className="w-[14px] h-[14px] flex items-center justify-center rounded-sm border-2 border-white ring-1 ring-[#1E70FF] data-[state=checked]:bg-[#1E70FF] data-[state=checked]:text-white text-[10px] transition"
            />
            <label
              htmlFor="keep-logged-in"
              className="text-[#1C2A6D] font-medium text-[16px]"
            >
              Garder ma session
            </label>
          </div>
  
          <Link href="#" className="text-[#1C5DF3] text-[16px] font-medium">
            Mot de passe oublié ?
          </Link>
        </div>
  
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
  
        <div className="flex justify-center">
          <Button
            type="submit"
            className="w-3/4 h-[56px] rounded-lg bg-[#1C5DF3] text-white text-[20px] font-medium cursor-pointer box-shadow: 0px 3px 12px 0px #0000001A"
          >
            Se connecter
          </Button>
        </div>
  
        <div className="text-center text-[20px] text-[#737475]">
          Nouveau ici ?{" "}
          <Link href="sign-up" className="text-[#1C5DF3] font-semibold cursor-pointer">
            Créez un compte
          </Link>
        </div>
      </form>
    </div>
  </Form>
  
  );
}