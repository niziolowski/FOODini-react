import { createContext, useState } from "react";
import {
  fetchIngredients,
  // createIngredient,
  // updateIngredient,
  // deleteIngredient,
  // createOrEditIngredients,
  // updateShoppingList,
  // refillStorage,
} from "../apis/ingredients";
// import { v4 as uuid } from "uuid";
// import AuthContext from "./auth";
// import ErrorContext from "./error";

const IngredientsContext = createContext();

const demo = JSON.parse(
  `[{"id":6335,"name":"Łosoś","app_id":"05a081f8-d7f4-452b-b0bc-4ac31b244dd5","type":"template","amount":300,"unit":"g","expiry":3,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176394152,"users_id":49,"recipes_id":0},{"id":6336,"name":"Czerwona cebula","app_id":"882d4311-9087-4e42-9777-8dd6d49987fc","type":"template","amount":1,"unit":"szt.","expiry":150,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176590412,"users_id":49,"recipes_id":0},{"id":6337,"name":"Miód","app_id":"be41456e-759c-4f48-84c9-36af705180d6","type":"template","amount":1,"unit":"kg","expiry":0,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176759189,"users_id":49,"recipes_id":0},{"id":6338,"name":"Krewetki mrożone","app_id":"b43baa35-45ac-47a6-bf16-f8ecea89f3c1","type":"template","amount":200,"unit":"g","expiry":150,"purchase_date":"2023-01-08","tag":2,"bookmark":false,"created_at":1673177618803,"users_id":49,"recipes_id":0},{"id":6339,"name":"Masło","app_id":"6e5caf22-815d-46b1-969a-d0696b27d136","type":"template","amount":400,"unit":"g","expiry":150,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673177733551,"users_id":49,"recipes_id":0},{"id":6340,"name":"Śmietana 30%","app_id":"03ac9b24-29cd-466e-a3c7-064e3a11d9aa","type":"template","amount":200,"unit":"ml","expiry":60,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673177920376,"users_id":49,"recipes_id":0},{"id":6341,"name":"Szczypiorek","app_id":"1222e39e-2347-4f0d-972d-4cc7fc98408f","type":"template","amount":1,"unit":"szt.","expiry":7,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178213153,"users_id":49,"recipes_id":0},{"id":6342,"name":"Kaczka","app_id":"776ab373-161e-450e-aad7-6750671cd6a2","type":"template","amount":2,"unit":"kg","expiry":3,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178430034,"users_id":49,"recipes_id":0},{"id":6343,"name":"Sok malinowy","app_id":"d13e4d64-f586-43d6-9750-6ded7d69d425","type":"template","amount":1000,"unit":"ml","expiry":60,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178576103,"users_id":49,"recipes_id":0},{"id":6344,"name":"Boczek","app_id":"d71a8ca2-d3fd-42e7-8e47-636c4802630e","type":"storage","amount":400,"unit":"g","expiry":7,"purchase_date":"2023-01-07","tag":0,"bookmark":true,"created_at":1673178710487,"users_id":49,"recipes_id":0},{"id":6345,"name":"Masło","app_id":"7be3f480-1f99-4945-8a9a-2e68572ece94","type":"storage","amount":400,"unit":"g","expiry":150,"purchase_date":"2022-11-10","tag":0,"bookmark":false,"created_at":1673178770496,"users_id":49,"recipes_id":0},{"id":6346,"name":"Pomidorki koktajlowe","app_id":"acf21392-d875-4089-b866-7b240948331a","type":"storage","amount":10,"unit":"szt.","expiry":5,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178851369,"users_id":49,"recipes_id":0},{"id":6347,"name":"Cebula","app_id":"1c2d0e5c-23b4-459c-ab83-004a49641347","type":"storage","amount":1,"unit":"szt.","expiry":140,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178946093,"users_id":49,"recipes_id":0},{"id":6348,"name":"Jajka","app_id":"2932a3ee-5fba-4a05-b225-d178c87acba7","type":"template","amount":10,"unit":"szt.","expiry":14,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673163472214,"users_id":49,"recipes_id":0},{"id":6349,"name":"Limonka","app_id":"29893527-44a9-4245-a15e-60aff1a74289","type":"template","amount":1,"unit":"szt.","expiry":50,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176441029,"users_id":49,"recipes_id":0},{"id":6350,"name":"Mango","app_id":"6118103d-530e-4101-8f84-b23de866871a","type":"template","amount":1,"unit":"szt.","expiry":5,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176621545,"users_id":49,"recipes_id":0},{"id":6351,"name":"Ryż","app_id":"0b4ba9b7-a7e0-464f-a782-c2f9a92fb550","type":"template","amount":100,"unit":"g","expiry":365,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176801171,"users_id":49,"recipes_id":0},{"id":6352,"name":"Makaron Tagliatelle","app_id":"72fa0eaa-e9ff-4320-9fad-58ecaf71b364","type":"template","amount":200,"unit":"g","expiry":365,"purchase_date":"2023-01-08","tag":1,"bookmark":false,"created_at":1673177656880,"users_id":49,"recipes_id":0},{"id":6353,"name":"Czosnek","app_id":"79ca79f6-bc8e-47ad-bb70-2f4a394fcafa","type":"template","amount":1,"unit":"szt.","expiry":150,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673177793892,"users_id":49,"recipes_id":0},{"id":6354,"name":"Boczek","app_id":"6fc27246-cf18-4535-a8cc-11b3e28ec3d3","type":"template","amount":400,"unit":"g","expiry":7,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178112073,"users_id":49,"recipes_id":0},{"id":6355,"name":"Jabłko","app_id":"19fd4a9b-649d-41de-bb22-6b2c9eee742d","type":"template","amount":1,"unit":"szt.","expiry":60,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178487164,"users_id":49,"recipes_id":0},{"id":6356,"name":"Jajka","app_id":"c5aa71a6-22a0-4d3c-b509-d8752f9e3c16","type":"storage","amount":10,"unit":"szt.","expiry":14,"purchase_date":"2023-01-08","tag":0,"bookmark":true,"created_at":1673178673890,"users_id":49,"recipes_id":0},{"id":6357,"name":"Ogórek","app_id":"eee834c7-94c0-4ec9-8f24-c6beafc915ed","type":"storage","amount":1,"unit":"szt.","expiry":14,"purchase_date":"2023-01-05","tag":0,"bookmark":false,"created_at":1673178731265,"users_id":49,"recipes_id":0},{"id":6358,"name":"Miód","app_id":"deb5b617-b170-415a-9c6f-4d8df5e4b7e9","type":"storage","amount":1,"unit":"kg","expiry":0,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178808287,"users_id":49,"recipes_id":0},{"id":6359,"name":"Masło klarowane","app_id":"b05fab7e-0349-4673-9f8e-6fa936459ae4","type":"storage","amount":400,"unit":"g","expiry":90,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178857857,"users_id":49,"recipes_id":0},{"id":6360,"name":"Ogórek","app_id":"75351f96-da42-4023-bd93-6d646ed6e94a","type":"template","amount":1,"unit":"szt.","expiry":14,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673176665756,"users_id":49,"recipes_id":0},{"id":6361,"name":"Cebula","app_id":"7bdabc3d-cbaf-49c4-b5b6-15cc3ea54532","type":"template","amount":1,"unit":"szt.","expiry":140,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673177702684,"users_id":49,"recipes_id":0},{"id":6362,"name":"Pomidorki koktajlowe","app_id":"4e608e10-3237-4ae7-89c8-bcf94f53ba6b","type":"template","amount":10,"unit":"szt.","expiry":5,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673177836565,"users_id":49,"recipes_id":0},{"id":6363,"name":"Masło klarowane","app_id":"022bb9c0-1f70-4382-ba26-5dfbe77a7584","type":"template","amount":400,"unit":"g","expiry":90,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178154766,"users_id":49,"recipes_id":0},{"id":6364,"name":"Żurawina gotowana","app_id":"b7f76db2-ff51-42ef-94fe-b2749a74f4b2","type":"template","amount":250,"unit":"ml","expiry":365,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178528128,"users_id":49,"recipes_id":0},{"id":6365,"name":"Makaron Tagliatelle","app_id":"4370070c-7ad0-4531-9e67-a38260ad999b","type":"storage","amount":200,"unit":"g","expiry":365,"purchase_date":"2023-01-08","tag":1,"bookmark":false,"created_at":1673178690532,"users_id":49,"recipes_id":0},{"id":6366,"name":"Szczypiorek","app_id":"fa44156b-0596-4193-84a3-bd482fc88212","type":"storage","amount":1,"unit":"szt.","expiry":7,"purchase_date":"2023-01-05","tag":0,"bookmark":false,"created_at":1673178754370,"users_id":49,"recipes_id":0},{"id":6367,"name":"Jajka","app_id":"3fdba7bc-d4d3-44fc-9f02-1fc9225c3c9e","type":"storage","amount":2,"unit":"szt.","expiry":14,"purchase_date":"2023-01-04","tag":0,"bookmark":false,"created_at":1673178868772,"users_id":49,"recipes_id":0},{"id":6368,"name":"Ryż","app_id":"ab0a848f-56c9-4bd2-8c07-f44206ef2cc5","type":"storage","amount":400,"unit":"g","expiry":365,"purchase_date":"2023-01-08","tag":0,"bookmark":false,"created_at":1673178842148,"users_id":49,"recipes_id":0}]`
);

