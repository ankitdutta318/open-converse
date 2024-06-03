import { getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { UserType } from "../utils/types";
import { usersRef } from "../utils/FirebaseConfig";

function useFetchUsers() {
  const [users, setUsers] = useState<Array<UserType>>([]);
  const uid = useAppSelector(
    (openConverseApp) => openConverseApp.auth.userInfo?.uid
  );
  useEffect(() => {
    if (uid) {
      const getUser = async () => {
        try {
          const firestoreQuery = query(usersRef, where("uid", "!=", uid));
          const querySnapshot = await getDocs(firestoreQuery);
          const firebaseUsers: Array<UserType> = [];
          querySnapshot.forEach((doc) => {
            const userData: UserType = doc.data() as UserType;
            firebaseUsers.push({
              ...userData,
              label: userData.name,
            });
          });
          setUsers(firebaseUsers);
        } catch (error) {
          console.error("Error fetching users: ", error);
        }
      };
      getUser();
    }
  }, [uid]);
  return [users];
}

export default useFetchUsers;
