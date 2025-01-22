export const getLastUpdatedDate = async () => {
  const response = await fetch("http://localhost:5002/api/experiments/live", {
    method: "GET",
  });
  return response.json();
};
