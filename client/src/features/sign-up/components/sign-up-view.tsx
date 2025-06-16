
import SignUpForm from "@/features/sign-up/components/user-auth-form";
import Header from "@/components/header";
import IllustrationPanel from "@/features/sign-in/components/illustration-panel";

type SignUpViewProps = {
  role: "creator" | "evaluator";
};

export default function SignUpView({ role }: SignUpViewProps) {
  const isEvaluator = role === "evaluator";

  return (
    <div
      className={`relative w-screen h-screen flex flex-col ${
        isEvaluator ? "lg:flex-row-reverse" : "lg:flex-row"
      } bg-white overflow-y-auto`}
    >
      {/* Top Header */}
      <div className="w-full absolute top-0 left-0 z-10">
          <Header
            position="static"
            background="transparent"
            withMenu={false}
            withLinks={false}
            showLogoLink={true}
            withLanguage={true}
          />
      </div>

      {/* Form section */}
      <div className="w-full lg:w-3/5 px-4 pt-4 md:pt-6 flex flex-col justify-center">
        <div className="space-y-8">
          <div className="text-center">
            <div className="text-[#1C5DF3] block text-center font-poppins font-semibold text-[20px] leading-[100%] tracking-normal">
              {isEvaluator ? "évaluateur" : "créateur"}
            </div>
            <h1 className="text-[39px] font-bold text-center text-gray-800">Rejoignez-nous!</h1>
          </div>

          <SignUpForm />
        </div>
      </div>

     {/* Right - Illustration */}
           <IllustrationPanel role={role} />
    </div>
  );
}
