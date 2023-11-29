import type { NextApiRequest, NextApiResponse } from "next";
import { getComic } from "dh-marvel/services/marvel/marvel.service";
import { IComic } from "types";
import { ERROR_SERVER } from "dh-marvel/services/comic/comic.errors";

//type Data = IComicResponse | { error: string; message: string };
type Data = IComic | { error: string; message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  res.setHeader("Content-Type", "application/json");
  const idNumber = parseInt(`${id}`);

  try {
    const result: IComic = await getComic(idNumber);
    res.status(200).json(result);
    return;
  } catch (err) {
    console.log(err);
    res.status(500).json(ERROR_SERVER);
  }
}
