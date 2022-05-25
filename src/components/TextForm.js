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
            rows="8"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "light" ? "white" : "grey",
              color: props.mode === "light" ? "grey" : "white",
            }}
          ></textarea>
        </div>
        <button onClick={handleUpClick} className="btn btn-primary mx-2">
          convert to upperCase
        </button>
        <button onClick={handleLowerClick} className="btn btn-primary ">
          convert to lowercase
        </button>
        <button onClick={handleClearClick} className="btn btn-primary mx-2">
          clear Text
        </button>
        <button
          onClick={() => {
            const text = document.getElementById("myBox");
            text.select();
            navigator.clipboard.writeText(text.value);
            props.showAlert("Copied to Clipboard !", "success");
          }}
          className="btn btn-primary mx-2"
        >
          Copy Text
        </button>
        <button
          onClick={() => {
            //regex to remove the spaces more than 1
            setText(text.split(/[ ]+/).join(" "));
            props.showAlert("space removed", "success");
          }}
          className="btn btn-primary mx-2"
        >
          Remove Extra Spaces
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "light" ? "grey" : "white" }}
      >
        <h2>Your Text Summary</h2>
        <p> Words : {wordsHandles()} Chatacter : {text.length}</p>
        <p>{0.008 * text.split(" ").length} minutes to read the text</p>
        <p>
          Number of Different Words : {[...new Set(text.split(" "))].length}
        </p>
        <h2>Preview :</h2>
        <p>
          {text.length > 0
            ? text
            : "Enter something on text box above to preview it here"}
        </p>
      </div>
    </>
  );
}
