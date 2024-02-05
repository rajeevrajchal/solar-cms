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

export default exportFile;

//if the date name is in content-disposition data?.headers["content-disposition"]
