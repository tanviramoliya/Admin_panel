import React, { Component } from "react";
import { Breadcrumb } from "components/matx/Breadcrumb";
import { AccountCircle, DateRange, Business } from '@material-ui/icons';
import {
    Grid,
    TextField,
    FormControlLabel,
    Icon,
    Button,
    Switch,
    FormControl,
    Chip,

    Badge,
    InputAdornment, Modal, Backdrop
} from "@material-ui/core";
import RichTextEditor from "components/matx/RichTextEditor";
import "@pathofdev/react-tag-input/build/index.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import { setLoader } from "../../../../redux/actions/loaderAction/loaderAction";
import {

    getSingleArticleNewsApi,
    getCommentCountApi
} from "../../../../redux/actions/index";
import './style.css';
import { connect } from "react-redux";


class viewArticleNews extends Component {
    state = {
        articleNewsId: this.props.location.state.id,
        title: "",
        newsType: "",
        category: "",
        categoryToken: "",
        subCategory: "",
        publishedBy: "",
        city: "",
        state: "",
        country: "",
        optionalAddress: "",
        publish: false,
        critical: false,
        tags: [],
        content: "",
        updatedTime: "",
        publishedTime: "",
        type: "",
        selectedFile: "",
        fileData: "",
        fileName: "",
        imageModel: false,
        commentCount:0

        //content: `<h1>Matx | Angular material admin</h1><p><a href="http://devegret.com/" target="_blank"><strong>DevEgret</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`,
    };

    componentDidMount = async () => {

        await this.getArticleNewsData();
        await this.getCommentCount();
    }
    getCommentCount = async () => {
        const { articleNewsId } = this.state;
        const commentCount = await getCommentCountApi(articleNewsId);
        if (commentCount) {
           this.setState({commentCount:commentCount.data});
           console.log('commentcount---'+this.state.commentCount);
        }
    }
    getArticleNewsData = async () => {
        this.props.setLoader(true);
        const { articleNewsId } = this.state;
        const articleNewsData = await getSingleArticleNewsApi(articleNewsId);
        if (articleNewsData) {
            const data = articleNewsData.data.data;
            var file = new File([data.file], data.fileName)
            this.setState({
                articleNewsId: data.articleNewsId,
                selectedFile: file,
                fileData:data.file,
                title: data.title,
                newsType: data.newsType,
                category: data.category,
                subCategory: data.subCategory,
                publishedBy: data.publishedBy,
                city: data.city,
                state: data.state,
                country: data.country,
                optionalAddress: data.optionalAddress,
                createdTime: data.createdTime,
                updatedTime: data.updatedTime,
                publishedTime: data.publishedTime,
                publish: data.publish,
                critical: data.critical,
                tags: data.tags,
                content: data.content
            })
            this.props.setLoader(false);

        }
    }


    render() {
        let {
            articleNewsId,
            selectedFile,
            title,
            newsType,
            category,
            subCategory,
            publishedBy,
            city,
            state,
            country,
            optionalAddress,
            createdTime,
            updatedTime,
            publishedTime,
            publish,
            critical,
            tags,
            content,
            imageModel,
            fileData, //binary
            commentCount


        } = this.state;

        return (

            <div className="m-sm-30">
                <div className="flex flex-middle flex-space-between">
                    <Breadcrumb
                        routeSegments={[
                            { name: "News | Article", path: "/news/articleNews" },
                            { name: articleNewsId ? articleNewsId : null },
                        ]}
                    />

                    <div>
                        <Badge  badgeContent={commentCount} color="secondary">
                            <Chip
                                //size="small"
                                icon={<Icon color="primary">comments</Icon>}
                                label="Comments"
                                onClick={ () => {this.props.history.push({ pathname: '/comments', state: { keyword: articleNewsId } })}}
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
                                <Switch color="primary" name="publish" checked={publish} style={{ cursor: 'not-allowed' }} />
                            }
                            label="Published"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            control={
                                <Switch  name="critical" checked={critical} style={{ cursor: 'not-allowed' }} />
                            }
                            label="Notified"
                        />
                    </div>
                </div>


                <Grid container spacing={3} style={{ marginTop: '10px' }}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className="flex flex-middle pb-16" style={{ marginTop: 9 }}>
                            <Button
                                className="btn-choose"
                                variant="outlined"
                                component="span"
                                onClick={() => { this.setState({ imageModel: true }) }}
                                startIcon={<Icon color="primary">image</Icon>}>Preview</Button>

                            <div className="pl-16">

                                {selectedFile
                                    ?
                                    <Chip
                                        label={selectedFile.name}
                                        //onDelete={() => { this.setState({ selectedFile: "" }) }}
                                        color="primary"
                                        variant="outlined"
                                    />
                                    : null}
                            </div>
                        </div>

                        <Modal
                            
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            open={imageModel}
                            onClose={() => { this.setState({ imageModel: false }) }}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <div style={{backgroundColor:"white"}}>
                             <img alt={selectedFile.name} src={'data:image/jpeg;base64,' + fileData.data}  />

                            </div>
                        </Modal>
                        <TextField
                            disabled
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
                                    disabled
                                    className="mb-16 pr-16 w-100"
                                    label="newsType"
                                    type="text"
                                    name="newsType"
                                    value={newsType}

                                />

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    disabled
                                    className="mb-16  w-100"
                                    label="publishedBy"
                                    type="text"
                                    name="publishedBy"
                                    value={publishedBy}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    disabled
                                    className="mb-16 pr-16 w-100"
                                    label="category"
                                    type="text"
                                    name="category"
                                    value={category}

                                />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <TextField
                                    disabled
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
                        readOnly={true}
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
                                        disabled
                                        className="mb-16 pr-16 w-100"
                                        label="country"
                                        type="text"
                                        name="country"
                                        value={country}
                                    />
                                </Grid>
                                <Grid item md={4} sm={12} xs={12}>
                                    <TextField
                                        disabled
                                        className="mb-16 pr-16 w-100"
                                        label="state"
                                        type="text"
                                        name="state"
                                        value={state}
                                    />
                                </Grid>
                                <Grid item md={4} sm={12} xs={12}>
                                    <TextField
                                        disabled
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
                                disabled
                                className="w-100"
                                label="Optional Address"
                                type="text"
                                name="optionalAddress"
                                value={optionalAddress}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Business />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Grid item lg={12}>
                            <Grid container >
                                <Grid item md={4} sm={12} xs={12}>
                                    <TextField
                                        disabled
                                        className="mb-16 pr-16 w-100"
                                        label="Created Time"
                                        type="text"
                                        name="createdTime"
                                        value={createdTime}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRange />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                </Grid>
                                <Grid item md={4} sm={12} xs={12}>
                                    <TextField
                                        disabled
                                        className="mb-16 pr-16 w-100"
                                        label="Updated Time"
                                        type="text"
                                        name="updatedTime"
                                        value={updatedTime}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRange />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item md={4} sm={12} xs={12}>
                                    <TextField

                                        disabled
                                        className="mb-16  w-100"
                                        label="Published Time"
                                        type="text"
                                        name="publishedTime"
                                        value={publishedTime}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRange />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={12} >
                            <FormControl className="pt-12 w-100 " >
                                <ReactTagInput

                                    class='react-tag-input__input'
                                    tags={tags}
                                    placeholder="Type tag and press enter"
                                    maxTags={10}
                                    editable={false}
                                    readOnly={true}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        )
    }

}
const mapStateToProps = (state) => {
    return {};
  };
  
  export default connect(mapStateToProps, {setLoader})(
    viewArticleNews
  );