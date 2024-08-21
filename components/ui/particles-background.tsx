import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      await loadFull(engine);
      // await loadSlim(engine);
      // await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: "#f00",
        },
        shape: {
          type: ["circle", "square", "polygon"],
          options: {
            polygon: {
              sides: 6,
            },
          },
        },
        opacity: {
          value: { min: 0, max: 1 },
          animation: {
            enable: true,
            speed: 0.8,
            startValue: "max",
            destroy: "min",
          },
        },
        size: {
          value: { min: 3, max: 7 },
        },
        life: {
          duration: {
            sync: true,
            value: 4,
          },
          count: 1,
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
          },
          drift: {
            min: -2,
            max: 2,
          },
          speed: { min: 10, max: 30 },
          decay: 0.1,
          direction: "none",
          random: false,
          straight: false,
          outModes: {
            default: "destroy",
            top: "none",
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: "random",
          move: true,
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: "random",
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
      detectRetina: true,
      emitters: [
        {
          direction: "none",
          position: {
            x: { min: 17, max: 83 }, // Random x position across the screen width
            y: { min: 8, max: 35 }, // Random y position slightly above the top
          },
          spawnColor: {
            value: "#ff0000",
            animation: {
              h: {
                enable: true,
                offset: {
                  min: -1.4,
                  max: 1.4,
                },
                speed: 0.1,
                sync: false,
              },
              l: {
                enable: true,
                offset: {
                  min: 20,
                  max: 80,
                },
                speed: 0,
                sync: false,
              },
            },
          },
          move: {
            enable: true,
            speed: 1, // Slower speed for longer lasting particles
            direction: "bottom",
            outModes: {
              default: "out",
            },
          },
          life: {
            count: 4,
            duration: 0.1,
            delay: 0.5,
          },
          rate: {
            delay: 0.1,
            quantity: 100,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
      ],
    }),
    [],
  );

  if (init) {
    return (
      <Particles
        className="absolute left-0 top-0 z-[-1] h-1/2 w-full"
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        // style={{ height: "50%" }}
        // url={"http://foo.bar/particles.json"}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesBackground;
