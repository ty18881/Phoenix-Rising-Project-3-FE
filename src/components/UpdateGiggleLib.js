import React from "react";

/**
 * This component is used to update the content of an existing GiggleLib
 * Assumptions:  Utilize the same template as the existing story.
 *              Only update the text of the GiggleLib in the database
 */
class UpdateGiggleLib extends React.Component {

    
    state = {
        template: {},
        giggleLib: "",
        input: {}
    }
    
    /**
     * PROPS for this component
     * handleNewUserInput - method
     * template - base of the current story - object
     * giggleLib - the complete story - object
     * handleAddGiggleLib - method
     * baseURL - url for the API - string
     */
    replacer = (match,partOfSpeech) => {
        // use the stripped value, e.g. Noun, Adjective, ProperNoun
        // and retrieve the corresponding value from the input object.
        console.log("Replacer - Part of Speech", partOfSpeech);
        
        return this.state.input[partOfSpeech];
      }

      makeGiggleLib = (template, currentInput) => {
    
        console.log("UpdateGiggleLib - Current Input: ", currentInput);
        console.log("UpdateGiggleLib - State Input: ", this.state.input);
        let giggleLib = template.replace(/\$\$(.*?)\$\$/g, this.replacer);
        return giggleLib;
    
      }
    
    // handle event when user clicks the "create new" button
    // create a mashup of the user input and the template
    // store the mash up in the database.

    handleSubmit = (event) => {
        event.preventDefault();


        console.log("UpdateGiggleLib - Template from props", this.props.template)


        this.setState({
            template: this.props.template
        })

        // send the user input to the parent component so it's visible to replacer function.
        // use the callback fcn provided

        this.props.handleNewUserInput(this.state.input);


        console.log("UpdateGiggleLib - handleSubmit - Before New Lib", this.state)

// this creates the mashup we're ultimately going to store in the database.
        let newLib =  this.makeGiggleLib(this.props.template.text, this.state.input);




        console.log("UpdateGiggleLib - handleSubmit - After New Lib", this.state)

        fetch(this.props.baseURL + "gigglelibs/" + this.props.giggleLib._id , {
            method: "PUT",
            body: JSON.stringify({
                name: this.state.input.Title,
                text: newLib
            }),
            headers: {
                    "Content-Type" : "application/json"
            }
        }).then (res => res.json())
        .then (resJson => {
            this.props.handleAddGiggleLib(resJson)
        }).catch (error => console.error({"Error": error}))
    }

    /**
     * This pushes the form input into the component's state into the input object
     * WITHOUT OVERWRITING THE EXISTING VALUES.
     * input: { Noun:newValue, Verb:newValue}
     */
    handleChange = (event) => {
        // object reference shorthand
        // what we want to do here is push the new id:value pair into the 
        
        const currEventId = event.target.id;
        const currEventVal = event.target.value;

        // this.setState({input: { [event.target.id]: event.target.value}})
        // console.log("Handle Change - Event: ", event.target);
        
        // don't think we can use spread operator on an object.
        // let copyInput = [{[currEventId]: currEventVal},...this.state.input];
        this.state.input[currEventId] = currEventVal;
        console.log('Copied Input', this.state.input);

        // I sense the above code is dangerous. but it still works


    }

    
    render () {

        
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="Title"></label>
                <input type="text"
                    id="Title"
                    name="Title"
                    onChange={this.handleChange}
                    value={this.state.Title}
                    placeholder="What are we calling your story"
                />
                <label htmlFor="Noun"></label>
                <input type="text"
                    id="Noun"
                    name="Noun"
                    onChange={this.handleChange}
                    value={this.state.Noun}
                    placeholder="Noun"
                />
                <label htmlFor="Pronoun" />
                <input type="text"
                    id="Pronoun"
                    name="Pronoun"
                    onChange={this.handleChange}
                    value={this.state.Pronoun}
                    placeholder="Pronoun"
                />
                <label htmlFor="Verb" />
                <input type="text"
                    id="Verb"
                    name="Verb"
                    onChange={this.handleChange}
                    value={this.state.Verb}
                    placeholder="Verb"
                />
                 <label htmlFor="Adjective" />
                <input type="text"
                    id="Adjective"
                    name="Adjective"
                    onChange={this.handleChange}
                    value={this.state.Adjective}
                    placeholder="Adjective"
                />
                 <label htmlFor="Adverb" />
                <input type="text"
                    id="Adverb"
                    name="Adverb"
                    onChange={this.handleChange}
                    value={this.state.Adverb}
                    placeholder="Adverb"
                />
                    <input type="submit" value="Update your story!"/>
            </form>
        )
    }


}

export default UpdateGiggleLib;