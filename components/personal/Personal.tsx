import React from "react";
import data from "./data.json";
import { Stack, TextField, Button } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { ICheckout, ICustomer } from "types";
import Box from "@mui/material/Box";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

type Props = {
  handleNext: () => void;
  handleChangeOptions: (datos: any, value: string) => void;
  customer: ICustomer;
};

interface ICustomerPersonal {
  nombre: string;
  apellido: string;
  email: string;
}

const Personal: React.FC<Props> = ({
  handleNext,
  customer,
  handleChangeOptions,
}: Props) => {
  const shema = yup
    .object({
      nombre: yup.string().required("El nombre es obligatorio"),
      apellido: yup.string().required("El apellido es obligario"),
      email: yup
        .string()
        .email("No es un email")
        .required("El email es obligario"),
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
    handleChangeOptions(data, "customer");
    handleNext();
  };

  return (
    <Box sx={{ width: "80vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {data.map((item, key) => (
            <Controller
              key={key}
              name={item.name as keyof FormData}
              defaultValue={customer[item.name as keyof ICustomer] || ""}
              control={control}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  sx={{ width: "100%" }}
                  label={item.label}
                  error={!!errors[item.name as keyof boolean] || false}
                  helperText={
                    errors[item.name as keyof ICustomerPersonal]?.message || ""
                  }
                  {...field}
                />
              )}
            />
          ))}
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button type="submit">Siguiente</Button>
        </Box>
      </form>

      <DevTool control={control} />
    </Box>
  );
};

export default Personal;
