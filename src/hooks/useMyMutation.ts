import { DocumentNode, useMutation } from "@apollo/client";

export default function useMyMutation(
  query: DocumentNode,
  successCallback?: (data: any) => void,
  errorCallback?: (data: any) => void
) {
  const [action, { data, loading, error }] = useMutation(query, {
    onCompleted: (data) => {
      if (successCallback) successCallback(data);
    },
    onError: (error) => {
      if (errorCallback) errorCallback(error);
    },
  });

  return { action, options: { data, loading, error } };
}
