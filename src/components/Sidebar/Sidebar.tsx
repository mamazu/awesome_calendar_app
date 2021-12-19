import { Component } from "react";
import ViewSelector, {ViewSelectorProps} from "./ViewSelector/ViewSelector";

import "./Sidebar.css";

class Sidebar extends Component<ViewSelectorProps, {}> {
    render() {
        return (
            <div className="sidebar">
                <div className="logo">
                    <span>A</span>wesome
                    <span>C</span>alendar
                    <span>A</span>pp
                </div>
                <ViewSelector {...this.props} />
            </div>
        )
    }
}

export default Sidebar;
