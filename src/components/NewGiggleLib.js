import React from "react";

class NewGiggleLib extends React.Component {


    state = {
        template: {},
        giggleLib: "",
        input: {}
    }
    
    
    
    // handle event when user clicks the "create new" button
    // create a mashup of the user input and the template
    // store the mash up in the database.

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("NewGiggleLib - Template from props", this.props.template)

        this.setState({
            template: this.props.template
        })

        // send the user input to the parent component so it's visible to replacer function.
        // use the callback fcn provided

        this.props.handleNewUserInput(this.state.input);

        console.log("NewGiggleLib - handleSubmit - Before New Lib", this.state)
// this creates the mashup we're ultimately going to store in the database.
        let newLib =  this.props.makeGiggleLib(this.props.template.text, this.state.input);

// this set state call doesn't appear to work.
        this.setState({
            giggleLib: newLib
        });

        console.log("NewGiggleLib - handleSubmit - After New Lib", this.state)
        fetch(this.props.baseURL + "/gigglelibs", {
            method: "POST",
            body: JSON.stringify({
                name: "Testing 4 - Now using actual form input",
                owner: "elonfamily",
                text: newLib,
                source_template: this.props.template.name
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
        
        // this.setState({input: { [event.target.id]: event.target.value}})
        // console.log("Handle Change - Event: ", event.target);
        const currEventId = event.target.id;
        const currEventVal = event.target.value;

        // don't think we can use spread operator on an object.
        // let copyInput = [{[currEventId]: currEventVal},...this.state.input];
        this.state.input[currEventId] = currEventVal;
        // console.log('Copied Input', this.state.input);

        // I sense the above code is dangerous. but it still works

    }

    
    render () {

        
        return (
            <form onSubmit={this.handleSubmit}>
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
                    <input type="submit" value="Create A New GiggleLib"/>
            </form>
        )
    }
}

export default NewGiggleLib;