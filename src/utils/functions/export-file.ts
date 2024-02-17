const exportFile = (fileName: string, blob: Blob) => {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const exportFileFromUrl = (url: string, fileName: string) => {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => console.error("Error downloading image:", error));
};

export default exportFile;

//if the date name is in content-disposition data?.headers["content-disposition"]
