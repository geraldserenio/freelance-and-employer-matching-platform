export const getCurrentUrl = () => {
  const url = window.location.href;
  let parts;
  if (url != null || url != undefined || url != "") {
    parts = url.split("/");
    const pathname = parts[parts.length - 1];
    const baseUrl = parts[parts.length - 2];
    return { pathname: pathname, base_url: baseUrl };
  }

  return { pathname: "", baseUrl: "" };
};
