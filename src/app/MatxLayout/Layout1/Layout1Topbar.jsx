import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Icon,
  IconButton,
  MenuItem,
  withStyles,
  MuiThemeProvider,
  Avatar
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "redux/actions/LayoutActions";
import { logoutApi } from "redux/actions/LoginActions";
import { PropTypes } from "prop-types";
import { MatxMenu } from "../../../components/matx/index";
import { isMdScreen } from "utils";
import { Link } from "react-router-dom";
import {
  getCurrentAdminNameApi } from "../../../redux/actions/apiAction/ProfileApiActions";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
  },
});

class Layout1Topbar extends Component {
  state = {
    firstName : "",
    lastName : ""
  };

  updateSidebarMode = (sidebarSettings) => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };
  componentDidMount = async () => {
    await this.getCurrentAdmin();
  };


  getCurrentAdmin = async () => {
    
    let res = await getCurrentAdminNameApi();

    this.setState({
      firstName: res.data.data.firstName,
      lastName: res.data.data.lastName,
      
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };

  handleSignOut = () => {
    this.props.logoutApi();
  };



  render() {
    let { theme, settings, className, style } = this.props;
    const topbarTheme =
      settings.themes[settings.layout1Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold ${className}`}
            style={Object.assign(
              {},
              { backgroundColor: topbarTheme.palette.primary.main },
              style
            )}
          >
            <div className="flex flex-end h-100">
              <div className="flex">
                <IconButton
                  onClick={this.handleSidebarToggle}
                  className="hide-on-lg"
                >
                  <Icon>menu</Icon>
                </IconButton>
                <div className="flex flex-middle">
                  <MatxMenu
                    menuButton={
                    <Avatar>{this.state.firstName.charAt(0)+this.state.lastName.charAt(0)}</Avatar>
                    }
                  >
                    <MenuItem style={{ minWidth: 185 }}>
                      <Link
                        className="flex flex-middle"
                        to="/profile"
                      >
                        <Icon> person </Icon>
                        <span className="pl-16"> Profile </span>
                      </Link>
                    </MenuItem>
                    {/* <MenuItem
                      className="flex flex-middle"
                      style={{ minWidth: 185 }}
                    >
                       <Link
                        className="flex flex-middle"
                        to="/profile"
                      >
                      <Icon> vpn_key </Icon>
                      <span className="pl-16"> Change Password </span>
                      </Link>
                    </MenuItem> */}
                    <MenuItem
                      onClick={this.handleSignOut}
                      className="flex flex-middle"
                      style={{ minWidth: 185 }}
                    >
                      <Icon> power_settings_new </Icon>
                      <span className="pl-16"> Logout </span>
                    </MenuItem>
                  </MatxMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings,
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutApi })(Layout1Topbar)
  )
);
