// FORCE NEW BUILD VERSION: 1.0.1
const API_URL = import.meta.env.PROD ? "" : (import.meta.env.VITE_API_URL || "http://127.0.0.1:5001");

console.log("STRICT CONFIG API_URL:", API_URL);

export default API_URL;
