import PricingRule from "../models/PricingRule.js";

const roundAmount = (amount) => {
  return Number(amount.toFixed(2));
};

const calculatePricing = async ({
  vehicleCategory,
  bookingType,
  pickupLocation,
  dropLocation,
  pickupDateTime,
  returnDateTime,
  distanceKm = 0,
  extraKm = 0,
  extraHours = 0,
  tollCharges = 0,
  parkingCharges = 0
}) => {
  const pickup = new Date(pickupDateTime);
  const returnTime = new Date(returnDateTime);

  const now = new Date();

  // Find active pricing rules
  const rules = await PricingRule.find({
    isActive: true,
    $and: [
      {
        $or: [
          { validFrom: { $exists: false } },
          { validFrom: null },
          { validFrom: { $lte: pickup } }
        ]
      },
      {
        $or: [
          { validUntil: { $exists: false } },
          { validUntil: null },
          { validUntil: { $gte: pickup } }
        ]
      }
    ]
  }).sort({
    priority: -1,
    createdAt: -1
  });

  // Find applicable rule
  const applicableRule = rules.find((rule) => {
    const categories =
      rule.applicableTo?.vehicleCategories || [];

    const bookingTypes =
      rule.applicableTo?.bookingTypes || [];

    const locations =
      rule.applicableTo?.locations || [];

    const categoryMatches =
      categories.length === 0 ||
      categories.includes(vehicleCategory);

    const bookingTypeMatches =
      bookingTypes.length === 0 ||
      bookingTypes.includes(bookingType);

    const locationMatches =
      locations.length === 0 ||
      locations.some(
        (location) =>
          location.toLowerCase() ===
            pickupLocation.toLowerCase() ||
          location.toLowerCase() ===
            dropLocation.toLowerCase()
      );

    return (
      categoryMatches &&
      bookingTypeMatches &&
      locationMatches
    );
  });

  if (!applicableRule) {
    throw new Error(
      "No active pricing rule found for the selected trip"
    );
  }

  const pricing = applicableRule.pricing;

  // Calculate rental duration
  const durationMs = returnTime - pickup;

  const totalHours = Math.ceil(
    durationMs / (1000 * 60 * 60)
  );

  const totalDays = Math.ceil(
    totalHours / 24
  );

  // Base fare calculation
  let baseAmount = pricing.baseFare || 0;

  if (pricing.pricePerKm > 0) {
    baseAmount +=
      distanceKm * pricing.pricePerKm;
  }

  if (pricing.pricePerHour > 0) {
    baseAmount +=
      totalHours * pricing.pricePerHour;
  }

  if (pricing.pricePerDay > 0) {
    baseAmount +=
      totalDays * pricing.pricePerDay;
  }

  // Driver bata
  const driverBata =
    (pricing.driverBataPerDay || 0) *
    totalDays;

  const driverBataHourly =
    (pricing.driverBataPerHour || 0) *
    totalHours;

  const totalDriverBata = Math.max(
    driverBata,
    driverBataHourly
  );

  // Extra distance
  const extraKmCharge =
    extraKm * (pricing.extraKmCharge || 0);

  // Extra hours
  const extraHourCharge =
    extraHours * (pricing.extraHourCharge || 0);

  // One-way charge
  const oneWayCharge =
    bookingType === "one_way"
      ? pricing.oneWayCharge || 0
      : 0;

  // Airport charge
  const airportCharge =
    bookingType === "airport_transfer"
      ? pricing.airportCharge || 0
      : 0;

  // Interstate tax
  const interstateTax =
    pricing.interstateTax || 0;

  // Toll
  const finalTollCharges =
    pricing.tollIncluded
      ? 0
      : tollCharges;

  // Parking
  const finalParkingCharges =
    pricing.parkingIncluded
      ? 0
      : parkingCharges;

  const otherCharges =
    extraKmCharge +
    extraHourCharge +
    oneWayCharge +
    airportCharge;

  const subtotal =
    baseAmount +
    totalDriverBata +
    finalTollCharges +
    finalParkingCharges +
    interstateTax +
    otherCharges;

  // Discount
  const discount =
    subtotal *
    ((pricing.discountPercentage || 0) / 100);

  const amountAfterDiscount =
    Math.max(subtotal - discount, 0);

  // GST / tax
  const tax =
    amountAfterDiscount *
    ((pricing.gstPercentage || 0) / 100);

  const totalAmount =
    amountAfterDiscount + tax;

  return {
    pricingRule: applicableRule._id,

    pricing: {
      baseAmount: roundAmount(baseAmount),

      driverBata: roundAmount(
        totalDriverBata
      ),

      tollCharges: roundAmount(
        finalTollCharges
      ),

      parkingCharges: roundAmount(
        finalParkingCharges
      ),

      interstateTax: roundAmount(
        interstateTax
      ),

      otherCharges: roundAmount(
        otherCharges
      ),

      discount: roundAmount(
        discount
      ),

      tax: roundAmount(
        tax
      ),

      totalAmount: roundAmount(
        totalAmount
      )
    },

    calculationDetails: {
      distanceKm,
      extraKm,
      extraHours,
      totalHours,
      totalDays,
      vehicleCategory,
      bookingType,
      pickupLocation,
      dropLocation
    }
  };
};

export default calculatePricing;