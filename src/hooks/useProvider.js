const { MyContext } = require("@/provider/ContextProvider")
const { useContext } = require("react")


const useProvider = () => {
  return useContext(MyContext);
};

export default useProvider;