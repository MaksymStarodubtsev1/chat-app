import {toast} from "react-toastify";
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

const ADD_REQUEST = gql`
  mutation addNewRequest($username: String!) {
    addNewRequest(username: $username) {
      from
      to
      type
    }
  }
`

export const useRequests = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [ mutation, {loading: friendRequestLoading} ] = useMutation(ADD_REQUEST)

  const handleAddFriend = (username,) => {
    mutation({variables: {username}})
      .then(res => {
        if(res.data?.addNewRequest?.from) {
          toast.success("Success friend adding");
        }
      })
      .catch(err => {
        toast.error("adding failed");
      })

    setModalOpen(false)
  }

  return {
    handleAdd: handleAddFriend,
    requestLoading: friendRequestLoading,
    modalOpen,
    setModalOpen
  }
}