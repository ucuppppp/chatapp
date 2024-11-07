// Contoh cara mengirim token ke API route untuk verifikasi
const verifyToken = async (token: string | null) => {
  const response = await fetch("/api/verifyToken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data.valid;
};

export default verifyToken;