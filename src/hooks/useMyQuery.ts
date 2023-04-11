import { DocumentNode, QueryHookOptions, useQuery } from "@apollo/client";
import { useEffect } from "react";
import useGlobalLoading from "../state/useGlobalLoading";
import useUnexpectedErrorDialog from "../state/useUnexpectedErrorDialog";

export default function useMyQuery<TData = any>(
  query: DocumentNode,
  options?: QueryHookOptions<TData>
) {
  const { startLoading, stopLoading } = useGlobalLoading();
  const { data, loading, error, ...restQueryResults } = useQuery<TData>(query, {
    ...options,
    onCompleted: stopLoading,
    onError: stopLoading,
  });
  const { fire } = useUnexpectedErrorDialog();

  useEffect(() => {
    if (error) fire();
  }, [error, fire]);

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  return { data, loading, ...restQueryResults };
}
