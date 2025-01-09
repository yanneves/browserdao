export default (id, value = 0) => {
  if (typeof window !== "undefined") {
    window.fathom?.trackEvent(id, value);
  }
};
