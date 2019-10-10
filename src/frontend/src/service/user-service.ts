// specific to the response object recieved from the server
interface UserResponse {
  group_name: string;
  user_id: string;
  email: string;
  admin: boolean;
  name: string;
  timestamp: Date;
}

const convertUsersObject = (inputUser: UserResponse) => {
  // convert {group_name, user_id} => {group, id}
  return {
    group: inputUser.group_name,
    id: inputUser.user_id,
    email: inputUser.email,
    admin: inputUser.admin,
    name: inputUser.name,
    timestamp: inputUser.timestamp
  };
};

export const convertUserArray = (inputArray: UserResponse[]) =>
  inputArray.map(user => convertUsersObject(user));
