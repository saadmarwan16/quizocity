const getBorderColor = (
  radioValue: string | null,
  optionValue: string
): string => {
  if (radioValue === optionValue) {
    return "border-teal-700";
  } else {
    return "border-text-disabled";
  }
};

export default getBorderColor;
