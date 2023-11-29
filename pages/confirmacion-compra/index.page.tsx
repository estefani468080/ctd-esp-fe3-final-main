import { Button, Stack } from "@mui/material";
import LayoutCheckout from "dh-marvel/components/layouts/layout-checkout";
import { useEffect, useState } from "react";
import { IOrder } from "types";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

interface CustomerCheckout {
  nombre: string;
  apellido: string;
  email: string;
}

type checkoutType = {
  customer: CustomerCheckout;
  order: IOrder;
};

const ConfirmacionCompra: NextPage = () => {
  const router = useRouter();
  const [data, setData] = useState<checkoutType>();

  useEffect(() => {
    const data = localStorage.getItem("checkoutData");
    if (data !== null) {
      const obj = JSON.parse(data);
      setData(obj);
    } else {
      router.push("/");
    }
  }, []);

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">
        Compra exitosa <ThumbUpIcon />
      </Typography>

      {data && (
        <Box>
          <Box
            component="img"
            alt={data?.order.name}
            src={data?.order.image}
            sx={{
              boxShadow: "0.2px 0.2px 10px rgba(0,0,0,0.2)",
              width: "500px",
              height: "500px",
              objectFit: "cover",
            }}
          />
          <Typography>Precio: {data?.order.price}</Typography>
          <hr />
          <Typography>
            <b>Customer:</b>
            {data?.customer.nombre} {data?.customer.apellido}
          </Typography>
        </Box>
      )}
      <NextLink href="/">
        <Button variant="contained" sx={{ margin: 5 }}>
          Volver a la home
        </Button>
      </NextLink>
    </Stack>
  );
};

export default ConfirmacionCompra;
