import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Personal from "../personal/Personal";
import { ICard, ICheckout } from "types";
import Address from "../address/Address";
import Details from "../details/Details";
import { fetchCheckout } from "dh-marvel/services/checkout/checkout.service";
import { useRouter } from "next/router";
import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

const info: ICheckout = {
  customer: {
    name: "",
    lastname: "",
    email: "",
  },
  address: {
    address1: "",
    address2: null,
    city: "",
    state: "",
    zipCode: "",
  },
  payment: {
    number: "",
    nameOnCard: "",
    expDate: "",
    cvc: "",
  },
};

export default function HorizontalLinearStepper({
  activeStep,
  setActiveStep,
  skipped,
  setSkipped,
  data: comic,
}: any) {
  const [data, setData] = useState<ICheckout>(info);
  const router = useRouter();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: any) => prevActiveStep - 1);
  };

  const handleChangeOptions = (datos: any, value: string) => {
    setData((prevState) => ({
      ...prevState,
      [value]: datos,
    }));
  };

  const handlePayment = (datos: ICard) => {
    const info: CheckoutInput = {
      customer: {
        ...data.customer,
        address: data.address,
      },
      card: datos,
      order: {
        name: comic?.title,
        image: `${comic?.thumbnail.path}.${comic?.thumbnail.extension}`,
        price: comic?.price,
      },
    };

    const response = fetchCheckout(info);
    response.then((response) => {
      console.log(
        "🚀 ~ file: Stepper.tsx:105 ~ response.then ~ response:",
        response
      );
      if (!response?.data) {
        return;
      } else {
        const customer = response.data.customer;
        const order = response.data.order;

        localStorage.setItem(
          "checkoutData",
          JSON.stringify({
            customer: customer,
            order: order,
          })
        );
        router.push({
          pathname: "/confirmacion-compra",
        });
      }
    });
  };

  const props = {
    handleChangeOptions,
    handleNext,
  };

  return (
    <Box sx={{ width: "100%" }}>
      {activeStep === 0 ? (
        <Personal {...props} customer={data.customer} />
      ) : null}
      {activeStep === 1 ? (
        <Address handleBack={handleBack} address={data.address} {...props} />
      ) : null}
      {activeStep === 2 ? (
        <Details
          handleBack={handleBack}
          payment={data.payment}
          handlePayment={handlePayment}
          {...props}
        />
      ) : null}
    </Box>
  );
}
