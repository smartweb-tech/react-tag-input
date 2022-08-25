import React from "react";
import { classSelectors } from "../utils/selectors";
import { ContentEditable } from "./ContentEditable";


export class Tag extends React.Component {

    constructor(props) {
        super(props);
        this.state = { input: "" };
        this.innerEditableRef = React.createRef();
    }

    remove = () => this.props.remove(this.props.index);

    render() {

        const { value, index, editable, inputRef, validator, update, readOnly, removeOnBackspace } = this.props;
    
        const tagRemoveClass = !readOnly ?
          classSelectors.tagRemove : `${classSelectors.tagRemove} ${classSelectors.tagRemoveReadOnly}`;
    
        return (
          <div className={classSelectors.tag}>
            {!editable && <div className={classSelectors.tagContent}>{value}</div>}
            {editable && (
              <ContentEditable
                value={value}
                inputRef={inputRef}
                innerEditableRef={this.innerEditableRef}
                className={classSelectors.tagContent}
                change={(newValue) => update(index, newValue)}
                remove={this.remove}
                validator={validator}
                removeOnBackspace={removeOnBackspace}
              />
            )}
            <div className={tagRemoveClass} onClick={this.remove}/>
          </div>
        );
    
      }

}