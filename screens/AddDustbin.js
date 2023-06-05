import DustbinForm from "../components/places/DustbinForm";
import { insertDustbin } from "../util/database";

const AddDustbin = ({ navigation }) => {
  const createDustbinHandler = async (dustbin) => {
    await insertDustbin(dustbin);
    navigation.navigate('AllDustbins');
  };

  return (
    <DustbinForm onCreateDustbin={createDustbinHandler} />
  )
};

export default AddDustbin;