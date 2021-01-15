export function getAge(date) {
  const today = new Date();
  if (date) {
    const birthday = new Date(date)
    const diff = today - birthday;//millisecond
    const currentAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
    return currentAge;
  } else { return "" }

};

export function buildFormData(formData, data, parentKey) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}