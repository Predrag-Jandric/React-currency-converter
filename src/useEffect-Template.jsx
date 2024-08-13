import { useState, useEffect } from "react";

export default function useEffectTemplate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(data, loading, error);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state updates on unmounted component

    async function fetchData() {
      setLoading(true);
      setError(null); // Reset error state before new fetch

      try {
        const response = await fetch("https://api.example.com/data");

        // Check if the request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (isMounted) {
          // Update state only if the component is still mounted
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          // Update error state only if the component is still mounted
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          // Ensure loading state is updated
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function to prevent state updates if the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
}

//     Explanation of the Template:

//     Dependency Array ([]):
//         The empty dependency array [] ensures that useEffect runs only once after the initial render, similar to componentDidMount in class components. Adjust this array depending on what state or props you want to trigger the effect.

//     Loading State (loading):
//         A loading state is used to indicate when data is being fetched, which allows you to provide feedback to the user (e.g., a loading spinner).

//     Error Handling (error):
//         An error state is used to catch and display any errors that occur during the asynchronous operation.

//     Async Function within useEffect:
//         fetchData is defined as an asynchronous function within useEffect. This approach allows for cleaner code compared to making the useEffect callback itself asynchronous.

//     Cleanup Function:
//         A cleanup function is returned to ensure that if the component unmounts before the async operation completes, the component doesn't attempt to update state, which could cause memory leaks or warnings.

//     isMounted Flag:
//         The isMounted flag is used to check whether the component is still mounted before attempting to update its state. This prevents state updates on unmounted components, which could lead to errors.

//     Final if Statements:
//         Simple conditional rendering based on loading and error states provides clear feedback to the user about the status of the operation.

// Customization:

//     Dependency Array: Modify the dependency array to include any variables or props that should trigger the effect to re-run.
//     Error Handling: Customize error handling to include retries, or more user-friendly messages.
//     Cleanup Logic: Adjust cleanup logic if your side effect involves subscriptions, event listeners, or other resources that need to be released.

// This template is a strong foundation for most useEffect scenarios, ensuring that your component handles asynchronous data fetching, error states, and cleanup in a way that aligns with React best practices.
