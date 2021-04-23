// import { useEffect } from "react"
import { GetStaticProps } from "next";

import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/durationToTimeString";

// CREATED A SPECIFIC TYPE FOR EPISODES (HELPS CODING)
type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  description: string
  members: string,
  duration: number,
  durationAsString: string,
  publishedAt: string
}

// CREATED A TYPE FOR THE PROPS IN THIS PAGE
type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps) {
  // SPA EXAMPLE
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //   .then(response => response.json)
  //   .then(data => console.log(data));
  // }, []);

  return (
    <>
    <h1>Index</h1>
    <p>{ JSON.stringify(props.episodes) }</p>
    </>
  )
}

// SSR EXAMPLE
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes');
//   const data = response.json();

//   return { 
//     props: {
//       episodes: data
//     } 
//   }
    
// }

// SSG EXAMPLE - TYPED
export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc"
    }
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(
        parseISO(episode.published_at),
        "d MMM yy",
        { locale: ptBR }
      ),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes: episodes
    },
    revalidate: 60 * 60 * 8
  }
    
}
