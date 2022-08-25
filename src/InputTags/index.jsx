import React from "react";
import "./styles/index.scss";
import "./autocomplete-input/AutoCompleteTextField.css";
import { classSelectors } from "./utils/selectors";
import { Tag } from "./components/Tag";

import { AutocompleteTextField as TextField , AutoCompleteList } from "./autocomplete-input/AutoCompleteTextField"

class ReactTagInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: "",
            renderAutocompleteList:false
        };
    }

    onInputChange = (e) => {
        //this.setState({ input: e.target.value });
        this.setState({ input: e });
    }

    onInputKeyDown = (e) => {
        const { input } = this.state;
        const { validator, removeOnBackspace } = this.props;
        // On enter
        if (e.keyCode === 13) {
            // Prevent form submission if tag input is nested in <form>
            e.preventDefault();
            // If input is blank, do nothing
            if (input === "") {
                return;
            }
            // Check if input is valid
            const valid = validator !== undefined ? validator(input) : true;
            if (!valid) {
                return;
            }
            // Add input to tag list
            this.addTag(input);
        }
        // On backspace or delete
        else if (removeOnBackspace && (e.keyCode === 8 || e.keyCode === 46)) {
            // If currently typing, do nothing
            if (input !== "") {
                return;
            }
            // If input is blank, remove previous tag
            this.removeTag(this.props.tags.length - 1);
        }
    }

    addTag = (value) => {
        const tags = [...this.props.tags];
        if (!tags.includes(value)) {
            tags.push(value);
            this.props.onChange(tags);
        }
        this.setState({ input: "" });
    }

    removeTag = (i) => {
        const tags = [...this.props.tags];
        tags.splice(i, 1);
        this.props.onChange(tags);
    }

    updateTag = (i, value) => {
        const tags = [...this.props.tags];
        const numOccurencesOfValue = tags.reduce((prev, currentValue, index) => prev + (currentValue === value && index !== i ? 1 : 0), 0);
        if (numOccurencesOfValue > 0) {
            tags.splice(i, 1);
        }
        else {
            tags[i] = value;
        }
        this.props.onChange(tags);
    }

    render() {

        const { input } = this.state;
        const { tags, placeholder, maxTags, editable, readOnly, validator, removeOnBackspace } = this.props;
        const maxTagsReached = maxTags !== undefined ? tags.length >= maxTags : false;
        const isEditable = readOnly ? false : (editable || false);
        const showInput = !readOnly && !maxTagsReached;

        return (
            <div className={classSelectors.wrapper}>
            {tags?.map((tag, i) => (
              <Tag
                key={i}
                value={tag}
                index={i}
                editable={isEditable}
                readOnly={readOnly || false}
                inputRef={this.inputRef}
                update={this.updateTag}
                remove={this.removeTag}
                validator={validator}
                removeOnBackspace={removeOnBackspace}
              />
            ))}
            {showInput && 
                <TextField 
                    Component="input"
                    ref={this.inputRef}
                    value={input}
                    className={classSelectors.input}
                    placeholder={placeholder || "Type and press enter"}
                    onChange={this.onInputChange}
                    onKeyDown={this.onInputKeyDown}

                    enableRenderAutocomplete={true}
                    onRenderAutocompleteList={(e)=>{ 
                        this.setState({renderAutocompleteList:e}) 
                    }}
                    trigger={[""]} 
                    options={{"": ["aa", "ab", "abc", "abcd", "abc"] }} 
                />
            }

            {/* <AutoCompleteList data={this.state.renderAutocompleteList} /> */}

            {/*
                <input
                ref={this.inputRef}
                value={input}
                className={classSelectors.input}
                placeholder={placeholder || "Type and press enter"}
                onChange={this.onInputChange}
                onKeyDown={this.onInputKeyDown}
                />
            */}

          </div>
        );

    }

}


export default ReactTagInput;