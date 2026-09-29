const calculateBookingPrice = ({
  baseAmount,
  driverBata = 0,
  tollCharges = 0,
  parkingCharges = 0,
  interstateTax = 0,
  otherCharges = 0,
  discount = 0,
  taxRate = 0
}) => {
  const subtotal =
    baseAmount +
    driverBata +
    tollCharges +
    parkingCharges +
    interstateTax +
    otherCharges;

  const discountedAmount = Math.max(subtotal - discount, 0);

  const tax = Number(
    ((discountedAmount * taxRate) / 100).toFixed(2)
  );

  const totalAmount = Number(
    (discountedAmount + tax).toFixed(2)
  );

  return {
    baseAmount,
    driverBata,
    tollCharges,
    parkingCharges,
    interstateTax,
    otherCharges,
    discount,
    tax,
    totalAmount
  };
};

export default calculateBookingPrice;