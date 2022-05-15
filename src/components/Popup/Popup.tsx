import './Popup.css';
import { Component } from "react";

interface PopupProps {
    shown: boolean;
    togglePopup: () => void;
}

export default class PopUp extends Component<PopupProps, {}> {
    render() {
        if (!this.props.shown) {
                return null;
            }

        return (
                <div className="modal">
                    <div className="modal_content">
                    <span className="close" onClick={this.props.togglePopup}>&times;</span>
                        {this.props.children}
                    </div>
                </div>
               );
    }
}
