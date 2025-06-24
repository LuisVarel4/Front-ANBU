import WelcomeMessage from "../components/header/WelcomeMessage";

const Welcome = ({ background }: { background: string }) => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <main className="z-0 flex h-full w-full items-center justify-center">
        <WelcomeMessage />
      </main>
    </div>
  );
};

export default Welcome;
