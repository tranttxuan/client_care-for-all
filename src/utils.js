export function getAge(date) {
      const today = new Date();

      var array = date.split('/');
      var day = parseInt(array[0]);
      var month = parseInt(array[1]);
      var year = parseInt(array[2]);

      const birthday = new Date(year, month - 1, day)
      const diff = today - birthday;//millisecond
      const currentAge = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))
      return currentAge;
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