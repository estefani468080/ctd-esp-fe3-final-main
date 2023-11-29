import { Box, Typography } from "@mui/material";
import {
  getCharacter,
  getCharacters,
} from "dh-marvel/services/marvel/marvel.service";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ICharacter, ICharacterResponse } from "types";
import NextLink from "next/link";

interface Props {
  personaje: ICharacter;
}

const Personajes: NextPage<Props> = ({ personaje }) => {
  function obtenerNumeroDeURL(url: string): string | null {
    const match = url.match(/\/(\d+)$/);
    return match ? match[1] : null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
      <Typography variant="h3" sx={{ textAlign: "center", margin: "10px 0" }}>
        {personaje?.name}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box
          component="img"
          alt={personaje?.name}
          src={`${personaje?.thumbnail.path}.${personaje?.thumbnail.extension}`}
          sx={{
            boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
        />
        <Typography sx={{ width: "500px", marginLeft: "20px" }}>
          {personaje?.description === "" || personaje?.description === null
            ? "No tiene descripcion"
            : personaje?.description}
        </Typography>
      </Box>
      <Typography sx={{ margin: "20px 0 -15px 0" }}>Comics:</Typography>
      <ul>
        {personaje?.comics?.items.map((comic, key) => (
          <li key={key}>
            <NextLink href={`/comic/${obtenerNumeroDeURL(comic.resourceURI)}`}>
              {comic?.name}
            </NextLink>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const personaje = await getCharacter(parseInt(params?.id as string));
  return {
    props: {
      personaje,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data: ICharacterResponse = await getCharacters();
  const paths = data.data.results.map((character) => {
    return { params: { id: character.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export default Personajes;
