import React from "react";

/**
 * This component is used to update the content of an existing GiggleLib
 * Assumptions:  Utilize the same template.
 *              Only update the text of the GiggleLib in the database
 */
class UpdateGiggleLib extends React.Component {

    state = {
        template: this.props.template,
        giggleLib: "",
        Noun: "",
        Pronoun: "",
        Verb: "",
        Adverb: "",
        Adjective: "",
        show: false
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log("UpdateGiggleLib - handleSubmit - Before New Lib", this.state)
// this creates the revised mashup we're ultimately going to store in the database.
        this.props.makeGiggleLib();

        console.log("UpdateGiggleLib - handleSubmit - After New Lib", this.state)
        fetch(this.props.baseURL + "/gigglelibs/" + this.props.gigglelib._id, {
            method: "PUT",
            body: JSON.stringify({
                text: this.state.giggleLib
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
     * This pushes the form input into the component's state
     */
    handleChange = (event) => {
        // object reference shorthand
        this.setState({ [event.target.id]: event.target.value})
    }


    render() {
        return(
            <div className="update-div">
            <h2>Hello!  Got to the component!</h2>
            
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="Noun" />
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
                        <input type="submit" value="Update your GiggleLib"/>
                </form>

                </div>
            )
    
    }
}
export default UpdateGiggleLib;