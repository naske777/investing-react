const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = async (endpoint, data = {}, method = 'GET') => {
  console.log(data);
  const url = `${apiUrl}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const data = method !== "DELETE" ? await response.json() : response;
    if (!response.ok) {
      alert("Su ip no esta permitida")
      throw new Error(`Error: ${data}`);
    }
    console.log(data);
    return data;
  } catch (error) {
    alert("Su ip no esta permitida")
    console.error('Fetch error:', error);
    throw error;
  }
};

export { fetchData };