import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { Typography, Icon, Grid } from "@material-ui/core";

class viewVideoNews extends Component {
    render() {
        return (
            <>
                <div className="m-sm-30">
                    <div className="flex flex-middle flex-space-between">
                        <Breadcrumb
                            routeSegments={[
                                { name: "News | Video", path: "/news/videoNews" },
                                { name: "View Video News", path: "/" },
                            ]}
                        />
                    </div>
                    
                </div>
            </>
        )
    }

}
export default viewVideoNews;