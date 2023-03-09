import { DocumentNode, useMutation } from "@apollo/client";
import { useEffect } from "react";

export default function useMyMutation(
  query: DocumentNode,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void
) {
  const [action, { data, loading, error }] = useMutation(query);

  useEffect(() => {
    if (!data || !successCallback) return;
    successCallback(data);
  }, [data, successCallback]);

  useEffect(() => {
    if (!error || !errorCallback) return;
    errorCallback(error);
  }, [error, errorCallback]);

  return { action, options: { data, loading, error } };
}
