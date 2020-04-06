import React from "react";

class ShowStory extends React.Component {

    render () {
        return (
            <>
                <div className="thumbnail">
                    <h3> {this.props.giggleLib.name}</h3>
                    <p>
                        {this.props.giggleLib.text}
                    </p>
                </div>
            </>
        )
    }
}


export default ShowStory;