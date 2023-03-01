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
import { DropdownSelection} from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Data";

export class AzureDevOpsDropDown extends React.Component<{}, {}> {

    private selection = new DropdownSelection();

    private resized = false;
    private collapseEvent = false;

    constructor(props: {}) {
        super(props);
    }

    public componentDidMount() {
      SDK.init();
       
      let dropdownComponent = this;
      
      
      document.body.addEventListener( 'click', function ( e ) {
        let _input = document.getElementById("__bolt-textfield-input-1");
       /* if (_input !== null) {
            console.log("expanded: "+_input.getAttribute("aria-expanded"));
        }
        console.log("collapseEvent: "+dropdownComponent.collapseEvent);
        console.log("resized: "+dropdownComponent.resized);*/
        if (e.target && (e.target as HTMLElement).id === "__bolt-textfield-input-1"){
            if (
                dropdownComponent.collapseEvent == false && 
                dropdownComponent.resized == false && 
                _input !== null && 
                _input.getAttribute("aria-expanded") == "false"
            ){
                SDK.resize(document.body.scrollWidth, 375);
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                dropdownComponent.resized = true;
                setTimeout(()=>{
                    let _input = document.getElementById("__bolt-textfield-input-1");
                    if (_input !== null) {
                        _input.click();
                    }

                },200);
            }
          
        } 
        if (dropdownComponent.collapseEvent) {
            dropdownComponent.collapseEvent = false;
        }
      },true);
      
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
                    onCollapse={this._resizeCollapse}
                />
            </div>
        );
    }
    private _resizeCollapse = () => {
        console.log("resizeCollapse");

        if(this.resized == true){
            SDK.resize(document.body.scrollWidth, 75);        
            this.resized = false;
            this.collapseEvent = true;
            setTimeout(()=>{
                this.collapseEvent = false;
            },200);
        }

    }
}

export default AzureDevOpsDropDown;

ReactDOM.render(<AzureDevOpsDropDown />, document.getElementById("root"));