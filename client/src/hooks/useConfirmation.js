import {toast} from "react-toastify";
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

const CONFIRM_REQUEST = gql`
  mutation confirmRequest($username: String!) {
    confirmRequest(username: $username) {
      from
      to
    }
  }
`

export const useConfirmation = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [ mutation, {loading: friendRequestLoading} ] = useMutation(CONFIRM_REQUEST)

  function handleAddFriend(username, setModalOpen) {
    mutation({variables: {username}})
      .then(res => {
        if(res.data?.confirmRequest?.from) {
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
    setModalOpen}
}