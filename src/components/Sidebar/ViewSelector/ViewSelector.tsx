import { ChangeEvent, Component } from "react";

export type ViewSelectorProps = {
    currentView: string,
    updateViewState: any;
}

class ViewSelector extends Component<ViewSelectorProps, {}> {
    handleUpdateViewState(e: ChangeEvent) {
        const target = e.target as HTMLSelectElement;
        this.props.updateViewState(target.value)
    }

    render() {
        return (
            <label>
                View:

                <select onChange={this.handleUpdateViewState.bind(this)} defaultValue={this.props.currentView}>
                    <option value="agenda">Agenda</option>
                    <option value="compact">Compact</option>
                </select>
            </label>
        )
    }
}

export default ViewSelector;
