import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!url) return alert("Masukkan link produk Shopee terlebih dahulu.");

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data. Cek koneksi ke backend.");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>🔍 Penganalisis 🧠 AI Shopee</h1>
      <input
        type="text"
        placeholder="Tempel link produk Shopee di sini..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handleAnalyze}
        style={{ marginTop: "10px", padding: "10px 20px", fontSize: "16px" }}
      >
        {loading ? "Menganalisis..." : "Analisa Sekarang"}
      </button>

      {result && (
        <div style={{ marginTop: "30px", whiteSpace: "pre-wrap" }}>
          <h2>📊 Hasil Analisis:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
