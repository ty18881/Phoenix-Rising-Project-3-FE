import React from "react";
/**
 * Trying to think in React here.
 * the purpose of this component is to create the newlib text
 * and store it in the database.
 * INPUTS:
 *      template collection
 *      user input
 *      baseURL
 *      callback function to send back the newly created lib
 * OUTPUTS:
 *      
 */
class MakeLib extends React.Component{

    // replacer - replaces placeholders in template with input from the user form

    replacer = (match,partOfSpeech) => {
        // use the stripped value, e.g. Noun, Adjective, ProperNoun
        // and retrieve the corresponding value from the input object.
        console.log("Replacer - Part of Speech", partOfSpeech);
        
        return this.state.input[partOfSpeech];
      }

      // makeGiggleLib - create mashup of template and user input
      makeGiggleLib = (template, currentInput) => {
    
        console.log("MakeGiggleLib - Current Input: ", currentInput);
        console.log("MakeGiggleLib - State Input: ", this.state.input);
        let giggleLib = template.replace(/\$\$(.*?)\$\$/g, this.replacer);
        return giggleLib;
    
      }

      // 
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

    render() {
        return(

            <h3>HELLO UP THERE</h3>
        )
    }
}
export default MakeLib;