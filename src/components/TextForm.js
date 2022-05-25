import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    console.log("handleUpClick clicked");
    setText(text.toUpperCase());
    props.showAlert("converted to UpperCase", "success");
  };

  const handleLowerClick = () => {
    console.log("handleLowerClick clicked");
    setText(text.toLowerCase());
    props.showAlert("converted to lowerCase", "success");
  };

  const handleOnChange = (event) => {
    console.log("handleOnChange clicked");
    setText(event.target.value);
  };

  const handleClearClick = () => {
    setText("");
    props.showAlert("Text Cleared", "success");
  };

  const wordsHandles = () => {
    const myArray = text.split(" ");
    return myArray.filter((e) => { 
      if (e !== "") 
        return e;
      return false
    }).length;
  };

  const [text, setText] = useState("");
  //text = "new  text"; // wrong way to change the state
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "light" ? "grey" : "white" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            rows="4"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#cecccc",
              color: props.mode === "light" ? "grey" : "#000000",
            }}
          ></textarea>
        </div>
        <button disabled = {text.length === 0} onClick={handleUpClick} className="btn btn-primary mx-2 my-1">convert to upperCase</button>
        <button disabled = {text.length === 0} onClick={handleLowerClick} className="btn btn-primary mx-2 my-1">convert to lowercase</button>
        <button disabled = {text.length === 0} onClick={handleClearClick} className="btn btn-primary mx-2 my-1">clear Text</button>
        <button disabled = {text.length === 0} onClick={() => {
            const text = document.getElementById("myBox");
            text.select();
            navigator.clipboard.writeText(text.value);
            props.showAlert("Copied to Clipboard !", "success");
          }}
          className="btn btn-primary mx-2 my-1" >
          Copy Text </button>
        <button disabled = {text.length === 0}
          onClick={() => {
            //regex to remove the spaces more than 1
            setText(text.split(/[ ]+/).join(" "));
            props.showAlert("space removed", "success");
          }}
          className="btn btn-primary mx-2 my-1" >
          Remove Extra Spaces</button>
      </div>
      <div className="container my-3" style={{ color: props.mode === "light" ? "grey" : "white" }} >
        <h2>Your Text Summary</h2>
        <p> Words : {wordsHandles()} Chatacter : {text.length}</p>
        <p>{0.008 * wordsHandles()} minutes to read the text</p>
        <p> Number of Different Words : {[...new Set(text.split(" ").filter((e) => {return e.length > 0}))].length} </p>
        <h2>Preview :</h2>
        <p> {text.length > 0 ? text : "Enter something on text box above to preview it here"} </p>
      </div>
    </>
  );
}
