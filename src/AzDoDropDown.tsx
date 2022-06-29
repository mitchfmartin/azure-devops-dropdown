import {
    CommonServiceIds,
    IProjectPageService,
  } from 'azure-devops-extension-api/Common/CommonServices';
  import {
    IWorkItemChangedArgs,
    IWorkItemFieldChangedArgs,
    IWorkItemFormService,
    IWorkItemLoadedArgs,
    WorkItemTrackingServiceIds,
    IWorkItemNotificationListener
  } from "azure-devops-extension-api/WorkItemTracking";
import * as SDK from "azure-devops-extension-sdk";
import "azure-devops-ui/Core/override.css";
import "es6-promise/auto";
import * as React from "react";
import * as ReactDOM from "react-dom";

import "./AzDoDropDown.scss";

import { Dropdown } from "azure-devops-ui/Dropdown";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Data";

export class AzureDevOpsDropDown extends React.Component<{}, {}> {

    private selection = new DropdownSelection();
    private opts: string[] = ["apple","banana","orange"];

    constructor(props: {}) {
        super(props);
    }

    public componentDidMount() {
        SDK.init();
    }
    public componentDidUpdate() {
        //SDK.resize(this._root.scrollWidth || 200, this._root.scrollHeight || 40);
        SDK.resize();
    }
    public render() {
        return (
            <div style={{ margin: "8px" }}>
                <Dropdown
                    ariaLabel="Single select"
                    className="example-dropdown"
                    placeholder="Select an Option"
                    items={dropdownItems}
                    selection={this.selection}   
                />
            </div>
        );
    }


    private async loadSuggestedValues(): Promise<string[]> {
        const workItemFormService = await SDK.getService<IWorkItemFormService>(WorkItemTrackingServiceIds.WorkItemFormService);
        return await  workItemFormService.getAllowedFieldValues(SDK.getConfiguration().witInputs.FieldName) as string[];
    }

}

export default AzureDevOpsDropDown;

ReactDOM.render(<AzureDevOpsDropDown />, document.getElementById("root"));