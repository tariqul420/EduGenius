const { useContext } = require("react");

const { MyContext } = require("@/provider/context-provider");

const useProvider = () => {
  return useContext(MyContext);
};

export default useProvider;
