import React, { Component } from "react";
import axios from "axios";

import Loading from "components/Loading";
import Panel from "components/Panel";
import classnames from "classnames";

class Dashboard extends Component {
  state = {
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {},
  };

  selectPanel(id) {
    this.setState((previousState) => ({
      focused: previousState.focused !== null ? null : id,
    }));
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      this.setState({
        loading: false,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      });
    });

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }
  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused,
    });

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

    const panels = data
      .filter(
        (panel) =>
          this.state.focused === null || this.state.focused === panel.id
      )
      .map((item) => (
        <Panel
          key={item.id}
          id={item.id}
          label={item.label}
          value={item.value}
          onSelect={(e) => this.selectPanel(item.id)}
        />
      ));

    return <main className={dashboardClasses}>{panels}</main>;
  }
}

// The key can use the value from panel.id
// The id can use the value from panel.id
// The label can use the value from panel.label
// The value can use the value from panel.value

export default Dashboard;
