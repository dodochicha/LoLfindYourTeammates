import { useMutation } from "@apollo/client";
import {
  CREATE_PLAYER_MUTATION,
  UPDATE_PLAYER_MUTATION,
} from "../graphql/mutations";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

function Profile() {
  const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER_MUTATION);
  const handleSubmit = (formData) => {
    if (formData.name === "" || formData.lane === [] || formData.heros === []) {
      setErrors({
        name: !formData.name,
        lane: !formData.lane,
        heros: !formData.heros,
      });
      return;
    }
    if (1) {
      //player first write his/her profile
      createPlayer({
        variables: {
          input: {
            id: uuidv4(),
            ...formData,
          },
        },
      });
    } else {
      updatePlayer({
        variables: {
          input: {
            id: uuidv4(),
            ...formData,
          },
        },
      });
    }
  };
  const sanitizedDefaultFormData = {
    name: "",
    lane: [],
    heros: [],
    rank: "鐵",
  };
  const [formData, setFormData] = useState(sanitizedDefaultFormData);
  const [errors, setErrors] = useState({
    name: false,
    lane: false,
    heros: false,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <button>Profile</button>
    </div>
  );
}

export default Profile;
