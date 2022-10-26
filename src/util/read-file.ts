export const readFile = ({
  file,
  readMethod = "data-url",
}: {
  file: Blob;
  readMethod?: "data-url" | "csv" | "text";
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        if (readMethod === "csv") resolve(String(reader.result));
        else resolve(String(reader.result));
      };

      switch (readMethod) {
        case "data-url":
          reader.readAsDataURL(file);
          break;
        case "csv":
          reader.readAsBinaryString(file);
          break;
        case "text":
          reader.readAsText(file);
          break;
      }
    } catch (err) {
      resolve("");
      console.error(err);
    }
  });
};
