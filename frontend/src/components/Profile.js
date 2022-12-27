import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ITEMS_QUERY } from "../graphql/queries";
import { CREATE_ITEM_MUTATION } from "../graphql/mutations";

import { v4 as uuidv4 } from "uuid";

function Profile() {
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
  const [createItem] = useMutation(CREATE_ITEM_MUTATION);
  const handleSubmit = (formData) => {
    // TODO 3.3 Apply the `createItem` callback function

    createItem({
      variables: {
        input: {
          id: uuidv4(),
          ...formData,
        },
      },
    });

    // TODO 3.3 End
  };
  return (
    <div>
      <button>Profile</button>
    </div>
  );
}

export default Profile;
