import React from 'react'
import ReactTagInput from "./InputTags/index"


const settings = {
  tags: [],
  onChange: (tags) => {},
  placeholder: "Types and press enter",
  maxTags: 10,
  editable: true,
  readOnly: false,
  removeOnBackspace: true,
  validator: undefined,
};


const App = () =>{

  const [tags, setTags] = React.useState(["machine-1", "machine-2"]);

  return (
    <div> 
      <ReactTagInput 
        {...settings}
        tags={tags}
        onChange={(value) => setTags(value)}
      />
    </div>
  );
}

export default App;