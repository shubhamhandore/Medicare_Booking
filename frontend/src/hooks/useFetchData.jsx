import { useEffect, useState } from "react";
import { token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState(null); // Initialize as null, indicating no data initially
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true); // Ensure loading is true when fetching data

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal, // Attach signal to the request
        });

        if (!res.ok) {
          const result = await res.json();
          throw new Error(result.message || "Something went wrong 😒");
        }

        const result = await res.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted"); // Handle abort scenario
        } else {
          setError(err.message);
        }
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup on unmount or if URL changes
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
