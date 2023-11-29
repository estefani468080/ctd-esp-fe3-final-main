import HorizontalLinearStepper from "dh-marvel/components/stepper/Stepper";
import { getComicsById } from "dh-marvel/services/marvel/marvel.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IComic } from "types";
import Payment from "dh-marvel/components/payment/Payment";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box, Typography } from "@mui/material";

const steps = ["Datos Personales", "Dirección de entrega", "Datos del pago"];

const Checkout = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const router = useRouter();
  const { comic } = router.query;
  const [data, setData] = useState<IComic | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = comic?.toString() || "0";
        if (comic) {
          const response = await fetch(`/api/comics/${id}`);
          if (response.ok) {
            const data = await response.json();
            setData(data);
          } else {
            throw new Error("Error al obtener los datos");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [comic, router]);

  const props = {
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
    steps,
    data,
  };

  return (
    <Box>
      <Box sx={{ margin: "30px 0 20px 0" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ display: "flex" }}>
        <HorizontalLinearStepper {...props} />
        <Payment comic={data} />
      </Box>
      <Box>{/* SnackBar */}</Box>
    </Box>
  );
};

export default Checkout;
