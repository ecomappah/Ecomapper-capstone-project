import React from 'react';

const notes_size = 255;

class DataSidebar extends React.Component {
  constructor(props) {
    super(props);

    // Each of the four specifications below is an array: [collapsed, expanded].
    // The first element is what the specification is when the data-sidebar is collapsed,
    // and the second element is when it's expanded.
    //
    // className for the main sidebar div
    this.data_sidebar = ['data-sidebar w-[15px]', 'data-sidebar'];
    // svg coordinates for the collapse/expand arrow on the tab/button
    this.svg_coods = ['12,20 12,40 3,30', '4,20 4,40 13,30'];
    // Function to be called when the tab/button is clicked
    this.onclick = [this.expand, this.collapse];
    // The content to appear inside the collapsable div
    this.inside_content = [
      <></>,
      <div className="data-sidebar-background grid justify-items-center">
        <p>
          This is a data sidebar. The data of the selected entity in the graph will appear here.
        </p>
      </div>,
      <div className="data-sidebar-background grid justify-items-center">
        <h1>Person</h1>
        <form>
          <input type="name" placeholder="Name" className="textbox-sidebar" />
          <input type="number" placeholder="Age" className="textbox-sidebar" />
          <input type="text" placeholder="Misc." className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <textarea
            name="Notes"
            className="textbox-sidebar resize-none"
            rows="10"
            cols="25"
            maxLength={notes_size}
            placeholder="Notes"
          />
        </form>
        <button className="btn-sidebar">Save</button>
      </div>,
      <div className="data-sidebar-background grid justify-items-center">
        <h1>Place</h1>
        <form>
          <input type="name" placeholder="Name" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <textarea
            name="Notes"
            className="textbox-sidebar resize-none"
            rows="10"
            cols="25"
            maxLength={notes_size}
            placeholder="Notes"
          />
        </form>
        <button className="btn-sidebar">Save</button>
      </div>,
      <div className="data-sidebar-background grid justify-items-center">
        <h1>Idea</h1>
        <form>
          <input type="name" placeholder="Name" className="textbox-sidebar" />
          <input type="number" placeholder="Age/History" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <textarea
            name="Notes"
            className="textbox-sidebar resize-none"
            rows="10"
            cols="25"
            maxLength={notes_size}
            placeholder="Notes"
          />
        </form>
        <button className="btn-sidebar">Save</button>
      </div>,
      <div className="data-sidebar-background grid justify-items-center">
        <h1>Edges/Relationships</h1>
        <form>
          <div className="w-11/12 m-2">
            <legend>Relationship Type:</legend>
            <input type="radio" value="family" name="relation" />
            <label for="family">Familial Relationship</label>
            <br />
            <input type="radio" value="friend" name="relation" />
            <label for="friend">Friendships</label>
            <br />
            <input type="radio" value="acquaint" name="relation" />
            <label for="acquaint">Acquaintances</label>
            <br />
            <input type="radio" value="romantic" name="relation" />
            <label for="romantic">Romantic Relationships</label>
            <br />
            <input type="radio" value="work" name="relation" />
            <label for="work">Work Relationships</label>
            <br />
            <input type="radio" value="undefined" name="relation" />
            <label for="undefined">Situational/Undefined Relationships</label>
            <br />
          </div>
          <input type="number" placeholder="Familiarity" className="textbox-sidebar" />
          <input type="number" placeholder="Stress Level" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
          <input type="text" placeholder="Type" className="textbox-sidebar" />
        </form>
        <button className="btn-sidebar">Save</button>
      </div>,
    ];
    /* Button is only in the sidebar temporarily, I'm intending to use it to 
    check if its able to pull info from the form later */

    this.name = '';

    this.state = {
      content: this.renderContent(0, 0),
      view: 0,
    };
    this.expand = this.expand.bind();
    this.collapse = this.collapse.bind(this);
  }

  collapse = () => {
    this.setState({
      content: this.renderContent(0, this.state.view),
    });
  };

  expand = () => {
    if (this.state.view == 0) {
      this.setState({
        view: 1,
        content: this.renderContent(1, 1),
      });
    } else {
      this.setState({
        content: this.renderContent(1, this.state.view),
      });
    }
  };

  /* renderContent isn't actually necessary here as it works without it,
    but it's useful like this for updating the div and seeing it change */
  changeView(new_view) {
    if (new_view != 0) {
      this.setState({
        content: this.renderContent(1, new_view),
        view: new_view,
      });
    } else {
      this.setState({
        content: this.renderContent(0, 0),
        view: new_view,
      });
    }
  }

  /* Generates code for the div. Takes a few arguments:
    expanded:  0 = collapsed, 
               1 = expanded
    selection: 0 = collapsed, 
               1 = no selection, 
               2 = person node selected, 
               3 = place node selected,
               4 = idea node selected,
               5 = edge/relationship selected

    would like to replace both of these with enums in the future,
    but an initial glance at JS enums made them seem not great for this
  */
  renderContent(expanded, selection) {
    return (
      <>
        <div className={this.data_sidebar[expanded]}>
          <div className="data-sidebar-tab" onClick={this.onclick[expanded]}>
            <svg className="data-sidebar-tab-arrow" fill="currentColor">
              <polygon points={this.svg_coods[expanded]} />
            </svg>
          </div>
          {this.inside_content[selection]}
        </div>
      </>
    );
  }

  render() {
    return (
      <>
        {this.state.content}
        {/* Below are buttons used for testing each individual sidebar view
        <button className="btn-primary m-10" onClick={() => this.changeView(0)}>
          Closed
        </button>
        <button className="btn-primary m-10" onClick={() => this.changeView(1)}>
          None
        </button>
        <button className="btn-primary m-10" onClick={() => this.changeView(2)}>
          Person Node
        </button>
        <button className="btn-primary m-10" onClick={() => this.changeView(3)}>
          Place Node
        </button>
        <button className="btn-primary m-10" onClick={() => this.changeView(4)}>
          Idea Node
        </button>
        <button className="btn-primary m-10" onClick={() => this.changeView(5)}>
          Edge/Relationship
        </button> 
        */}
      </>
    );
  }
}

export default DataSidebar;
