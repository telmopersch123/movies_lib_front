const apiURL = import.meta.env.VITE_API_URL;

const translateText = async (text, from = "en", to = "pt") => {
  try {
    const response = await fetch(`${apiURL}/api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
      }),
    });

    if (!response.ok) {
      console.error("Erro na tradução:", response.status, response.statusText);
      return text;
    }

    const data = await response.json();
    console.log(data);
    return data.translatedText;
  } catch (error) {
    console.error("Erro de conexão:", error);
    return text;
  }
};

export default translateText;
