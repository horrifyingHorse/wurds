'use client'
import Link from "next/link"

import { GradientText } from "@/app/components/Decoration/DynamicTextGradient"

export function SignUpForm() {
  const inputClass = "outline-none bg-transparent border-b-2 border-b-slate-500 focus:border-b-violet-500 transition-all duration-300 w-2/3"

  return (
    <div className={`h-svh w-svw flex flex-wrap justify-center content-center bg-no-repeat`}>
      <div className="bg-neutral-900 p-5 rounded-lg w-96 lg:w-1/3 sm:w-1/2 min-w-80">
        <div className="mb-10">
          <div className="flex justify-center text-3xl font-bold">
            <GradientText txt="Wurds" gradList={["#3dff8c", "#00e5db", "#00c1ff", "#008eff", "#8717f9"]} />
          </div>
          <div className="flex justify-center">
            <span className="bg-gradient-to-r from-green-300 to-violet-600 bg-clip-text text-transparent">
              Enhance Your Vocabulary
            </span>
          </div>
        </div>

        <form action="">
          <div className="mt-5">
            Username:
            <input type="text" name="name" placeholder="oneFlatTire"
              className={`ml-2 ${inputClass}`} />
          </div>
          <div className="mt-5">
            Email:
            <input type="email" name="mail" placeholder="you@address.com"
              className={`ml-11 ${inputClass}`} />
          </div>
          <div className="mt-5">
            Password:
            <input type="password" name="name" placeholder="FollowTheDamnTrainCJ"
              className={`ml-2 ${inputClass}`} />
          </div>
          <div className="mt-9 mb-3 text-center">
            <button type="submit" className="bg-violet-600 p-2 px-9 rounded-2xl hover:bg-violet-700 transition-all duration-200">
              Continue
            </button>
          </div>
        </form>
        <hr className="w-1/2 m-auto" />
        <div className="mt-3 text-sm">
          Already Have an Account?&nbsp;
          <Link href="/login" className="text-violet-500 hover:text-violet-600 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}