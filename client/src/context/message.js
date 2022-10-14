import React, {createContext, useReducer, useContext} from 'react'

const MessageStateContext = createContext()
const MessageDispatchContext = createContext()


const messageReducer = (state, action) => {
  console.log('action', action)
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state, users: action.payload,
      }
    case 'SET_USER_MESSAGES':
      const {user, messages} = action.payload
      
      const yy = { ...state, users: state.users.map(u => {
          if (user === u?.username) {
            console.log('user11', user)
            return {...u, messages}
          }
          return u
        })
      }
      return yy
    
    case 'SET_SELECTED_USER':
      const usersCopy = state.users.map(user => ({
        ...user,
        selected: user?.username === action.payload
      }))
      return { ...state, users: usersCopy}
    
    case 'ADD_MESSAGE':
      // const userIndex = state.users?.findIndex(u => u.username === action.payload.user)
      const stateCopyWithMessage = [ ...state.users]
      
      const users = stateCopyWithMessage.map(u => {
        if(u.username === action.payload.user) {
          return {...u, messages: [action.payload.message, ...u.messages]}
        }
        return u
      })

        // stateCopyWithMessage[userIndex].messages = [action.payload.message, ...state[userIndex].messages]
        // console.log('messageList2', messageList)
      
      return {...state, users}
      // return state
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

export const MessageProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(messageReducer, { users: null })
  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  )
}

export const useMessageState = () => useContext(MessageStateContext)
export const useMessageDispatch = () => useContext(MessageDispatchContext)