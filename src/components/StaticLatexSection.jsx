import React from "react";

export default class StaticLatexSection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            children: props.children,
        };
    }
    render() {
        return <div className="latex-section">{this.state.children}</div>;
    }
}
