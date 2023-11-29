import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { IComic } from "types";
import NextLink from "next/link";

interface Props {
  comic: IComic;
}

const CardComponent: FC<Props> = ({ comic }) => {
  return (
    <Card sx={{ maxHeigth: 550 }}>
      <Box>
        <CardMedia
          component="img"
          height="200"
          image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {comic.title}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <NextLink href={`/comic/${comic.id}`}>
          <Button size="small" variant="outlined">
            Ver detalles
          </Button>
        </NextLink>
        <NextLink href={`/checkout?comic=${comic.id}`}>
          <Button size="small" variant="contained">
            COMPRAR
          </Button>
        </NextLink>
      </CardActions>
    </Card>
  );
};

export default CardComponent;
