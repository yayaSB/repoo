"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useState } from "react"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { FcGoogle } from "react-icons/fc"


const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

type UserFormValue = z.infer<typeof formSchema>

export default function SignUpForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const [loading, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = async (data: UserFormValue) => {
    startTransition(() => {
      signIn("credentials", {
        email: data.email,
        name: data.name,
        password: data.password,
        callbackUrl: callbackUrl ?? "/dashboard",
      })
      toast.success("Signed Up Successfully!")
    })
  }

  return (
    <div className="w-full max-w-[508px] px-4 sm:px-6 lg:px-0 mx-auto space-y-6">
      {/* Google Sign In Button */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: callbackUrl ?? "/dashboard" })}
        className="shadow-[0_3px_12px_0_#0000001A] flex items-center cursor-pointer justify-center gap-2 w-[394px] h-[56px] min-w-[56px] px-4 py-4 rounded-[8px] border-2 border-[#1C5DF3] bg-white text-[#1C5DF3] hover:bg-gray-50 transition-colors mx-auto"
      >
        <FcGoogle className="w-5 h-5" />
        <span className="font-semibold">S’inscrire avec Google</span>
      </button>


      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-gray-500 text-[19px] leading-[100%]">ou</span>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
          {/* Nom complet */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-4 ">
                <FormLabel className="text-[16px] font-poppins font-normal mb-10" style={{ color: "#4C4D4D" }}>
                  Nom complet*
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="ex: Full Name"
                    disabled={loading}
                    className="w-full h-[55px] px-[12px] border-[1px] border-[#B9BBBC] rounded-[6px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black mt-3"

                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-4 ">
                <FormLabel className="text-[16px] font-poppins font-normal  mb-2 " style={{ color: "#4C4D4D" }}>
                  Adresse e-mail*
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="ex: you@gmail.com"
                    disabled={loading}
                    className="w-full mt-3 h-[55px] px-[12px] border-[1px] border-[#B9BBBC] rounded-[6px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"

                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2 ">
                <FormLabel className="text-[16px] font-poppins font-normal" style={{ color: "#4C4D4D" }}>
                  Mot de passe*
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="ex: edfio564"
                      disabled={loading}
                      className="w-full mt-3 h-[55px] px-[12px] border-[1px] border-[#B9BBBC] rounded-[6px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"

                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 flex items-center right-3"
                    >
                      {showPassword ? (
                        <EyeIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex justify-center">
            <button
              className="w-[394px] h-[56px] cursor-pointer min-w-[56px] px-4 py-4 gap-2 rounded-[8px] bg-[#1C5DF3] text-white font-semibold hover:bg-[#174ad1] transition flex items-center justify-center shadow-[0_3px_12px_0_#0000001A]"
            >
              Créer un compte
            </button>
          </div>
        </form>
      </Form>

      {/* Bottom Text */}
      <div className="text-center text-sm mt-8 text-[16px]">
        <p className="text-gray-600">
          Déjà inscrit ?{" "}
          <a href="sign-in" className="font-bold text-blue-600 hover:underline">
            Accéder ici
          </a>
        </p>
      </div>
    </div>
  )
}