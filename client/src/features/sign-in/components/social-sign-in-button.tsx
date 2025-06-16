import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SocialSignInButton() {
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        className="w-[394px] h-[56px]  py-5 border-2 px-6 border-[#1C5DF3] text-[#1C5DF3] flex  items-center justify-center gap-2 rounded-lg text-[20px] cursor-pointer "
      >
        <Image
          src="/icons/google-icon.svg"
          alt="Google"
          className="h-[1em] w-auto"
          width={10}
          height={10}
        />
        Se connecter avec Google
      </Button>
    </div>
  );
}