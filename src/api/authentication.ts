async function logIn(number: number): Promise<any> {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ number }),
  });
  if (!response.ok) {
    throw new Error("Failed on sign in request");
  }
  return await response.json();
}
