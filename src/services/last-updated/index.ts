export const getLastUpdatedData = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/experiments/live`,
    {
      method: "GET",
    },
  );
  return response.json();
};