export const IngredientsContextProvider = ({ children }) => {
  // const { token } = useContext(AuthContext);
  // const { setError } = useContext(ErrorContext);
  const [ingredients, setIngredients] = useState(demo);

  const [tags] = useState(["świeże", "suche", "mrożone"]);

  // const addIngredient = async (ing) => {
  //   const { id } = JSON.parse(localStorage.getItem("user"));
  //   const appId = uuid();

  //   try {
  //     const updatedIng = { ...ing, users_id: id, app_id: appId };
  //     const res = await createIngredient(updatedIng);

  //     if (res.status === 200) {
  //       const updated = [...ingredients, res.data];
  //       // Update State
  //       setIngredients(updated);
  //       return updated;
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // const editIngredient = async (ing) => {
  //   const { id } = JSON.parse(localStorage.getItem("user"));

  //   try {
  //     const updatedIng = { ...ing, users_id: id };
  //     const res = await updateIngredient(updatedIng);

  //     if (res.status === 200) {
  //       // Update State
  //       setIngredients((current) => {
  //         const el = current.find((item) => item.id === ing.id);
  //         const index = current.indexOf(el);
  //         const updated = [...current];
  //         updated.splice(index, 1, res.data);

  //         return [...updated];
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // const removeIngredient = async (id) => {
  //   try {
  //     const res = await deleteIngredient(id);
  //     if (res.status === 200) {
  //       // Update State
  //       setIngredients((current) => [
  //         ...current.filter((ing) => ing.id !== id),
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // /**
  //  * If item has id, update, if not, create new record
  //  * @param {Array} payload Array of ingredients
  //  */
  // const addOrEditIngredients = async (payload, token) => {
  //   const { id } = JSON.parse(localStorage.getItem("user"));

  //   const updatedPayload = payload.map((ing) => {
  //     const appId = uuid();
  //     return { ...ing, users_id: id, app_id: ing.app_id || appId };
  //   });

  //   try {
  //     const res = await createOrEditIngredients(
  //       { payload: updatedPayload },
  //       token
  //     );
  //     if (res.status === 200) {
  //       // Update State
  //       setIngredients((current) => [...res.data]);

  //       return res.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // const moveToStorage = async (payload, token) => {
  //   const { id } = JSON.parse(localStorage.getItem("user"));

  //   const updatedPayload = payload.map((ing) => {
  //     const appId = uuid();
  //     return { ...ing, users_id: id, app_id: ing.app_id || appId };
  //   });

  //   try {
  //     const res = await refillStorage({ payload: updatedPayload }, token);

  //     if (res.status === 200) {
  //       // Update State
  //       setIngredients((current) => [...res.data]);

  //       return res.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // /**
  //  * Delete all user's items of type "shopping-list" then add new records from payload
  //  * @param {Array} payload Array of ingredients
  //  */
  // const editShoppingList = async (payload, token) => {
  //   const { id } = JSON.parse(localStorage.getItem("user"));

  //   const updatedPayload = payload.map((ing) => {
  //     const appId = uuid();
  //     return { ...ing, users_id: id, app_id: ing.app_id || appId };
  //   });

  //   try {
  //     const res = await updateShoppingList({ payload: updatedPayload }, token);
  //     if (res.status === 200) {
  //       // Update State
  //       setIngredients((current) => [...res.data]);

  //       return res.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     // set error message for the user
  //     switch (error.response.status) {
  //       case 429:
  //         setError(
  //           "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //         );
  //         break;
  //       case 503:
  //         setError("Nie można nawiązać połączenia z serwerem");
  //         break;

  //       default:
  //         setError("Coś poszło nie tak :(");
  //         break;
  //     }

  //     // pass error
  //     throw error;
  //   }
  // };

  // const getIngredientById = (id) => {
  //   return ingredients.find((ing) => ing.id === id);
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     console.log("fetching ingredients..."); //*: dev only line

  //     try {
  //       const response = await fetchIngredients(token);

  //       setIngredients(response.data);
  //     } catch (error) {
  //       console.error(error);
  //       // set error message for the user
  //       switch (error.response.status) {
  //         case 429:
  //           setError(
  //             "Wykorzystano darmowy limit serwera. Odczekaj chwilę i spróbuj ponownie"
  //           );
  //           break;
  //         case 503:
  //           setError("Nie można nawiązać połączenia z serwerem");
  //           break;

  //         default:
  //           setError("Coś poszło nie tak :(");
  //           break;
  //       }

  //       // pass error
  //       throw error;
  //     }
  //   }
  //   fetchData();
  // }, [token, setError]);

  const value = {
    tags,
    ingredients,
    setIngredients,
    fetchIngredients,
    // addIngredient,
    // editIngredient,
    // removeIngredient,
    // getIngredientById,
    // addOrEditIngredients,
    // editShoppingList,
    // moveToStorage,
  };

  return (
    <IngredientsContext.Provider value={value}>
      {children}
    </IngredientsContext.Provider>
  );
};

export default IngredientsContext;
