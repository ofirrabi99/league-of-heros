import { Skeleton, Td, Tr } from "@chakra-ui/react";
import { memo } from "react";

interface Props {
  rows: number;
  cells: number;
}

/**
 * Loader for Chakra table. must be inside TBody.
 * @param rows - rows of loaders
 * @param cells - how many cells in each row
 */
function TableLoader({ rows, cells }: Props) {
  return (
    <>
      {[...Array(rows)].map((_e, i) => (
        <Tr key={i}>
          {[...Array(cells)].map((_t, j) => (
            <Td key={j}>
              <Skeleton height={"1rem"} />
            </Td>
          ))}
        </Tr>
      ))}
    </>
  );
}

export default memo(TableLoader);
