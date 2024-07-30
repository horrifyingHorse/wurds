'use client'
import Link from "next/link"
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { GradientText } from "@/app/components/Decoration/DynamicTextGradient"

export function SignUpForm() {
  const [init, setInit] = useState(false);
  const inputClass = "outline-none bg-transparent border-b-2 border-b-slate-500 focus:border-b-violet-500 transition-all duration-300 w-2/3"

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      "particles": {
        "number": {
          "value": 130,
          "density": {
            "enable": true,
            "value_area": 479.8080767692925
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 4,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 0.3,
          "direction": "top",
          "random": true,
          "straight": true,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 600
          }
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "bubble"
          },
          "onclick": {
            "enable": true,
            "mode": "repulse"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 250,
            "size": 0,
            "duration": 2,
            "opacity": 0,
            "speed": 3
          },
          "repulse": {
            "distance": 400,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    }),
    [],
  );


  return (
    <div className={`h-svh w-svw flex flex-wrap justify-center content-center bg-no-repeat`}
      >
      {/* bg-[url('https://images.unsplash.com/photo-1671347020855-8f35d210ee9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] */}
      {/* {init && <div className=""><Particles
        id="tsparticles"
        className="-z-10"
        particlesLoaded={particlesLoaded}
        options={options}
      /></div>} */}
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