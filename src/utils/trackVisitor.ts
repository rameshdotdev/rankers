export const trackVisitor = async (page: string) => {
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/visitors/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ page }),
    });
  } catch {
    // silently fail (never block UI)
  }
};
