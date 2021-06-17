import React, { Component } from "react";
import Loading from "components/Loading";
import Panel from "components/Panel";
import classnames from "classnames";

class Dashboard extends Component {
  state = {
    loading: false,
  };
  render() {
    const dashboardClasses = classnames("dashboard");

    const data = [
      {
        id: 1,
        label: "Total Interviews",
        value: 6,
      },
      {
        id: 2,
        label: "Least Popular Time Slot",
        value: "1pm",
      },
      {
        id: 3,
        label: "Most Popular Day",
        value: "Wednesday",
      },
      {
        id: 4,
        label: "Interviews Per Day",
        value: "2.3",
      },
    ];

    if (this.state.loading) {
      return <Loading />;
    }

    const panels = data.map((item) => (
      <Panel key={item.id} id={item.id} label={item.label} value={item.value} />
    ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

// The key can use the value from panel.id
// The id can use the value from panel.id
// The label can use the value from panel.label
// The value can use the value from panel.value

export default Dashboard;
