import { useAuth } from "../context/authContext";
import Authenticated from "./Authenticated";
import UnAthenticated from "./UnAthenticated";


const Router = () => {
  const {token}=useAuth()
  console.log(token)
  return (
    <div>

       {
         token ? <Authenticated />:<UnAthenticated />
       }
     
    </div>
  );
};

export default Router;