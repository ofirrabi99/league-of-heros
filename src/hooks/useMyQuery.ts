import { DocumentNode, useQuery } from "@apollo/client";
import { useEffect } from "react";
import useGlobalLoading from "../state/useGlobalLoading";
import useUnexpectedErrorDialog from "../state/useUnexpectedErrorDialog";

export default function useMyQuery<TData = any>(query: DocumentNode) {
  const { startLoading, stopLoading } = useGlobalLoading();
  const { data, loading, error, ...restQueryResults } = useQuery<TData>(query, {
    onCompleted: stopLoading,
    onError: stopLoading,
  });
  const { fire } = useUnexpectedErrorDialog();

  useEffect(() => {
    if (error) fire();
  }, [error]);

  useEffect(() => {
    startLoading();
  }, []);

  return { data, loading, ...restQueryResults };
}
