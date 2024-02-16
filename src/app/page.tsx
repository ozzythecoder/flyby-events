import { Button, ButtonAsLink } from "@components/ui/Button";

export default function Home() {
  return (
    <div className="mx-auto">
      <div className="relative">
        <div className="mesh-gradient relative w-full aspect-square rounded-lg">
          <div className="grainy opacity-50 h-full grid place-items-center">
            <header className="my-32">
              <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl text-center text-accent-500 dark:text-accent-100">
                Plan your gig.
              </h1>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-8xl text-center text-primary-800">
                Tell your friends.
              </h1>
            </header>
          </div>
        </div>
      </div>
      <div className="relative p-4 bg-background-transparent/30 rounded-md mx-auto drop-shadow-xl">
        <p className="font-body text-md md:text-lg text-text">
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </p>
      </div>
      <div className="flex flex-row justify-evenly mt-4">
        <Button intent="primary" text="stylized" hover="highlight">
          Log In
        </Button>
        <Button
          type="submit"
          intent="secondary"
          text="stylized"
          hover="highlight"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}
