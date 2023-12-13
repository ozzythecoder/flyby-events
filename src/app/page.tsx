import HeaderBar from "@components/HeaderBar";
import SkipToContent from "@components/SkipToContent";
import SwipeMenu from "@components/SwipeMenu";
import { Button, ButtonAsLink } from "@components/ui/button";

export default function Home() {
  return (
    <div className="relative">
      <SkipToContent />
      <SwipeMenu />
      <div className="p-8 bg-gradient-to-br from-primary-100 via-primary-400 to-primary-800 bg-fixed h-[100vh] w-full">
        <HeaderBar />
        <main
          id="main"
          tabIndex={-1}
          className="max-w-[800px] w-[80vw] mx-auto"
        >
          <h1 className="my-32 font-heading text-5xl md:text-6xl lg:text-8xl text-center text-primary-800">
            Plan your gig.
            <br />
            Tell your friends.
          </h1>
          <div className="p-4 bg-background-transparent/20 rounded-md drop-shadow-xl">
            <p className="font-body text-md md:text-lg text-text-950">
              Lorem ipsum dolor sit amet, officia excepteur ex fugiat
              reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit
              ex esse exercitation amet. Nisi anim cupidatat excepteur officia.
              Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet
              voluptate voluptate dolor minim nulla est proident. Nostrud
              officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex
              occaecat reprehenderit commodo officia dolor Lorem duis laboris
              cupidatat officia voluptate. Culpa proident adipisicing id nulla
              nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua
              reprehenderit commodo ex non excepteur duis sunt velit enim.
              Voluptate laboris sint cupidatat ullamco ut ea consectetur et est
              culpa et culpa duis.
            </p>
          </div>
          <div className="flex flex-row justify-evenly mt-4">
            <ButtonAsLink href="/sign-in" intent="primary" text="stylized" hover="highlight">
              Log In
            </ButtonAsLink>
            <Button intent="secondary" text="stylized" hover="highlight">
              Learn More
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
