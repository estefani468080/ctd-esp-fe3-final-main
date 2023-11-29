import { CheckoutInput } from "dh-marvel/features/checkout/checkout.types";

export const fetchCheckout = async (data: CheckoutInput): Promise<any> => {
  const item = JSON.stringify(data);

  const response = await fetch(`/api/checkout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: item,
  });

  return await response.json();
};
