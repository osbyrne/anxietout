import { getUser } from "../api/user";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(userId);
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <h1>User Detail</h1>
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
};

export { UserDetail };
