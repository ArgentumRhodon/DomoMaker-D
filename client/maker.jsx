const helper = require("./helper");
const React = require("react");
const { useState, useEffect } = React;
const { createRoot } = require("react-dom/client");

const handleDomo = (e, onDomoAdded) => {
  e.preventDefault();
  helper.hideError();

  const name = e.target.querySelector("#domoName").value;
  const age = e.target.querySelector("#domoAge").value;
  const alignment = e.target.querySelector("#domoAlignment").value;

  if (!name || !age || !alignment) {
    helper.handleError("All fields are required");
    return false;
  }

  helper.sendPost(e.target.action, { name, age, alignment }, onDomoAdded);
  return false;
};

const DomoForm = (props) => {
  return (
    <form
      action="/maker"
      method="POST"
      onSubmit={(e) => handleDomo(e, props.triggerReload)}
      name="domoForm"
      className="domoForm"
    >
      <label htmlFor="name">Name: </label>
      <input id="domoName" type="text" name="name" placeholder="Domo Name" />
      <label htmlFor="age">Age: </label>
      <input id="domoAge" type="number" min="0" name="age" />
      <label htmlFor="alignment">Alignment: </label>
      <select id="domoAlignment" name="alignment">
        <option value="Lawful Good">Lawful Good</option>
        <option value="Lawful Neutral">Lawful Neutral</option>
        <option value="Lawful Evil">Lawful Evil</option>
        <option value="Neutral Good">Neutral Good</option>
        <option value="True Neutral" selected>
          True Neutral
        </option>
        <option value="Neutral Evil">Neutral Evil</option>
        <option value="Chaotic Good">Chaotic Good</option>
        <option value="Chaotic Neutral">Chaotic Neutral</option>
        <option value="Chaotic Evil">Chaotic Evil</option>
      </select>
      <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    </form>
  );
};

const DomoList = (props) => {
  const [domos, setDomos] = useState(props.domos);

  useEffect(() => {
    const loadDomosFromServer = async () => {
      const response = await fetch("/getDomos");
      const data = await response.json();
      setDomos(data.domos);
    };
    loadDomosFromServer();
  }, [props.reloadDomos]);

  if (domos.length === 0) {
    return (
      <div className="domoList">
        <h3 className="emptyDomo">No Domos Yet!</h3>
      </div>
    );
  }

  const domoNodes = domos.map((domo) => {
    return (
      <div key={domo.id} className="domo">
        <img
          src="/assets/img/domoface.jpeg"
          alt="domo face"
          className="domoFace"
        />
        <h3 className="domoName">Name: {domo.name}</h3>
        <h3 className="domoAge">Age: {domo.age}</h3>
        <h3 className="domoAlignment">Alignment: {domo.alignment}</h3>
      </div>
    );
  });

  return <div className="domoList">{domoNodes}</div>;
};

const App = () => {
  const [reloadDomos, setReloadDomos] = useState(false);

  return (
    <div>
      <div className="makeDomo">
        <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
      </div>
      <div id="domos">
        <DomoList domos={[]} reloadDomos={reloadDomos} />
      </div>
    </div>
  );
};

const init = () => {
  const root = createRoot(document.getElementById("app"));
  root.render(<App />);
};

window.onload = init;
