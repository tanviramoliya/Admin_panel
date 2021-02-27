import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import YouTubeIcon from '@material-ui/icons/YouTube';
import {
    Grid,
    TextField,
    FormControlLabel,
    Checkbox,
    Icon,
    Button,
    Switch,
    FormHelperText,
    MenuItem,
    Select,
    FormControl,
    Input,
    Chip,
    InputLabel,
    Typography,
    Box,
    Badge,
    Tooltip,
    ButtonGroup,
} from "@material-ui/core";
import RichTextEditor from "components/matx/RichTextEditor";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";


class viewVideoNews extends Component {

    state = {
        videoNewsId: "",
        videoLink: "",
        title: "",
        newsType: "",
        category: "",
        subCategory: "",
        publishedBy: "",
        city: "",
        state: "",
        country: "",
        publish: false,
        critical: false,
        tags: [],
        content: "",
        type: "",

        //content: `<h1>Matx | Angular material admin</h1><p><a href="http://devegret.com/" target="_blank"><strong>DevEgret</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`,
    };



    render() {
        let {
            videoLink,
            title,
            newsType,
            category,
            subCategory,
            publishedBy,
            city,
            state,
            country,
            publish,
            critical,
            tags,
            content,

        } = this.state;
        return (
            <>
                <div className="m-sm-30">
                    <div className="flex flex-middle flex-space-between">
                        <Breadcrumb
                            routeSegments={[
                                { name: "News | Video", path: "/news/videoNews" },
                                { name: "View Video News", path: "" },
                                { name: "GNTV220221214", path: "/" },
                            ]}
                        />

                        <div>
                            <Badge badgeContent={67} color="secondary">
                                <Chip
                                    //size="small"
                                    icon={<Icon color="error">favorite</Icon>}
                                    label="Likes"
                                //clickable
                                //color="primary"
                                //onDelete={handleDelete}
                                //deleteIcon={<DoneIcon />}
                                />
                            </Badge>
                        </div>
                        <div>
                            <Badge badgeContent={67} color="secondary">
                                <Chip
                                    //size="small"
                                    icon={<Icon color="primary">comments</Icon>}
                                    label="Comments"
                                //clickable
                                //color="primary"
                                //onDelete={handleDelete}
                                //deleteIcon={<DoneIcon />}
                                />
                            </Badge>
                        </div>
                        <div>

                            <FormControlLabel
                                control={
                                    <Switch color="primary" name="publish" checked={true} />
                                }
                                label="Published"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Switch color="error" name="critical" checked={critical} />
                                }
                                label="Notified"
                            />
                        </div>
                    </div>


                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                className="mb-16 w-100"
                                label="Embedded YouTube videoLink"
                                type="url"
                                name="videoLink"
                                value={videoLink}

                            />
                            <TextField
                                className="mb-16 w-100"
                                label="News Title"
                                type="text"
                                name="title"
                                value={title}

                            />
                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Grid container >
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        className="mb-16 pr-16 w-100"
                                        label="newsType"
                                        type="text"
                                        name="newsType"
                                        value={newsType}

                                    />

                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        className="mb-16  w-100"
                                        label="publishedBy"
                                        type="text"
                                        name="publishedBy"
                                        value={publishedBy}

                                    />


                                </Grid>

                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        className="mb-16 pr-16 w-100"
                                        label="category"
                                        type="text"
                                        name="category"
                                        value={category}

                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <TextField
                                        className="mb-16 w-100"
                                        label="subCategory"
                                        type="text"
                                        name="subCategory"
                                        value={subCategory}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid sm={12} style={{ padding: "20px 0px" }}>
                        <RichTextEditor
                            content={content}
                            name="content"
                            handleContentChange={this.handleContentChange}
                            placeholder="insert text here..."
                        />
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Grid item lg={12}>
                                <Grid container >
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16 pr-16 w-100"
                                            label="country"
                                            type="text"
                                            name="country"
                                            value={country}

                                        />

                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16 pr-16 w-100"
                                            label="state"
                                            type="text"
                                            name="state"
                                            value={state}

                                        />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16  w-100"
                                            label="city"
                                            type="text"
                                            name="city"
                                            value={city}

                                        />

                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item lg={12} >
                                <TextField
                                    className="mb-16  w-100"
                                    label="optional address"
                                    type="text"
                                    name="city"
                                    value={city}

                                />
                            </Grid>

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Grid item lg={12}>
                                <Grid container >
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16 pr-16 w-100"
                                            label="country"
                                            type="text"
                                            name="country"
                                            value={country}

                                        />

                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16 pr-16 w-100"
                                            label="state"
                                            type="text"
                                            name="state"
                                            value={state}

                                        />
                                    </Grid>
                                    <Grid item md={4} sm={12} xs={12}>
                                        <TextField
                                            className="mb-16  w-100"
                                            label="city"
                                            type="text"
                                            name="city"
                                            value={city}

                                        />

                                    </Grid>

                                </Grid>

                            </Grid>
                            <Grid item lg={12} >
                                <FormControl className="pt-12 w-100 " >
                                    <ReactTagInput
                                        class='react-tag-input__input'
                                        tags={["bharat", "kadchha"]}
                                        placeholder="Type tag and press enter"
                                        maxTags={10}
                                        editable={true}
                                        readOnly={false}

                                    />
                                </FormControl>
                            </Grid>

                        </Grid>


                    </Grid>


                </div>
            </>
        )
    }

}
export default viewVideoNews;