import { useQuery } from "@apollo/client";

import { GET_ITEMS_QUERY } from "../graphql/queries";

function Search() {
  // TODO 2.2 Use the useQuery hook to get items from backend
  //   const {
  //     loading,
  //     error,
  //     data: itemsData,
  //     subscribeToMore,
  //   } = useQuery(GET_ITEMS_QUERY);
  //   if (itemsData !== undefined) {
  //     var { items } = itemsData;
  //   } else {
  //     items = [];
  //   }
  //   console.log(items);
  // TODO 2.2 End

  return <div>Search</div>;
}

export default Search;
