import React from "react";
import data from "./data.json";
import { Stack, TextField, Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { IAddress, ICard, ICheckout, ICustomer } from "types";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

type Props = {
  handleBack: () => void;
  handleChangeOptions: (datos: any, value: string) => void;
  payment: ICard;
  handlePayment: (datos: ICard) => void;
};

const Details: React.FC<Props> = ({
  handleChangeOptions,
  handleBack,
  handlePayment,
  payment,
}: Props) => {
  const shema = yup
    .object({
      cvc: yup.string().required("El CVC es obligario"),
      expDate: yup.string().required("La fecha es obligaria"),
      nameOnCard: yup.string().required("El nombre es obligario"),
      number: yup
        .string()
        .required("El numero es obligatorio")
        .max(16, "No puede superar los 16 caracteres"),
    })
    .required();

  type FormData = yup.InferType<typeof shema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(shema),
  });

  const onSubmit = (data: FormData) => {
    handleChangeOptions(data, "payment");
    handlePayment(data);
  };

  return (
    <Box sx={{ width: "80vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {data.map((item, key) => (
            <Controller
              key={key}
              name={item.name as keyof FormData}
              control={control}
              defaultValue={payment[item.name as keyof FormData] || ""}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label={item.label}
                  error={!!errors[item.name as keyof boolean] || false}
                  helperText={
                    errors[item.name as keyof FormData]?.message || ""
                  }
                  {...field}
                />
              )}
            />
          ))}
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit">Pagar</Button>
        </Box>
      </form>

      <DevTool control={control} />
    </Box>
  );
};

export default Details;
