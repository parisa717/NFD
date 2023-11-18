import React, { useState } from "react";
import { ContentState, convertFromHTML, Editor, EditorState } from "draft-js";
import { RichUtils } from "draft-js";
import toolbarIcons from "./ToolbarIcons";
import { stateToHTML } from "draft-js-export-html"

function ToolbarItem({ children, applyStyle, isActive }) {
    return (
      <div
        className={`toolbar-item ${isActive ? "selected" : ""}`}
        onClick={applyStyle}
      >
        {children}
      </div>
    );
  }

  
function Toolbar({ editorState, updateEditorState, isEditor }) {
    const applyStyle = style => {
      updateEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };
  
    const isActive = style => {
      const draftStyle = editorState.getCurrentInlineStyle();
      return draftStyle.has(style);
    };
  
    return (
      <div className="toolbar-container">
        {toolbarIcons.map((item, i) => (
          <ToolbarItem
            key={`${item.label}-${i}`}
            applyStyle={() => applyStyle(item.style)}
            isActive={isActive(item.style)}
          >
            {item.icon || item.label}
          </ToolbarItem>
        ))}
      </div>
    );
  }



export default function FbEditor({text,settext}) {

  const [isEditor, setEditor] = useState(false);

  const contentDataState = text ?  ContentState.createFromBlockArray(convertFromHTML(text)) : null;
  const editorDataState =text ?  EditorState.createWithContent(contentDataState) : null;
  const [editorState, setEditorState] = useState(() =>
text ?   editorDataState : EditorState.createEmpty()
);
  const updateEditorState = editorState =>{ setEditorState(editorState);
    settext(stateToHTML(editorState.getCurrentContent()) );

};
  const handleEditArea = () => setEditor(true);
  const handleCancel = () => {
    console.log("discard changes");
    setEditorState(() => EditorState.undo(editorState));
    setEditor(false);
  };
  const handleSave = () => {
    console.log("save changes");
    setEditor(false);
  };
  return (
    <div className="editor-content">
     
      
       <Toolbar
          editorState={editorState}
          updateEditorState={updateEditorState}
        />
   
       <div className={`editor-area ${isEditor ? "" : "disabled"}`}>
        <Editor
          editorState={editorState}
          onChange={updateEditorState}
        //  placeholder="Write your content here ..."
        />
       </div>
      
    </div>
  );
}




// import React, { Component } from "react";
// import "draft-js-static-toolbar-plugin/lib/plugin.css";

// import Editor, { createEditorStateWithText } from "draft-js-plugins-editor";
// import { convertToRaw } from 'draft-js';

// import createToolbarPlugin, { Separator } from "draft-js-static-toolbar-plugin";
// import {
//   ItalicButton,
//   BoldButton,
//   UnderlineButton,
 
//   HeadlineOneButton,
//   HeadlineTwoButton,
//   HeadlineThreeButton,
//   UnorderedListButton,
//   OrderedListButton,

// } from "draft-js-buttons";

// // import "./customtoolbar.scss";

// class HeadlinesPicker extends Component {
//   componentDidMount() {
//     setTimeout(() => {
//       window.addEventListener("click", this.onWindowClick);
//     });
//   }

//   componentWillUnmount() {
//     window.removeEventListener("click", this.onWindowClick);
//   }

//   onWindowClick = () =>
//     // Call `onOverrideContent` again with `undefined`
//     // so the toolbar can show its regular content again.
//     this.props.onOverrideContent(undefined);

//   render() {
//     const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
//     return (
//       <div>
//         {buttons.map((
//           Button,
//           i // eslint-disable-next-line
//         ) => (
//           <Button key={i} {...this.props} />
//         ))}
//       </div>
//     );
//   }
// }

// class HeadlinesButton extends Component {
//   onClick = () =>
//     // A button can call `onOverrideContent` to replace the content
//     // of the toolbar. This can be useful for displaying sub
//     // menus or requesting additional information from the user.
//     this.props.onOverrideContent(HeadlinesPicker);

//   render() {
//     return (
//       <div className="headline-button-wrapper">
//         <button style={{
//                 height: "100%",
//                 margin: "0 10px",
//                 fontWeight: "bolder",
//                 fontSize: "15px",
//                 color: "#888888",
//         }} onClick={this.onClick} className="headline-button">
//         Headlines
//         </button>
//       </div>
//     );
//   }
// }

// const toolbarPlugin = createToolbarPlugin();
// const { Toolbar } = toolbarPlugin;
// const plugins = [toolbarPlugin];
// const text =
//   "";

// export default class CustomToolbarEditor extends Component {
//   state = {
//     editorState: createEditorStateWithText(text)
    
//   };

//   onChange = editorState => {
//     this.setState({
//       editorState
//     });
//     console.log("editorState",editorState.getCurrentContent())

//   };

//   focus = () => {
//     this.editor.focus();

//   };
  
//   render() {
//     return (
//       <div className="editor-content">
//         <div className="editor" onClick={this.focus}>
//           <div className="custom-toolbar">
//             <Toolbar>
//               {// may be use React.Fragment instead of div to improve perfomance after React 16
//               externalProps => (
//                 <div className="flex items-center">
//                   <BoldButton {...externalProps} />
//                   <ItalicButton {...externalProps} />
//                   <UnderlineButton {...externalProps} />
//                   <Separator {...externalProps} />
//                    {/* <HeadlinesButton {...externalProps} /> */}
//                   {/* <Separator {...externalProps} /> */}

//                   <UnorderedListButton {...externalProps} />
//                   <OrderedListButton {...externalProps} />
            
//            {/* <HeadlinesPicker />  */}
                 
//                 </div>
//               )}
//             </Toolbar>
//           </div>
//           <Editor
//             editorState={this.state.editorState}
//             onChange={this.onChange}
//             plugins={plugins}
//             ref={element => {
//               this.editor = element;
//             }}
//           />
//         </div>
//       </div>
//     );
//   }
// }
