import { SignUpForm } from "@/app/components/FormComponents/SignUpForm";

export default function SignUpPage() {

  return(
    <>
      {/* This mesh grad */}
      <div className="bg-[url('/StatesStart.svg')] h-screen w-full bg-cover bg-center absolute -z-10" />
      <SignUpForm />
    </>
  )
}