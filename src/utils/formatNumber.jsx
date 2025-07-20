const formatNumber = (value) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default formatNumber;
