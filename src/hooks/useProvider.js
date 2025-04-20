const { useContext } = require("react");

const { MyContext } = require("@/provider/ContextProvider");

const useProvider = () => {
  return useContext(MyContext);
};

export default useProvider;
