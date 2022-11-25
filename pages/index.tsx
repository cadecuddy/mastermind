import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Game from "../components/Game";

const Home: NextPage = () => {
  return (
    <div className="h-screen bg-slate-600">
      <Head>
        <title>Mastermind</title>
        <meta
          name="description"
          content='A game based on the 70s game "Mastermind" made after playing it on thanksgiving.'
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        <h1 className="font-Kanit text-5xl text-white font-bold italic text-left animate-pulse p-6">
          Mastermind
        </h1>
        <div className="flex flex-col justify-center items-right">
          <button
            className="border-2 border-gray-400 bg-gray-600 hover:border-gray-400 p-2 font-Kanit text-md text-white rounded-md"
            onClick={() =>
              alert(
                "You have 10 guesses to guess the color pattern of 4 colored pegs. Guess feedback is given by black & white pegs.\nBlack = correct color in correct position.\nWhite = correct color."
              )
            }
          >
            How to Play
          </button>
        </div>
      </main>
      <Game />

      <Footer />
    </div>
  );
};

export default Home;
